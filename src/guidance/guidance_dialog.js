/**
 * @file Guidance dialog
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipGuidance.Dialog', ['ngMaterial', 'pipTranslate', 'pipGuidance.Templates']);

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
     * @name pipGuidance.Dialog:pipGuidanceDialog
     *
     * @description
     * Reproduced API to show guidance dialog stretched out on a whole screen.
     * It is included a navigation and allows users to go back through guide.
     */
    thisModule.factory('pipGuidanceDialog',
        function ($mdDialog) {
            return {
                /**
                 * @ngdoc method
                 * @methodOf pipGuidance.Dialog:pipGuidanceDialog
                 * @name pipGuidance.Dialog.pipGuidanceDialog:show
                 *
                 * @description
                 * Shows guidance panel. Shown guidance can be close by click on backdrop space. Into callback function is
                 * passed nothing data.
                 *
                 * {@link https://github.com/pip-webui/pip-webui-guidance/blob/master/src/guidance/guidance_dialog.js#L50 View source}
                 *
                 * @param {Object} params   Options for dialog panel.
                 * @param {Function=} successCallback   Callback function is invoked on success dialog close.
                 * @param {Function=} cancelCallback    Callback function is invoked on error event.
                 */
                show: function (params, successCallback, cancelCallback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'guidance/guidance_dialog.html',
                        controller: 'pipGuidanceDialogController',
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

    thisModule.controller('pipGuidanceDialogController',
        function ($scope, $rootScope, $mdDialog, params) {
            $scope.theme = $rootScope.$theme;
            $scope.title = params.title || 'GUIDANCE_TITLE';

            $scope.imageUrl = params.imageUrl || '';
            $scope.imageWidth = params.imageWidth || '100%';
            $scope.imageHeight = params.imageHeight || '150px';

            $scope.content = params.content;
            $scope.action = params.action || 'GUIDANCE_ACTION';
            $scope.hideToggle = params.hideToggle;
            $scope.showHideToggle = params.hideToggleCallback != null;

            $scope.onCancel = function () {
                $mdDialog.cancel();
            };

            $scope.onAction = function () {
                $mdDialog.hide();
            };

            $scope.onHideToggle = function () {
                if (params.hideToggleCallback) {
                    params.hideToggleCallback($scope.hideToggle);
                }
            };
        });

})(window.angular);
