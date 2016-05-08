/**
 * @file Registration of all guidance components
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    angular.module('pipGuidance', [
        'pipTipsQuotes.Service',
        'pipIntroGuidance.Service',
        'pipGuidance.Dialog',
        'pipReleaseIntroDialog'
    ]);
    
})();