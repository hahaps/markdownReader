(function() {
  'use strict';

  angular
    .module('markdownReader')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
