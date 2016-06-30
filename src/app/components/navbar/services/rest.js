(function() {
  'use strict';

  angular
    .module('markdownReader')
    .factory('menueService', menueService);

  /** @ngInject */
  function menueService($http) {
    var service = {
      getMenues: getMenues,
      folder: {
        create: createFolder,
        delete: delFolder,
        updateName: updateFolderName
      },
      file: {
        create: createFile,
        delete: delFile,
        update: updateFile,
        updateName: updateFileName
      }
    };

    function getMenues () {
      return $http({
        method: "GET",
        url: "/menu"
      });
    }

    function createFolder (dir) {
      return $http({
        method: "POST",
        url: "/folder",
        data: {
          dir: dir
        }
      });
    }

    function delFolder (dir) {
      return $http({
        method: "POST",
        url: "/folder/del",
        data: {
          dir: dir
        }
      });
    }

    function updateFolderName (old, dir) {
      return $http({
        method: "POST",
        url: "/folder/update/name",
        data: {
          dir: dir,
          old: old
        }
      });
    }

    function createFile (file, content) {
      return $http({
        method: "POST",
        url: "/file",
        data: {
          file: file,
          content: content
        }
      });
    }

    function delFile (file) {
      return $http({
        method: "POST",
        url: "/file/del",
        data: {
          file: file
        }
      });
    }

    function updateFile (file, content) {
      return $http({
        method: "POST",
        url: "/file/update",
        data: {
          file: file,
          content: content
        }
      });
    }

    function updateFileName(old, file) {
      return $http({
        method: "POST",
        url: "/file/update/name",
        data: {
          file: file,
          old: old
        }
      });
    }

    return service;
  }
})();
