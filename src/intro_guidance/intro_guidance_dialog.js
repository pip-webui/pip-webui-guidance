/**
 * @file Guidance dialog
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipReleaseIntroDialog', ['ngMaterial', 'pipTranslate', 'pipGuidance.Templates']);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            GUIDANCE_TITLE: 'What should you do here?',
            GUIDANCE_ACTION: 'Do it now!',
            GUIDANCE_DO_NOT_SHOW: "Don't show it again"
        });
        pipTranslateProvider.translations('ru', {
            GUIDANCE_TITLE: 'Что здесь делать?',
            GUIDANCE_ACTION: 'Сделать это сейчас!',
            GUIDANCE_DO_NOT_SHOW: 'Не показывать это снова'
        });
    });

    /**
     * @ngdoc service
     * @name pipReleaseIntroDialog.pipReleaseIntroDialog
     *
     * @description
     * Provides API to show intro dialog.
     */
    thisModule.factory('pipReleaseIntroDialog',
        function ($mdDialog) {
            return {
                /**
                 * @ngdoc method
                 * @methodOf pipReleaseIntroDialog.pipReleaseIntroDialog
                 * @name pipReleaseIntroDialog.pipReleaseIntroDialog:show
                 *
                 * @description
                 * Shows dialog panel. Shown dialog can be close by click on backdrop space. Into callback function is
                 * passed nothing data.
                 *
                 * {@link https://github.com/pip-webui/pip-webui-guidance/blob/master/src/intro_guidance/intro_guidance_dialog.js#L50 View source}
                 * 
                 * @param {Object} params   Options for dialog panel.
                 * @param {Function=} successCallback   Callback function is invoked on success dialog close.
                 * @param {Function=} cancelCallback    Callback function is invoked on error event.
                 *
                 */
                show: function (params, successCallback, cancelCallback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'intro_guidance/intro_guidance_dialog.html',
                        controller: 'pipReleaseIntroDialogController',
                        locals: { params: params },
                        clickOutsideToClose: true
                    })
                        .then(function () {
                            if (successCallback) {
                                successCallback();
                            }
                        }, function () {
                            if (cancelCallback) {
                                cancelCallback();
                            }
                        });
                }
            };
        }
    );

    thisModule.controller('pipReleaseIntroDialogController',
        function ($scope, $rootScope, $mdDialog, $mdMedia, params) {
            $scope.theme = $rootScope.$theme;
            $scope.settings = params.settings;
            $scope.admin = params.admin;
            $scope.$mdMedia = $mdMedia;

            var guide = params.guide;

            if (!$scope.admin && $scope.settings[params.settingsName] && $scope.settings[params.settingsName].lastId) {
                params.settingsName = 'release';
            }

            $scope.number = 0;
            $scope.ln = params.ln || $rootScope.$language || 'en';
            $scope.data = guide;

            _.each($scope.data.pages, function (page) {
                if (page.pic_id) {
                    var picId = page.pic_id;

                    page.picId = [];
                    page.picId.push(picId);
                }
            });

            // Process user actions
            // --------------------

            $scope.onChangePage = function (newNumber) {
                $scope.number = newNumber;
            };

            $scope.onBackPage = function () {
                if ($scope.number !== 0) {
                    $scope.number -= 1;
                }
            };

            $scope.onNextPage = function () {
                if ($scope.number !== $scope.data.pages.length - 1) {
                    $scope.number += 1;
                }
            };

            $scope.onClose = function () {
                if (!$scope.admin) {
                    $scope.settings[params.settingsName].lastId = $scope.data.id;
                    $scope.settings[params.settingsName].date = new Date();

                    params.pipSettingsData.saveSettings($scope.settings, params.settingsName);
                }

                $mdDialog.cancel();
            };
        }
    );

})(window.angular, window._);
