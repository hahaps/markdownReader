(function() {
  'use strict';

  angular
    .module('markdownReader')
    .factory('validatorService', validatorService);

  /** @ngInject */
  function validatorService() {
    var service = {
      validFileName: validFileName,
      validFolderName: validFolderName,
      checkExist: checkExist
    };

    var REG = /[<>,/\|:"*?']/g;
    function validFileName (name) {
      if(!name || name.length > 40 || name.lenght < 1) {
        return false;
      }
      if(REG.test(name)) {
        return false;
      }
      return true;
    }

    function validFolderName(name) {
      validFileName(name);
    }

    function checkExist(children, name) {
      children = children || [];
      var len = children.length;
      for(var index = 0; index < len; index ++) {
        if(children[index].label === name) {
          return true;
        }
      }
      return false;
    }

    return service;
  }
})();
