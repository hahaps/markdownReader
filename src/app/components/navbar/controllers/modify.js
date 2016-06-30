(function() {
  'use strict';

  angular
    .module('markdownReader')
    .controller('ModifyController', ModifyController);

  /** @ngInject */
  function ModifyController($scope, $state, toastr, $log,
     validatorService, menueService, menu) {
    var vm = this;
    var link = menu.link || "/doc";
    vm.name = menu.label || "";
    var nameLen = vm.name.length;
    nameLen += menu.folder ? 0 : 3;
    vm.link = link.substr(0, link.length - nameLen);
    vm.folder = menu.folder;
    vm.file = menu.folder ? false : true;

    var updateSuccess = function () {
      if(vm.folder) {
        toastr.success("Update folder name successful");
      } else {
        toastr.success("Update file name successful");
      }
      $scope.$close();
      $state.go("home", null, {reload: true});
    };
    var updateFaild = function (err) {
      if(vm.folder) {
        toastr.error("Faild to update folder name as " + err);
      } else {
        toastr.error("Faild to update file name as " + err);
      }
    };

    vm.vaild = function() {
      if(!validatorService.validFileName(vm.name)) {
        vm.invalid = true;
        return false;
      }
      vm.invalid = false;
    }
    var ENTER_KEYCODE = 13;
    vm.hander = function($event) {
      var keycode = $event.keyCode;
      if(keycode === ENTER_KEYCODE) {
        if(vm.folder) {
          $log.debug("Updating folder name ...");

          menueService.folder.updateName(
            menu.link, vm.link + '/' + vm.name)
                      .success(updateSuccess).error(updateFaild);
        } else {
          $log.debug("Updating file name ...");
          menueService.file.updateName(
            menu.link, vm.link + '/' + vm.name + ".md")
                      .success(updateSuccess).error(updateFaild);
        }
      }
    }
  }
})();
