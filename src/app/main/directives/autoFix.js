(function() {
  'use strict';

  angular
    .module('markdownReader')
    .directive('autoFixHeight', autoFixHeight);

  /** @ngInject */
  function autoFixHeight() {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: AutoFix
    };

    return directive;

    /** @ngInject */
    function AutoFix($scope, $ele, $attrs, ngModel) {
      var $target = angular.element("#" + $attrs.target);
      $scope.$watch(function () {
        return ngModel.$modelValue;
      }, function() {
        if($target.length && $target.height()) {
          $ele.css("height", $target.css("height"));
        }
      });
    }
  }
})();
