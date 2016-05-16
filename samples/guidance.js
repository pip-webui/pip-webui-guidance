/**
 * @file Guidance page for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipSampleGuidance', ['pipTranslate', 'pipRest', 'pipGuidance']);

    thisModule.config(function (pipTranslateProvider, pipAuthStateProvider) {

             //Set translation strings for the module
             pipTranslateProvider.translations('en', {
                 'MORE_URL':'See more',
                 'NEXT':'Next'
             });

             pipTranslateProvider.translations('ru', {
                 'MORE_URL': 'Больше по ссылке',
                 'NEXT':'Следующая'
             });

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
        function ($scope, $mdDialog, $rootScope, pipGuidance, pipTips, $pipPopover) {

            $scope.settings = _.defaults($rootScope.$settings, {intro: {}, release: {}});
            $scope.onGuideDialog = onGuideDialog;
            $scope.showTips = showTips;
            //$scope.showRealTips = showRealTips;
            //$scope.onGuideDialogReal = onGuideDialogReal;

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


            //var tips = pipTips.filterTips(tips, 'goals');
            ////var guides = [];
            ////guides.push($scope.guide);
            //
            //if(tips){
            //    pipTips.firstShowTips(tips, 'en', 'goals', $scope.settings);
            //}

            return;

            function onGuideDialog() {
                pipGuidance.showIntroReleaseGuide($scope.guide, $scope.settings, null, 'en', $rootScope.$party, $rootScope.$user);
            }
            //
            //function onGuideDialogReal() {
            //    var guide =  pipGuidance.findIntroReleaseGuide(guides, $scope.settings);
            //
            //    pipGuidance.showIntroReleaseGuide(guide, $scope.settings, null, 'en', $rootScope.$party, $rootScope.$user);
            //}

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
                    templateUrl: 'tips/tip.template.html'
                });
            }

            //function showRealTips($event) {
            //    pipTips.showTips(tips, 'en', $event);
            //}

        }
    );

})();
