(function() {
  'use strict';

  angular
    .module('markdownReader')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/templates/navbar.html',
      controller: NavbarController,
      bindToController: true,
      replace: true,
      controllerAs: 'nv'
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, menueService,
       toastr, $log, $uibModal) {
      var vm = this;
      var default_menu = {
        label: "README",
        link: "/README.md"
      }
      var getMenuSuccess = function (menue) {
        menue = menue || [];
        menue.push(default_menu);
        vm.treedata = menue;
        $scope.$emit("SET:MENU", {
          header: default_menu.name,
          text: default_menu.link
        });
      };
      var getMenuError = function () {
        toastr.error("Faild to get Menue");
        vm.treedata = [default_menu];
        vm.options = {
          allowDeselect: false
        };
        $scope.$emit("SET:MENU", {
          header: default_menu.name,
          text: default_menu.link
        });
      };
      menueService.getMenues().success(getMenuSuccess).error(getMenuError);

      vm.selectedNode = null;
      vm.showSelected = function (item) {
        if(vm.selectedNode && vm.selectedNode.link === item.link) {
          $log.debug("Node %s was selected.", item.label);
          return false;
        }
        vm.selectedNode = item;
        if(!item.folder) {
          $scope.$emit("SET:MENU", {
            header: item.name,
            text: item.link
          });
        }
      }

      vm.create = function (item) {
        $uibModal.open({
          bindToController: true,
          controller: 'CreateController',
          controllerAs: 'cr',
          templateUrl: 'app/components/navbar/templates/create.html',
          size: 'lg',
          resolve: {
            menu: item
          }
        });
      }

      vm.edit = function (item) {
        $uibModal.open({
          bindToController: true,
          controller: 'ModifyController',
          controllerAs: 'ed',
          templateUrl: 'app/components/navbar/templates/modify.html',
          size: 'lg',
          resolve: {
            menu: item
          }
        });
      }

      vm.destroy = function (item) {
        if(item.children && item.children.length) {
          toastr.warning("Delete files behind " + item.link + " firt.");
        } else {
          $uibModal.open({
            bindToController: true,
            controller: 'DeleteController',
            controllerAs: 'del',
            templateUrl: 'app/components/navbar/templates/delete.html',
            size: 'lg',
            resolve: {
              menu: item
            }
          });
        }
      }
    }
  }
})();
