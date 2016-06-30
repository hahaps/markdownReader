(function() {
  'use strict';

  angular
    .module('markdownReader')
    .controller('CreateController', CreateController);

  /** @ngInject */
  function CreateController($scope, $state, $log, toastr,
     validatorService, menueService, menu) {
    var vm = this;
    vm.link = menu.link + "/";
    vm.name = "";
    vm.folder = menu.folder;
    vm.file = menu.folder ? false : true;
    $log.debug(vm);

    var createSuccess = function () {
      if(vm.folder) {
        toastr.success("Create folder successful");
      } else {
        toastr.success("Create file successful");
      }
      $state.go("home", null, {reload: true});
      $scope.$close();
    };
    var createFaild = function (err) {
      if(vm.folder) {
        toastr.error("Faild to create folder as " + err);
      } else {
        toastr.error("Faild to create file as " + err);
      }
    };

    vm.valid = function() {
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
        if(validatorService.checkExist(menu.children, vm.nam)) {
          toastr.warn("File " + vm.name + " exist.");
          return false;
        }
        if(vm.folder) {
          $log.debug("Creating a folder ...");
          menueService.folder.create(vm.link + '/' + vm.name)
                      .success(createSuccess).error(createFaild);
        } else {
          $log.debug("Creating a file ...");
          menueService.file.create(vm.link + '/' + vm.name + ".md")
                      .success(createSuccess).error(createFaild);
        }
      }
    }

    vm.select = function (type) {
      if(type === 'folder') {
        vm.folder = true;
        vm.file = false;
      } else {
        vm.folder = false;
        vm.file = true;
      }
    }
  }
})();
