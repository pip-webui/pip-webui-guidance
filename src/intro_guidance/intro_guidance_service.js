/**
 * @file Guidance service
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipIntroGuidance.Service', ['pipReleaseIntroDialog']);

    thisModule.factory('pipGuidance', function (pipReleaseIntroDialog, pipSettingsData, $rootScope) {

        return {
            showIntroReleaseGuide: showIntroReleaseGuide,
            findIntroReleaseGuide: findIntroReleaseGuide
        };

        function showIntroReleaseGuide(guide, settings, admin, ln, party, user) {
            if (guide && party.id === user.id) {
                pipReleaseIntroDialog.show({
                    guide: guide,
                    settings: settings,
                    settingsName: guide.type === 'intro' ? 'intro' : 'release',
                    pipSettingsData: pipSettingsData,
                    admin: admin,
                    ln: ln
                });
            }
        }

        function findIntroReleaseGuide(guides, settings) {
            var guidesSort;

            if (!settings.intro || !settings.intro.lastId) {
                // TODO [apidhirnyi] Make chaining for filter and sortBy
                guidesSort = _.filter(guides, function (guide) {
                    return guide.type === 'intro' && guide.status === 'completed';
                });

                guidesSort = _.sortBy(guidesSort, function (guide) {
                    return -new Date(guide.created).getTime();
                });

                return guidesSort[0];
            } else {
                guidesSort = _.filter(guides, function (guide) {
                    return guide.type === 'new release' && guide.status === 'completed';
                });

                guidesSort = _.sortBy(guidesSort, function (guide) {
                    return -new Date(guide.created).getTime();
                });

                if (!settings.intro.date || (guidesSort.length > 0 &&
                    new Date(settings.intro.date) < new Date(guidesSort[0].created) &&
                    guidesSort[0].id != settings.release.lastId)) {
                    return guidesSort[0];
                }

                return null;
            }
        }
    });

})(window.angular, window._);
