/**
 * @file Tips service
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global $ */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipTips.Service', ['pipGuidance.Templates']);

    thisModule.factory('pipTips', function ($pipPopover, pipTipsData, pipRest, $timeout, $rootScope, pipSettingsData) {
        var tips;

        return {
            getTips: getTips,
            filterTips: filterTips,
            showTips: showTips,
            firstShowTips: firstShowTips
        };

        function checkStatus(item) {
            return item.status === 'completed';
        }

        function compareRandom() {
            return Math.random() - 0.5;
        }

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

        function firstShowTips(tips, ln, topic, settings, kolDay) {
            var ln = ln || 'en',
                kolDay = kolDay || 2,
                now = new Date(),
                show;

            if (settings && settings[topic].tips) {
                show = (now.getTime() - new Date(settings[topic].tips).getTime()) / (1000 * 60 * 60 * 24);
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

        function getTips(party, ln, topic, callBack) {

            pipTipsData.readTips(
                {item: {}},
                null,
                function (result) {
                    filterTips(result.data, topic);

                    if (callBack) { callBack(tips); }

                    return tips;
                },
                function () {
                    return null;
                }
            );
        }

    });

})(window.angular);
