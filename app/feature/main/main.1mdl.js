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
    .config(['$stateProvider', '$urlRouterProvider', route]);

  function route($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
//        abstract: true,
//        controller: 'MainController as vm',
        templateUrl: 'feature/main/main.view.html',
      })
      .state('buttons', {
        url: '/buttons',
//        abstract: true,
//        controller: 'MainController as vm',
        templateUrl: 'feature/main/main.buttons.html',
      })
      .state('grid', {
        url: '/grid',
//        abstract: true,
//        controller: 'MainController as vm',
        templateUrl: 'feature/main/main.grid.html',
      })
      .state('icons', {
        url: '/icons',
//        abstract: true,
//        controller: 'MainController as vm',
        templateUrl: 'feature/main/main.icons.html',
      })
      .state('notifications', {
        url: '/notifications',
//        abstract: true,
//        controller: 'MainController as vm',
        templateUrl: 'feature/main/main.notifications.html',
      })
      .state('typography', {
        url: '/typography',
//        abstract: true,
//        controller: 'MainController as vm',
        templateUrl: 'feature/main/main.typography.html',
      })
      .state('panelswells', {
        url: '/panelswells',
  //        abstract: true,
  //        controller: 'MainController as vm',
        templateUrl: 'feature/main/main.panels-wells.html',
      });

//      $urlRouterProvider.otherwise('main');
  }
})();
