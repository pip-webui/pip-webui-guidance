/**
 * @file Guidance page for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipSampleGuidance', ['pipTranslate', 'pipRest', 'pipGuidance']);

    thisModule.config(function (pipTranslateProvider, pipAuthStateProvider) {

             //Set translation strings for the module
             pipTranslateProvider.translations('en', {
                 MORE_URL:'See more',
                 NEXT:'Next',
                 GUIDE: 'Guidance',
                 GUIDE_DIALOG: 'Guide dialog',
                 GUIDE_TIP: 'Guide tip',
                 OPEN_GUIDE_DIALOG: 'Open guide dialog',
                 OPEN_GUIDE_TIP: 'Open guide tip'
             });

             pipTranslateProvider.translations('ru', {
                 MORE_URL: 'Больше по ссылке',
                 NEXT:'Следующая',
                 GUIDE: 'Рекомендации',
                 GUIDE_DIALOG: 'Диалог введения',
                 GUIDE_TIP: 'Совет',
                 OPEN_GUIDE_DIALOG: 'Открыть диалог введения',
                 OPEN_GUIDE_TIP: 'Открыть совет'
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
        function ($scope, $mdDialog, $rootScope, pipGuidance, pipTips, $pipPopover, pipAppBar) {

            $scope.settings = _.defaults($rootScope.$settings, {intro: {}, release: {}});
            $scope.onGuideDialog = onGuideDialog;
            $scope.showTips = showTips;

            showAppBar();

            $scope.guide = {
                app: "notes",
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

            return;

            function onGuideDialog() {
                pipGuidance.showIntroReleaseGuide($scope.guide, $scope.settings, null, 'en',
                    $rootScope.$party, $rootScope.$user);
            }

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

            function showAppBar() {
                pipAppBar.showMenuNavIcon();
                pipAppBar.showTitleText('GUIDE');
                pipAppBar.showLanguage();

                pipAppBar.showShadowSm();
            }

        }
    );

})(window.angular);
