/**
 * @file Guidance page for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipSampleGuidance', ['pipTranslate', 'pipRest', 'pipGuidance']);

    thisModule.config(function (pipTranslateProvider, pipAuthStateProvider) {

            // Set translation strings for the module
            // pipTranslateProvider.translations('en', {
            //     'MORE_URL':'See more',
            //     'NEXT':'Next'
            // });

            // pipTranslateProvider.translations('ru', {
            //     'MORE_URL': 'Больше по ссылке',
            //     'NEXT':'Следующая'
            // });

            // Configure module routes
            pipAuthStateProvider
                .state('guidance', {
                    url: '/guidance',
                    controller: 'SampleGuidanceController',
                    templateUrl: 'guidance.html',
                    auth: true
                });
    });
        
    thisModule.controller('SampleGuidanceController',
        function ($scope, $mdDialog, $rootScope, pipGuidance, pipSettingsData, pipReleaseIntroDialog,
                  pipTipsQuotes, pipTipsData, $pipPopover) {
            console.log(this);

            $scope.onFeedbackDialog = onFeedbackDialog;

            $scope.settings = _.defaults($rootScope.$settings, {intro: {}, release: {}});
            $scope.onGuideDialog = onGuideDialog;
            $scope.showTips = showTips;
            $scope.showRealTips = showRealTips;
            $scope.showQuote = showQuote;
            $scope.onGuideDialogReal = onGuideDialogReal;

            $scope.guide = {
                app: "notes",
                created: "2015-10-06T14:05:20.173Z",
                creator_id: "55f69876440421b812d4e701",
                creator_name: "Doggy Dogg",
                id: "5613d5204c5c65b511bf6f8c",
                pages: [
                    {
                        title: {en: "Title 1", ru: "Русский заголовок a a a a a a a a a a a a a a a a a a a a a aa "},
                        content: {en: "Text 1", ru: "Текст"},
                        more_url: "", color: "cyan"
                    },
                    {
                        title: {en: "Title 2", ru: "Aa"},
                        content: {en: "Text 2", ru: "Conveniently transition optimal e-commerce rather than B2B partnerships. Conveniently benchmark high-quality mindshare rather than fully tested architectures. Efficiently embrace premium users and accurate products. Credibly actualize interactive mindshare before robust methodologies"},
                        more_url: "", color: "cyan",
                        pic_id: '56eaeea387639bd2182fbac6'
                    }
                ],
                pictures: [
                    'http://rjnzhfvfnthjdbx.gorod.tomsk.ru/posts-files/74/223/i/25.jpg'
                ],
                status: "new",
                topic: "ffff444",
                type: "intro"
            };

            console.log(tips, quotes);
            var quotes = pipTipsQuotes.filterQuotes(quotes);
            var tips = pipTipsQuotes.filterTips(tips, 'goals');
            console.log(tips, quotes);
            if(tips){
                pipTipsQuotes.firstShowTips(tips, 'en', 'goals', settings);
            }

            if(tips || quotes){
                pipTipsQuotes.waitUserTipsQuotes(tips, quotes,'en');
            }



            return;

            function onGuideDialog() {
                pipGuidance.showIntroReleaseGuide($scope.guide, $scope.settings, null, 'en', $rootScope.$party, $rootScope.$user);
            }

            function onGuideDialogReal() {
                var guide =  pipGuidance.findIntroReleaseGuide(guides, $scope.settings);

                pipGuidance.showIntroReleaseGuide(guide, $scope.settings, null, 'en', $rootScope.$party, $rootScope.$user);
            }

            function onFeedbackDialog(event) {
                $mdDialog.show({
                    templateUrl: 'feedback/feedback_dialog.html',
                    controller: 'FeedbackDialogController',
                    targetEvent: event,
                    locals: {party: $rootScope.$party}
                }).then(
                    function (answer) {
                        if (answer) {
                            var message = String() + 'RESET_PWD_SUCCESS_TEXT';
                            $scope.onShowToast(message, 'message');
                        }
                    });
            };

            function showTips() {
                var title = 'Some long or not very long title1';
                $pipPopover.show({
                    class: 'pip-tip',
                    cancelCallback: function () {
                        console.log('backdrop clicked');
                    },
                    locals:{
                      title: title
                    },
                    controller: function ($scope, $timeout, $mdMedia) {

                        $scope.title = $scope.locals.title;
                        $scope.content = 'Completely synthesize high standards in products without stand-alone action items. Dramatically synergize customized models after competitive networks. Progressively optimize highly efficient internal or "organic" sources and cost effective imperatives. Uniquely drive client-based growth strategies vis-a-vis backward-compatible bandwidth. Authoritatively seize clicks-and-mortar models through magnetic paradigms. Interactively.';
                        $scope.image = 'https://pp.vk.me/c7004/v7004812/1cbe4/SlAPkJDiUn4.jpg';
                        $scope.link = 'http://github.com/pip-life/pip-life/issues';

                        $scope.$mdMedia = $mdMedia;

                        position();

                        $scope.onNextClick = function () {
                            $pipPopover.hide();
                        };

                        $scope.$on('pipWindowResized', position);

                        function position() {
                            $timeout(function () {
                                var backdropElement = $('.pip-popover-backdrop'),
                                    popover = backdropElement.find('.pip-popover');
                                    popover.find('.pip-pic').css('background-image', 'url(' + $scope.image + ')');

                            }, 100);

                        }

                    },
                    templateUrl: 'guidance/tip.template.html'
                });
            }

            function showRealTips($event) {

                pipTipsQuotes.showTips(tips, 'en', $event);
            }

            function showQuote() {
                $pipPopover.show({
                    class: 'pip-quote',
                    cancelCallback: function () {
                        console.log('backdrop clicked');
                    },
                    controller: function ($scope, $timeout) {

                        $scope.author = 'Иоганн Вольфганг Гёте. Фауст';
                        $scope.content = 'Всё песня та ж — сюжет избит: Глупец велит — мудрец гласит.';

                        $scope.onNextClick = function () {
                            $pipPopover.hide();
                        };


                    },
                    templateUrl: 'guidance/quote.template.html'
                });
            }

        }
    );

})();
