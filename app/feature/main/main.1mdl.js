(function() {
  'use strict';

  angular
    .module('mainApp', [
      'ui.router'
    ]);
})();

(function() {
  'use strict';

  angular
    .module('mainApp')
    .config(route);

  function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
//        abstract: true,
//        controller: 'MainController as vm',
        templateUrl: 'feature/main/main.view.html',
      });
  }
})();
