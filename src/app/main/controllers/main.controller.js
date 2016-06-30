(function() {
  'use strict';

  angular
    .module('markdownReader')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http,
     toastr, menueService, $state) {
    var vm = this;
    vm.showNav = true;
    vm.editable = false;
    $scope.$on("SET:MENU", function (event, content) {
      vm.content = content;
      loadData();
    });

    vm.content = {
      header: "README",
      text: "/README.md"
    };
    var conentSuccess = function (data) {
      vm.content.content = data;
    }

    var contentError = function () {
      toastr.error("Faild to read data from " + vm.content.text);
    }
    var loadData = function () {
      $http({
        method: "GET",
        url: vm.content.text
      }).success(conentSuccess).error(contentError);
    }
    loadData();

    vm.save = function () {
      toastr.success("Update file/folder success.");
      $state.go("home", null, {reload: true});
    }

    var updateSuccess = function() {
      toastr.success("Update file success.");
      $state.go("home", null, {reload: true});
    };
    var updateError = function() {
      toastr.error("Failed to update file, please try again.");
    };

    vm.handle = function (type) {
      if(!type && vm.editable) {
        type = 'save';
      } else if(!type && !vm.editable) {
        type = 'edit';
      }
      if(type === 'cancel') {
        vm.editable = false;
        vm.showNav = true;
      } else if(type === 'edit') {
        vm.editable = true;
        vm.showNav = false;
      } else if(type === 'save'){
        menueService.file.update(vm.content.text, vm.content.content)
                    .success(updateSuccess).error(updateError);
      }
    }
  }
})();
