/**
 * @file Registration of all guidance components
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    angular.module('pipGuidance', [
        'pipTips.Service',
        'pipIntroGuidance.Service',
        'pipGuidance.Dialog',
        'pipReleaseIntroDialog'
    ]);
    
})();
(function(module) {
try {
  module = angular.module('pipGuidance.Templates');
} catch (e) {
  module = angular.module('pipGuidance.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('guidance/guidance_dialog.html',
    '<!--\n' +
    '@file Guidance dialog content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-dialog class="pip-dialog pip-guidance-dialog" layout="column" width="768" md-theme="{{theme}}">\n' +
    '    <div class="pip-header" layout="row">\n' +
    '        <h3 flex class="rm16">{{title | translate}}</h3>\n' +
    '        <md-button class="pip-dialog-close" ng-click="onCancel()" \n' +
    '            aria-label="{{::\'CLOSE\' | translate}}">\n' +
    '            <span class="icon-cross"></span>\n' +
    '        </md-button>\n' +
    '    </div>\n' +
    '    <div class="pip-body">\n' +
    '        <div class="pip-content">\n' +
    '            <pip-picture pip-src="imageUrl" ng-hide="!imageUrl || imageUrl == \'\'" class="bm16 center-block"\n' +
    '                ng-style="{ width: imageWidth, height: imageHeight, display: \'block\' }">\n' +
    '            </pip-picture>\n' +
    '\n' +
    '            <div class="bm16" pip-translate-html="{{::content}}"></div>\n' +
    '\n' +
    '            <md-button class="md-raised md-accent w-stretch" ng-click="onAction()"\n' +
    '                       ng-hide="!action || action==\'\'"\n' +
    '                       arial-label="{{::action | translate}}">\n' +
    '                {{::action | translate}}\n' +
    '            </md-button>\n' +
    '\n' +
    '            <md-checkbox aria-label="{{\'DO_NOT_SHOW\' | translate}}" class="w-stretch m0 tm16 regular_14"\n' +
    '                         ng-model="hideToggle" ng-change="onHideToggle()" ng-show="showHideToggle"\n' +
    '                         aria-label="{{::\'GUIDANCE_DO_NOT_SHOW\' | translate}}">\n' +
    '                {{::\'GUIDANCE_DO_NOT_SHOW\' | translate}}\n' +
    '            </md-checkbox>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipGuidance.Templates');
} catch (e) {
  module = angular.module('pipGuidance.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('intro_guidance/intro_guidance_dialog.html',
    '<md-dialog class="pip-dialog pip-guidance-dialog pip-guide-preview " layout="column" md-theme="{{theme}}">\n' +
    '    <div ng-if="!$routing" flex ng-swipe-left="onNextPage()" ng-swipe-right="onBackPage()"\n' +
    '         class="h-stretch layout layout-column {{\'bg-\' + data.pages[number].color}} ">\n' +
    '        <div class="layout layout-row layout-align-space-between-center layout-align-xs-center-center w-stretch pip-guide-page">\n' +
    '            <md-button ng-click="onBackPage()" class=" lm16 hide-xs" aria-label="BACK"\n' +
    '                       ng-disabled="transaction.busy() || number == 0">\n' +
    '                <md-icon md-svg-icon="icons:arrow-left" class="pip-arrow-button"\n' +
    '                         ng-class="{\'opacity-disabled\' :number == 0}"></md-icon>\n' +
    '            </md-button>\n' +
    '            <div class="layout layout-column layout-align-center-center bm16">\n' +
    '                <pip-collage class="flex-fixed" ng-if="data.pages[number].pic_id && (!data.pictures || !data.pictures[number])"\n' +
    '                             pip-picture-ids="data.pages[number].picId" pip-unique-code="data.id"\n' +
    '                             pip-multiple="false" pip-open="false" pip-rebind="true">\n' +
    '                </pip-collage>\n' +
    '                <div class="pip-pic" ng-if="!data.pages[number].pic_id || data.pictures[number]"\n' +
    '                     style="background-image: url({{data.pictures[number]}})"></div>\n' +
    '\n' +
    '                <div class="layout layout-column layout-align-center-center pip-text">\n' +
    '                    <p class="pip-preview-title" ng-if="data.pages[number].title[ln]">\n' +
    '                        {{data.pages[number].title[ln]}}</p>\n' +
    '\n' +
    '                    <p class="pip-preview-content" ng-if="data.pages[number].content[ln]">\n' +
    '                        {{data.pages[number].content[ln]}}</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <md-button ng-click="onNextPage()" class="rm16 hide-xs" aria-label="DOWN"\n' +
    '                       ng-disabled="transaction.busy() || number == data.pages.length - 1">\n' +
    '                <md-icon md-svg-icon="icons:arrow-right" class="pip-arrow-button"\n' +
    '                         ng-class="{\'opacity-disabled\' : number == data.pages.length - 1}"></md-icon>\n' +
    '            </md-button>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class=" flex-fixed flex w-stretch pip-guide-page-footer">\n' +
    '\n' +
    '\n' +
    '            <div  layout="row" layout-align="center center" ng-if="data.pages.length > 1">\n' +
    '                <md-icon ng-repeat="radio in data.pages" ng-click="onChangePage($index)" class="pip-radio-button "\n' +
    '                         md-svg-icon="{{radio != data.pages[number] ? \'icons:radio-off\' : \'icons:circle\'}}">\n' +
    '                </md-icon>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="h64" layout="row" layout-align-xs="space-between center"\n' +
    '                 layout-align="center center">\n' +
    '\n' +
    '                <md-button ng-click="onBackPage()" class="lm16" ng-if="$mdMedia(\'xs\')" aria-label="BACK"\n' +
    '                           ng-disabled="transaction.busy() || number == 0">\n' +
    '                    <md-icon md-svg-icon="icons:arrow-left" class="pip-arrow-button"\n' +
    '                             ng-class="{\'opacity-disabled\' :number == 0}"></md-icon>\n' +
    '                </md-button>\n' +
    '\n' +
    '                <md-button ng-click="onClose()"\n' +
    '                           class="pip-button-got rm8 lm8\n' +
    '                                       {{number == data.pages.length - 1  ? \'fg-\' + data.pages[number].color : \'bg-\' + data.pages[number].color}}"\n' +
    '                           ng-class="{\'md-raised\':  number == data.pages.length - 1}"\n' +
    '                           aria-label="NEXT"\n' +
    '                           ng-disabled="transaction.busy()">\n' +
    '                    GOT IT !\n' +
    '                </md-button>\n' +
    '\n' +
    '                <md-button ng-click="onNextPage()" class="rm16 "  ng-if="$mdMedia(\'xs\')"  aria-label="DOWN"\n' +
    '                           ng-disabled="transaction.busy() || number == data.pages.length - 1">\n' +
    '                    <md-icon md-svg-icon="icons:arrow-right" class="pip-arrow-button"\n' +
    '                             ng-class="{\'opacity-disabled\' : number == data.pages.length - 1}"></md-icon>\n' +
    '                </md-button>\n' +
    '            </div>\n' +
    '\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipGuidance.Templates');
} catch (e) {
  module = angular.module('pipGuidance.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tips/tip.template.html',
    '<div ng-if="title" class=\'pip-title p24-flex flex-fixed bp16\'>\n' +
    '    {{ title | translate }}\n' +
    '</div>\n' +
    '\n' +
    '<div class=\'pip-content pip-popover-content lp24-flex rp24-flex text-body1 bm64 pip-scroll\'\n' +
    '     ng-class="{\'tm24\' : !title }">\n' +
    '    <div ng-if="image && $mdMedia(\'gt-xs\')" class="pip-pic"></div>\n' +
    '    <pip-markdown pip-text="content" pip-rebind="true"></pip-markdown>\n' +
    '</div>\n' +
    '\n' +
    '<div class=\'pip-footer lm24-flex rm24-flex position-bottom\'\n' +
    '     layout="row" layout-align="start center">\n' +
    '    <a ng-if="link" target="_blank" href="{{ link }}" class="text-body2" flex>\n' +
    '        {{ \'MORE_URL\' | translate }}\n' +
    '    </a>\n' +
    '    <div  ng-if="!link" flex></div>\n' +
    '\n' +
    '    <md-button ng-click=\'onNextClick()\' class="rm0">\n' +
    '        {{ \'NEXT\' | translate }}\n' +
    '    </md-button>\n' +
    '\n' +
    '</div>');
}]);
})();

/**
 * @file Guidance dialog
 * @copyright Digital Living Software Corp. 2014-2015
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipGuidance.Dialog', ['ngMaterial', 'pipTranslate', 'pipGuidance.Templates']);

    thisModule.config(['pipTranslateProvider', function(pipTranslateProvider) {
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
    }]);

    thisModule.factory('pipGuidanceDialog', 
        ['$mdDialog', function ($mdDialog) {
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
        }]
    );

    thisModule.controller('pipGuidanceDialogController',
        ['$scope', '$rootScope', '$mdDialog', 'params', function ($scope, $rootScope, $mdDialog, params) {
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
        }]
    );

})();

/**
 * @file Guidance dialog
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipReleaseIntroDialog', ['ngMaterial', 'pipTranslate', 'pipGuidance.Templates']);

    thisModule.config(['pipTranslateProvider', function (pipTranslateProvider) {
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
    }]);

    thisModule.factory('pipReleaseIntroDialog',
        ['$mdDialog', function ($mdDialog) {
            return {
                show: function (params, successCallback, cancelCallback) {
                    $mdDialog.show({
                        targetEvent: params.event,
                        templateUrl: 'intro_guidance/intro_guidance_dialog.html',
                        controller: 'pipReleaseIntroDialogController',
                        locals: {params: params},
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
        }]
    );

    thisModule.controller('pipReleaseIntroDialogController',
        ['$scope', '$rootScope', '$mdDialog', '$mdMedia', 'params', '$state', function ($scope, $rootScope, $mdDialog, $mdMedia, params, $state) {
            $scope.theme = $rootScope.$theme;
            $scope.settings = params.settings;
            $scope.admin = params.admin;
            $scope.$mdMedia = $mdMedia;

            var guide = params.guide;

            if (!$scope.admin)
                if ($scope.settings[params.settingsName] && $scope.settings[params.settingsName].lastId) {
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
                if ($scope.number != 0)
                    $scope.number -= 1;
            };

            $scope.onNextPage = function () {
                if ($scope.number != $scope.data.pages.length - 1)
                    $scope.number += 1;
            };

            $scope.onClose = function () {
                if (!$scope.admin) {
                    $scope.settings[params.settingsName].lastId = $scope.data.id;
                    $scope.settings[params.settingsName].date = new Date();

                    params.pipSettingsData.saveSettings($scope.settings, params.settingsName);
                }


                $mdDialog.cancel();
            }
        }]
    );

})();

/**
 * @file Guidance service
 * @copyright Digital Living Software Corp. 2014-2015
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipIntroGuidance.Service', ['pipReleaseIntroDialog']);

    thisModule.factory('pipGuidance', ['pipReleaseIntroDialog', 'pipSettingsData', '$rootScope', function ( pipReleaseIntroDialog, pipSettingsData, $rootScope) {

            return {
                showIntroReleaseGuide: showIntroReleaseGuide,
                findIntroReleaseGuide: findIntroReleaseGuide
            }

            function showIntroReleaseGuide(guide, settings, admin, ln, party, user) {
                if (guide && party.id == user.id)
                    pipReleaseIntroDialog.show(
                        {
                            guide: guide,
                            settings: settings,
                            settingsName: guide.type == 'intro' ? 'intro': 'release',
                            pipSettingsData: pipSettingsData,
                            admin: admin,
                            ln: ln

                        }
                    );

            };

            function findIntroReleaseGuide(guides, settings) {
                var guidesSort;

                if (!settings.intro || !settings.intro.lastId) {
                    guidesSort = _.filter(guides, function (guide) {
                        return guide.type == 'intro' && guide.status == 'completed';
                    });
                    guidesSort = _.sortBy(guidesSort, function (guide) {
                        return -new Date(guide.created).getTime();
                    });
                    return guidesSort[0];
                }
                else {
                    guidesSort = _.filter(guides, function (guide) {
                        return guide.type == 'new release' && guide.status == 'completed';
                    });

                    guidesSort = _.sortBy(guidesSort, function (guide) {
                        return -new Date(guide.created).getTime();
                    });

                    if (!settings.intro.date || (guidesSort.length > 0 && new Date(settings.intro.date) < new Date(guidesSort[0].created)
                        && guidesSort[0].id != settings.release.lastId)) {
                        return guidesSort[0];
                    } else {
                        return null;
                    }
                }
            };
        }]
    );

})();
/**
 * @file Tips service
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTips.Service', ['pipGuidance.Templates']);

    thisModule.factory('pipTips', ['$pipPopover', 'pipTipsData', 'pipRest', '$timeout', '$rootScope', 'pipSettingsData', function ($pipPopover, pipTipsData, pipRest, $timeout, $rootScope, pipSettingsData) {
            var tips;
            
            return {
                getTips: getTips,
                filterTips: filterTips,
                showTips: showTips,
                firstShowTips: firstShowTips,
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

            function showTips(tips, ln, $event) {

                if (tips && tips.length > 0) {
                    $pipPopover.hide();
                    $pipPopover.show({
                        element: $event ? $event.currentTarget : null,
                        class: 'pip-tip',
                        cancelCallback: function () {
                            return false
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
                        return null;
                    }
                );
            }


        }]
    );

})();
//# sourceMappingURL=pip-webui-guidance.js.map
