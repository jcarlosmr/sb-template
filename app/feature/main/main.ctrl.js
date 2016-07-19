(function() {
  'use strict';

  angular
    .module('mainApp')
    .controller('MainController', MainController);

  function MainController($stateProvider) {
    var vm = this;

    angular.extend(vm, {
      getData: getData
    });

    activate();

    function activate() {

    }

    function getData () {

    }
  }
})();
