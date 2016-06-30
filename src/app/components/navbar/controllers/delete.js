(function() {
  'use strict';

  angular
    .module('markdownReader')
    .controller('DeleteController', DeleteController);

  /** @ngInject */
  function DeleteController($scope, $state, toastr, menueService, menu) {
    var vm = this;
    vm.fileName = menu.link;
    var deleteSuccess = function() {
      toastr.success("Delete file/folder success.");
      $scope.$close();
      $state.go("home", null, {reload: true});
    }

    var deleteError = function() {
      $scope.$close();
      toastr.error("Faild to delete file/folder.");
    }
    vm.delete = function () {
      if(menu.folder) {
        menueService.folder.delete(menu.link)
                    .success(deleteSuccess).error(deleteError);
      } else {
        menueService.file.delete(menu.link)
                    .success(deleteSuccess).error(deleteError);
      }
    }
  }
})();
