/**
 * @file Tips and Quotes service
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTipsQuotes.Service', ['pipGuidance.Templates']);

    thisModule.factory('pipTipsQuotes', function ($pipPopover, pipTipsData, pipRest, $timeout, $rootScope, pipSettingsData) {
            var tips;
            var quotes;
            
            return {
                getTips: getTips,
                filterTips: filterTips,
                filterQuotes: filterQuotes,
                showTips: showTips,
                showQuotes: showQuotes,
                firstShowTips: firstShowTips,
                waitUserTipsQuotes: waitUserTipsQuotes
            }

            function checkStatus(item) {
                return item.status == 'completed' ? true : false;
            }

            function compareRandom(a, b) {
                return Math.random() - 0.5;
            }

            function filterTips(data, topic) {
                tips = [];
                var tipsCollection = _.filter(data, checkStatus);
                for (var index = 0; index < tipsCollection.length; index++) {
                    var topic = _.find(tipsCollection[index].topics, function (t) { return t == topic; });                    
                    if (topic) {
                        tips.push(tipsCollection[index]);
                    }
                }
                tips.sort(compareRandom);
                return tips;

            }

            function filterQuotes(data, topic) {
                var quotes, quotesCollection = _.filter(data, checkStatus);
                if (topic) {
                    quotes = [];
                    for (var index = 0; index < quotesCollection.length; index++) {
                        var topic = _.find(quotesCollection[index].tags, function (t) { return t == topic });
                        if (topic) {
                            quotes.push(quotesCollection[index]);
                        }
                    }
                } else {
                    quotes = quotesCollection;
                }

                quotes.sort(compareRandom);
                return quotes;

            }

            function tipController($scope, $timeout, $mdMedia) {

                $scope.index = 0;

                $scope.$mdMedia = $mdMedia;

                init();

                $scope.onNextClick = function () {
                    $scope.index++;
                    if ($scope.index == $scope.locals.tips.length)
                        $pipPopover.hide();
                    else {
                        init();
                        $pipPopover.resize();
                        //$rootScope.$broadcast('pipWindowResized');
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


                    if ($scope.image)
                        $timeout(function () {
                            var backdropElement = $('.pip-popover-backdrop'),
                                popover = backdropElement.find('.pip-popover');
                            popover.find('.pip-pic').css('background-image', 'url(' + $scope.image + ')');

                        }, 100);

                }
            }

            function quoteController($scope, $mdMedia) {

                $scope.index = 0;

                $scope.$mdMedia = $mdMedia;

                init();

                $scope.onNextClick = function () {
                    $scope.index++;
                    if ($scope.index == $scope.locals.quotes.length)
                        $pipPopover.hide();
                    else {
                        init();
                        $pipPopover.resize();
                        //$rootScope.$broadcast('pipWindowResized');
                    }

                };

                $scope.$on('pipWindowResized', init);

                function init() {

                    if ($scope.locals.quotes[$scope.index].author)
                        $scope.author = $scope.locals.quotes[$scope.index].author[$scope.locals.ln] ?
                            $scope.locals.quotes[$scope.index].author[$scope.locals.ln] : $scope.locals.quotes[$scope.index].author['en'];
                    if ($scope.locals.quotes[$scope.index].text)
                        $scope.content = $scope.locals.quotes[$scope.index].text[$scope.locals.ln] ? $scope.locals.quotes[$scope.index].text[$scope.locals.ln] :
                            $scope.locals.quotes[$scope.index].text['en'];

                    $scope.link = $scope.locals.quotes[$scope.index].more_url;

                }
            }

            function showTips(tips, ln, $event) {

                if (tips && tips.length > 0) {
                    $pipPopover.hide();
                    $pipPopover.show({
                        element: $event ? $event.currentTarget : null,
                        class: 'pip-tip',
                        cancelCallback: function () {
                            console.log('backdrop clicked');
                        },
                        locals: {
                            tips: tips,
                            ln: ln || 'en'
                        },
                        controller: ['$scope', '$timeout', '$mdMedia', tipController],
                        templateUrl: 'tips_quotes/tip.template.html'
                    });
                }


            }

            function showQuotes(quotes, ln, $event) {

                if (quotes && quotes.length > 0) {
                    $pipPopover.hide();

                    $pipPopover.show({
                        element: $event ? $event.currentTarget : null,
                        class: 'pip-quote',
                        cancelCallback: function () {
                            console.log('backdrop clicked');
                        },
                        locals: {
                            quotes: quotes,
                            ln: ln || 'en'
                        },
                        controller: ['$scope', '$mdMedia', quoteController],
                        templateUrl: 'tips_quotes/quote.template.html'
                    });
                }


            }

            function firstShowTips(tips, ln, topic, settings, kolDay) {
                var ln = ln || 'en';
                var kolDay = kolDay || 2;
                var now = new Date();
                var show;
                if (settings && settings[topic].tips) {
                    show = (now.getTime() - new Date(settings[topic].tips).getTime()) / (1000 * 60 * 60 * 24);
                    if (show > kolDay) {
                        $pipPopover.hide();
                        showTips(tips, ln);
                        settings[topic].tips = new Date();
                        pipSettingsData.saveSettings(settings, topic);
                    }
                } else {
                    if (settings[topic]) {
                        $pipPopover.hide();
                        showTips(tips, ln);
                        settings[topic].tips = new Date();
                        pipSettingsData.saveSettings(settings, topic);
                    }
                }

            }

            function waitUserTipsQuotes(tips, quotes, ln) {
                var idleTimer = null;
                var idleState = false; // состояние отсутствия
                var idleWait = 180000; // время ожидания в мс. (1/1000 секунды)

                $(document).ready(function () {
                    $(document).bind('click keydown scroll', function () {
                        clearTimeout(idleTimer); // отменяем прежний временной отрезок
                        if (idleState == true) {
                            // Действия на возвращение пользователя
                        }

                        idleState = false;
                        idleTimer = setTimeout(function () {
                            // Действия на отсутствие пользователя
                            $pipPopover.hide();
                            if (!quotes)
                                showTips(tips, ln);
                            else if (!tips)
                                showQuotes(quotes, ln);
                            else {
                                if (Math.random() < 0.5)
                                    showTips(tips, ln);
                                else
                                    showQuotes(quotes, ln);

                            }


                            idleState = true;
                        }, idleWait);
                    });

                    $("body").trigger("click"); // сгенерируем ложное событие, для запуска скрипта
                });
            }

            function getTips(party, ln, topic, callBack) {

                pipTipsData.readTips(
                    {item: {}},
                    null,
                    function (result) {

                        filterTips(result.data, topic);

                        if (callBack) callBack(tips);

                        return tips;
                    },
                    function (error) {
                        console.log('cc', error);
                        return null;
                    }
                );
            }


        }
    );

})();