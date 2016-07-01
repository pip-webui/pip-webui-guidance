/**
 * @file Guidance service
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipIntroGuidance.Service', ['pipReleaseIntroDialog']);

    /**
     * @ngdoc service
     * @name pipIntroGuidance.Service.pipGuidance
     *
     * @description
     * Service provides an interface to show introduction guide.
     *
     * @requires pipReleaseIntroDialog
     */
    thisModule.factory('pipGuidance', function (pipReleaseIntroDialog, pipSettingsData) {

        return {
            /** @see showIntroReleaseGuide */
            showIntroReleaseGuide: showIntroReleaseGuide,
            /** @see findIntroReleaseGuide */
            findIntroReleaseGuide: findIntroReleaseGuide
        };

        /**
         * @ngdoc method
         * @methodOf pipIntroGuidance.Service.pipGuidance
         * @name pipIntroGuidance.Service.pipGuidance:showIntroReleaseGuide
         *
         * @description
         * Shows introduction guide
         *
         * {@link https://github.com/pip-webui/pip-webui-guidance/blob/master/src/intro_guidance/intro_guidance_service.js#L51 View source}
         *
         * @param {Object} guide    Collection with intro information
         * @param {Object} settings Settings object
         * @param {boolean} admin   It is true when user has admin role
         * @param {string} ln       Tips content language
         * @param {Object} party    User's party object
         * @param {Object} user     User's profile
         *
         * @example
         * <pre>
         *     pipGuidance.showIntroReleaseGuide($scope.guide, $scope.settings, null, 'en', $rootScope.$party, $rootScope.$user);
         * </pre>
         */
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

        /**
         * @ngdoc method
         * @methodOf pipIntroGuidance.Service.pipGuidance
         * @name  pipIntroGuidance.Service.pipGuidance:findIntroReleaseGuide
         *
         * @description
         * Finds guideline due to passed settings options.
         *
         * {@link https://github.com/pip-webui/pip-webui-guidance/blob/master/src/intro_guidance/intro_guidance_service.js#80 View source}
         *
         * @param {Object} guides   Collection of guides
         * @param {Object} settings Guide options.
         *
         * @return {Object} Sorted guideline. Result is dependece on 'settings.intro' field. If it is existed than it returns
         * intro guide with 'completed' status.
         */
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
            }

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
    });

})(window.angular, window._);
