/**
 * @file Guidance dialog
 * @copyright Digital Living Software Corp. 2014-2015
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipGuidance.Dialog', ['ngMaterial', 'pipTranslate', 'pipGuidance.Templates']);

    thisModule.config(function(pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'GUIDANCE_TITLE': 'What should you do here?',
            'GUIDANCE_ACTION': 'Do it now!',
            'GUIDANCE_DO_NOT_SHOW': "Don't show it again"
        });
        pipTranslateProvider.translations('ru', {
            'GUIDANCE_TITLE': 'Что здесь делать?',
            'GUIDANCE_ACTION': 'Сделать это сейчас!',
            'GUIDANCE_DO_NOT_SHOW': 'Не показывать это снова'
        });
    });

    thisModule.factory('pipGuidanceDialog', 
        function ($mdDialog) {
            return {
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

            $scope.onHideToggle = function(event) {
                if (params.hideToggleCallback) {
                    params.hideToggleCallback($scope.hideToggle);
                } 
            };
        }
    );

})();
