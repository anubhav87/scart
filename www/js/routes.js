angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.dashboard', {
    url: '/dashboard',
    views: {
      'tab2': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })

  .state('tabsController.checkout', {
    url: '/checkout',
    views: {
      'tab6': {
        templateUrl: 'templates/checkout.html',
        controller: 'checkoutCtrl'
      }
    }
  })


  .state('tabsController.category', {
    url: '/category',
    views: {
      'tab4': {
        templateUrl: 'templates/category.html',
        controller: 'categoryCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    url: '/profile',
    views: {
      'tab5': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('tabsController.forgotPassword', {
    url: '/page15',
    views: {
      'tab5': {
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotPasswordCtrl'
      }
    }
  })

  .state('tabsController.login', {
    url: '/page55',
    views: {
      'tab5': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('tabsController.products_list', {
    url: '/products_list/:category_id',
    views: {
      'tab5': {
        templateUrl: 'templates/products_list.html',
        controller: 'productCtrl'
      }
    }
  })

  .state('tabsController.product_details', {
    url: '/product_details/:product_id',
    views: {
      'tab5': {
        templateUrl: 'templates/product_details.html',
        controller: 'productCtrl'
      }
    }
  })

  .state('tabsController.signup', {
    url: '/page6',
    views: {
      'tab5': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })
  
  .state('tabsController.cart', {
    url: '/cart',
    views: {
      'tab6': {
        templateUrl: 'templates/cart.html',
        controller: 'cartCtrl'
      }
    }
  })

  .state('tabsController.notification', {
    url: '/notification',
    views: {
      'tab7': {
        templateUrl: 'templates/notifications.html',
        controller: 'notificationCtrl'
      }
    }
  })

  .state('category', {
      url: '/page7',
      templateUrl: 'templates/menu2.html',
      controller: 'categoryCtrl'
    })

  .state('menu2', {
      url: '/page7',
      templateUrl: 'templates/menu2.html',
      controller: 'menu2Ctrl'
    })


  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('offers', {
    url: '/page8',
    templateUrl: 'templates/offers.html',
    controller: 'offersCtrl'
  })

  .state('myCart', {
    url: '/page9',
    templateUrl: 'templates/myCart.html',
    controller: 'myCartCtrl'
  })

  .state('lastOrders', {
    url: '/page10',
    templateUrl: 'templates/lastOrders.html',
    controller: 'lastOrdersCtrl'
  })

  .state('favourite', {
    url: '/page11',
    templateUrl: 'templates/favourite.html',
    controller: 'favouriteCtrl'
  })

  .state('settings', {
    url: '/page12',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('support', {
    url: '/page13',
    templateUrl: 'templates/support.html',
    controller: 'supportCtrl'
  })

  .state('checkout', {
    url: '/page16',
    templateUrl: 'templates/checkout.html',
    controller: 'checkoutCtrl'
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page6',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('forgotPassword', {
    url: '/page15',
    templateUrl: 'templates/forgotPassword.html',
    controller: 'forgotPasswordCtrl'
  })
  
$urlRouterProvider.otherwise('/page1/dashboard')
//$urlRouterProvider.otherwise('/page1/category')

//$urlRouterProvider.otherwise('/page1/page5')
//$urlRouterProvider.otherwise('/page7')



});
