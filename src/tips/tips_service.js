/**
 * @file Tips service
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global $ */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipTips.Service', ['pipGuidance.Templates']);

    /**
     * @ngdoc service
     * @name pipTips.Service.pipTips
     *
     * @description
     * Service provides an interface to manage tips state.
     * The service is available only on run phase.
     */
    thisModule.factory('pipTips', function ($timeout, $rootScope, $pipPopover, pipTipsData, pipRest, pipSettingsData) {
        var tips;

        return {
            /** @see getTips */
            getTips: getTips,
            /** @see filterTips */
            filterTips: filterTips,
            /** @see showTips */
            showTips: showTips,
            /** @see firstShowTips */
            firstShowTips: firstShowTips
        };

        function checkStatus(item) {
            return item.status === 'completed';
        }

        function compareRandom() {
            return Math.random() - 0.5;
        }

        /**
         * @ngdoc method
         * @methodOf pipTips.Service.pipTips
         * @name pipTips.Service.pipTips:filterTips
         *
         * @description
         * Filters passed tips by passed topic and sorts result collection.
         *
         * {@link https://github.com/pip-webui/pip-webui-guidance/blob/master/src/tips/tips_service.js#L63 View source}
         *
         * @param {Array} data  Source array of tips entities
         * @param {string} topic    Name of topic to filter by it
         *
         * @returns {Array} Filtered and sorted collection.
         *
         * @example
         * <pre>
         *     pipTips.filterTips(tips, 'goals');
         * </pre>
         */
        function filterTips(data, topic) {
            tips = [];
            var tipsCollection = _.filter(data, checkStatus),
                index;

            for (index = 0; index < tipsCollection.length; index++) {
                var topic = _.find(tipsCollection[index].topics, function (t) { return t == topic; });

                if (topic) {
                    tips.push(tipsCollection[index]);
                }
            }

            tips.sort(compareRandom);

            return tips;
        }

        function tipController($scope, $timeout, $mdMedia) {

            $scope.index = 0;

            $scope.$mdMedia = $mdMedia;

            init();

            $scope.onNextClick = function () {
                $scope.index++;

                if ($scope.index === $scope.locals.tips.length) {
                    $pipPopover.hide();
                } else {
                    init();
                    $pipPopover.resize();
                    // $rootScope.$broadcast('pipWindowResized');
                }
            };

            $scope.$on('pipWindowResized', init);

            function init() {

                $scope.title = $scope.locals.tips[$scope.index].title[$scope.locals.ln];
                $scope.content = $scope.locals.tips[$scope.index].content[$scope.locals.ln];
                if ($scope.locals.tips[$scope.index].pic_id) {
                    $scope.image = pipRest.serverUrl() + '/api/parties/' + $scope.locals.tips[$scope.index].creator_id
                        + '/files/' + $scope.locals.tips[$scope.index].pic_id + '/content';
                }

                $scope.link = $scope.locals.tips[$scope.index].more_url;

                if ($scope.image) {
                    $timeout(function () {
                        var backdropElement = $('.pip-popover-backdrop'),
                            popover = backdropElement.find('.pip-popover');

                        popover.find('.pip-pic').css('background-image', 'url(' + $scope.image + ')');
                    }, 100);
                }
            }
        }

        /**
         * @ngdoc method
         * @methodOf pipTips.Service.pipTips
         * @name pipTips.Service.pipTips:showTips
         *
         * @description
         * Shows tip to user.
         *
         * {@link https://github.com/pip-webui/pip-webui-guidance/blob/master/src/tips/tips_service.js#L144 View source}
         *
         * @param {Array} tips  Array of tips
         * @param {string} ln   Chosen language
         * @param {Object=} [$event=null]    Event object
         *
         * @example
         * <pre>
         *      pipTips.showTips(tips, 'en');
         * </pre>
         */
        function showTips(tips, ln, $event) {

            if (tips && tips.length > 0) {
                $pipPopover.hide();
                $pipPopover.show({
                    element: $event ? $event.currentTarget : null,
                    class: 'pip-tip',
                    cancelCallback: function () {
                        return false;
                    },
                    locals: {
                        tips: tips,
                        ln: ln || 'en'
                    },
                    controller: ['$scope', '$timeout', '$mdMedia', tipController],
                    templateUrl: 'tips/tip.template.html'
                });
            }

        }

        /**
         * @ngdoc method
         * @methodOf pipTips.Service.pipTips
         * @name pipTips.Service.pipTips:firstShowTips
         *
         * @description
         * Shows a tip
         *
         * {@link https://github.com/pip-webui/pip-webui-guidance/blob/master/src/tips/tips_service.js#L181 View source}
         *
         * @param {Array} tips  Collection of tips
         * @param {string} [ln='en']   Language for tip content
         * @param {string} topic    Name of needed topic
         * @param {Object} settings Settings object
         * @param {Object} [kolDay=2]   Days amount throughout tips should be shown
         */
        function firstShowTips(tips, ln, topic, settings, kolDay) {
            var ln = ln || 'en',
                kolDay = kolDay || 2,
                now = new Date(),
                show;

            if (settings && settings[topic].tips) {
                show = (now.getTime() - new Date(settings[topic].tips).getTime()) / (1000 * 60 * 60 * 24);

                // TODO [apidhirnyi] Extract the same code part into the function
                if (show > kolDay) {
                    $pipPopover.hide();
                    showTips(tips, ln);
                    settings[topic].tips = new Date();
                    pipSettingsData.saveSettings(settings, topic);
                }
            } else if (settings[topic]) {
                $pipPopover.hide();
                showTips(tips, ln);
                settings[topic].tips = new Date();
                pipSettingsData.saveSettings(settings, topic);
            }
        }

        /**
         * @ngdoc method
         * @methodOf pipTips.Service.pipTips
         * @name pipTips.Service.pipTips:getTips
         *
         * @description
         * Returns tips collection according to topic.
         *
         * {@link https://github.com/pip-webui/pip-webui-guidance/blob/master/src/tips/tips_service.js#L220 View source}
         *
         * @param {Object} party    User's party object
         * @param {string} ln       Language for tip content
         * @param {string} topic    Name of needed topic
         * @param {Function} callback   Callback function. It gets tips collection as argument.
         */
        function getTips(party, ln, topic, callback) {

            pipTipsData.readTips(
                {item: {}},
                null,
                function (result) {
                    filterTips(result.data, topic);

                    if (callback) { callback(tips); }

                    return tips;
                },
                function () {
                    return null;
                }
            );
        }

    });

})(window.angular);
