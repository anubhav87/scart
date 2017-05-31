angular.module('app.controllers', [])

.controller('indexCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$ionicSideMenuDelegate) {

    $rootScope.testtest = "TESTING TEXT A";
    $rootScope.cart_data = [];
    $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
    //$ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

    // $ionicHistory.nextViewOptions({
    //   historyRoot: true
    // });
    $scope.isLoggedIn = false;
    $rootScope.extras = false;
    sharedUtils.hideLoading();
    //$state.go('tabsController.login', {}, {location: "replace"});
    $scope.logout=function(){

        sharedUtils.showLoading();
        // Will be run after sesssion is deleted
        //$ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        //$ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('tabsController.dashboard', {}, {location: "replace"});
    }

    $scope.loadCartProductsInBackground = function() {
      sharedUtils.getCartProducts().then(function (result) {
          if (result.data.msg == "error") {
          } else {
            $rootScope.cart_data = result.data.data;
          }
      }, function (error) {
          sharedUtils.showAlert("Please note","Error in refreshing the cart!");
      });
    }

})

.controller('dashboardCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate, $timeout) {



    //====================================
    // Slick Banner
    //====================================
    $scope.banner_images = [
      {src: "http://localhost:8082/ionic_apps/scart/php_code/e_comm/big-1.jpg", title: 1}, 
      {src: "http://localhost:8082/ionic_apps/scart/php_code/e_comm/big-2.jpg", title: 2}, 
      {src: "http://localhost:8082/ionic_apps/scart/php_code/e_comm/big-3.jpg", title: 3}, 
      {src: "http://localhost:8082/ionic_apps/scart/php_code/e_comm/big-4.jpg", title: 4}, 
      {src: "http://localhost:8082/ionic_apps/scart/php_code/e_comm/big-1.jpg", title: 5}, 
      {src: "http://localhost:8082/ionic_apps/scart/php_code/e_comm/big-2.jpg", title: 6}, 
      {src: "http://localhost:8082/ionic_apps/scart/php_code/e_comm/big-3.jpg", title: 7}, 
      {src: "http://localhost:8082/ionic_apps/scart/php_code/e_comm/big-4.jpg", title: 8}, 
    ];

    $scope.slickConfig_img_Loaded = true;

    $scope.slickCurrentIndex = 0;
    $scope.slickConfig_img = {
      dots: true,
      autoplay: false,
      initialSlide: 0,
      infinite: true,
      autoplaySpeed: 5000,
      centerMode: true,
      method: {},
    };


    //====================================
    // Slick Slider
    //====================================
    $scope.slider_images = [
      {src: "http://localhost/ionic_apps/scart/php_code/e_comm/small-1.jpg", title: 1}, 
      {src: "http://localhost/ionic_apps/scart/php_code/e_comm/small-2.jpg", title: 2}, 
      {src: "http://localhost/ionic_apps/scart/php_code/e_comm/small-3.jpg", title: 3}, 
      {src: "http://localhost/ionic_apps/scart/php_code/e_comm/small-4.jpg", title: 4}, 
      {src: "http://localhost/ionic_apps/scart/php_code/e_comm/small-5.jpg", title: 5}, 
      {src: "http://localhost/ionic_apps/scart/php_code/e_comm/small-6.jpg", title: 6}, 
      {src: "http://localhost/ionic_apps/scart/php_code/e_comm/small-1.jpg", title: 7}, 
      {src: "http://localhost/ionic_apps/scart/php_code/e_comm/small-2.jpg", title: 8}, 
    ];

    $scope.slickConfig_slider_Loaded = true;

    $scope.slickConfig_slider = {
      dots: false,
      autoplay: false,
      infinite: true,
      autoplaySpeed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      method: {}
    };


    //====================================
    // Slick 1
    //====================================
    $scope.number1 = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.slickConfig1Loaded = true;
    $scope.updateNumber1 = function () {
      $scope.slickConfig1Loaded = false;
      $scope.number1[2] = '123';
      $scope.number1.push(Math.floor((Math.random() * 10) + 100));
      $timeout(function () {
        $scope.slickConfig1Loaded = true;
      }, 5);
    };
    $scope.slickCurrentIndex = 0;
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      initialSlide: 0,
      infinite: true,
      autoplaySpeed: 5000,
      method: {},
      event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          console.log('before change', Math.floor((Math.random() * 10) + 100));
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          $scope.slickCurrentIndex = currentSlide;
        },
        breakpoint: function (event, slick, breakpoint) {
          console.log('breakpoint');
        },
        destroy: function (event, slick) {
          console.log('destroy');
        },
        edge: function (event, slick, direction) {
          console.log('edge');
        },
        reInit: function (event, slick) {
          console.log('re-init');
        },
        init: function (event, slick) {
          console.log('init');
        },
        setPosition: function (evnet, slick) {
          console.log('setPosition');
        },
        swipe: function (event, slick, direction) {
          console.log('swipe');
        }
      }
    };

    //====================================
    // Slick 2
    //====================================
    $scope.number2 = [{label: 1, otherLabel: 1}, {label: 2, otherLabel: 2}, {label: 3, otherLabel: 3}, {
      label: 4,
      otherLabel: 4
    }, {label: 5, otherLabel: 5}, {label: 6, otherLabel: 6}, {label: 7, otherLabel: 7}, {label: 8, otherLabel: 8}];
    $scope.slickConfig2Loaded = true;
    $scope.updateNumber2 = function () {
      $scope.slickConfig2Loaded = false;
      $scope.number2[2] = 'ggg';
      $scope.number2.push(Math.floor((Math.random() * 10) + 100));
      $timeout(function () {
        $scope.slickConfig2Loaded = true;
      });
    };

    $scope.slickConfig2 = {
      autoplay: true,
      infinite: true,
      autoplaySpeed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      method: {}
    };


    //====================================
    // Slick 3
    //====================================
    $scope.number3 = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
    $scope.slickConfig3Loaded = true;
    $scope.slickConfig3 = {
      method: {},
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }; 
    

    //====================================
    // Slick 4
    //====================================
    $scope.number4 = [{label: 225}, {label: 125}, {label: 200}, {label: 175}, {label: 150}, {label: 180}, {label: 300}, {label: 400}];
    $scope.slickConfig4Loaded = true;
    $scope.updateNumber4 = function () {
      $scope.slickConfig4Loaded = false;
      $scope.number4[2].label = 123;
      $scope.number4.push({label: Math.floor((Math.random() * 10) + 100)});
      $timeout(function () {
        $scope.slickConfig4Loaded = true;
      });
    };
    $scope.slickConfig4 = {
      method: {},
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    };

})

.controller('profileCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate,$ionicModal) {


        
        if(!$scope.extras) {
          
            $scope.goBack = function(){
              $ionicHistory.goBack();
            }

          // $scope.firstScreen = "";
          // $ionicModal.fromTemplateUrl('templates/profilectrls.html', {
          //     scope: $scope,
          //     animation: 'slide-in-up',
          //     focusFirstInput: true
          // }).then(function(modal) {
          //     $scope.modal = modal;
          // });

          // $scope.openModal = function(action) {
          //     if (action == "login") {
          //       $scope.loginView = "ng-show";
          //       $scope.signupView = "ng-hide";
          //       $scope.forgotPasswordView = "ng-hide";
          //     }
          //     if (action == "signup") {
          //       $scope.loginView = "ng-hide";
          //       $scope.signupView = "ng-show";
          //       $scope.forgotPasswordView = "ng-hide";
          //     }
          //     if (action == "forgotPassword") {
          //       $scope.loginView = "ng-hide";
          //       $scope.signupView = "ng-hide";
          //       $scope.forgotPasswordView = "ng-show";
          //     }
          //     $scope.firstScreen = action;

          //    $scope.modal.show();
          // };
            
          // $scope.closeModal = function(action) {
          //   $scope.modal.hide();
          // }

          // $scope.$on('$destroy', function() {
          //     $scope.modal.remove();
          // });
        } 




    // $scope.openModal = function() {
    //     $scope.modal.show();
    // };

    // $scope.closeModal = function() {
    //     $scope.modal.hide();
    // };




    // $scope.$on('modal.hidden', function() {
    //     // Execute action
    // });

    // $scope.$on('modal.removed', function() {
    //     // Execute action
    // });
    
  //$ionicHistory.clearHistory();
  // alert("CALLED");
  // $state.go($state.current, {}, {reload: true});
  //$state.go('tabsController.profile', {}, {location: "replace"});
})

.controller('notificationCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {

})

.controller('checkoutCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {

  $scope.addOrder = function() {
      sharedUtils.showLoading();
      sharedUtils.addOrder().then(function (result) {
         sharedUtils.hideLoading();
         console.dir(result);
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Error in placing order!");
      });
  }
  
})


.controller('cartCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {

    $scope.coupon_code= "5555";
    $scope.voucher_code= "2222";
    
    $scope.applyCoupon = function(coupon_code) {
      $scope.coupon_code = coupon_code;
      sharedUtils.showLoading();
      sharedUtils.applyCoupon($scope.coupon_code).then(function (result) {
          console.dir(result);
          sharedUtils.hideLoading();
          if (result.data.msg == "error") {
            sharedUtils.showAlert("Coupon Error", result.data.error);  
          } else {
            $scope.loadCartProductsInBackground();
            $scope.$broadcast("scroll.refreshComplete");
          }
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Error in applying coupon code!");
      });
    }

    $scope.applyVoucher = function() {
      alert("applyVoucher here");
    }

    $scope.loadCartProducts = function() {
      sharedUtils.showLoading();
      //$scope.menu=$firebaseArray(fireBaseData.refMenu());

      //sharedUtils.hideLoading();
      sharedUtils.getCartProducts().then(function (result) {
         sharedUtils.hideLoading();
         console.dir(result.data);
          if (result.data.msg == "error") {
            sharedUtils.showAlert("Cart error", result.data.error);  
          } else {
            $rootScope.cart_data = result.data.data;
            $scope.$broadcast("scroll.refreshComplete");
          }
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Cart prodcut fetch error!");
      });
    }

    $scope.removeProduct = function(product_id, key) {
      
      sharedUtils.removeProductFromCart(product_id, key).then(function (result) {
         sharedUtils.showLoading();
          if (result.data.msg == "error") {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Product error", result.data.error);  
          } else {
            sharedUtils.hideLoading();
            $scope.loadCartProductsInBackground();
            $scope.$broadcast("scroll.refreshComplete"); // Used to hide the loading button
          }
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Product add in cart error!");
      });
    }

})


.controller('loginCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {

    // $rootScope.extras = true;
    // sharedUtils.showLoading();

    $rootScope.extras = false;  // For hiding the side bar and nav icon

      $scope.goBack = function(){
        $ionicHistory.goBack();
      }

    // When the user logs out and reaches login page,
    // we clear all the history and cache to prevent back link
    $scope.$on('$ionicView.enter', function(ev) {
      if(ev.targetScope !== $scope){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });

    // sharedUtils.showLoading();
    $scope.user = {};
    $scope.user.email = "apptest1@gmail.com";
    $scope.user.password = "apptest1";

    $scope.loginEmail = function(formName,cred) {
      if (formName.$valid) {  // Check if the form data is valid or not
        sharedUtils.showLoading();

        sharedUtils.signInWithEmailAndPassword(cred).then(function (result) {
           sharedUtils.hideLoading();
            if (result.data.msg == "error") {
              sharedUtils.showAlert(result.data.error);  
            } else {
              $rootScope.extras = true;
              //sharedUtils.changeView('/home');
              sharedUtils.changeView('page1/dashboard');
            }
        }, function (error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Please note","Sign up Error");
        });
      } else {
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }
    };


    $scope.loginFb = function(){
      //Facebook Login
    };

    $scope.loginGmail = function(){
      //Gmail Login
    };


})

.controller('signupCtrl', function($scope,$rootScope,sharedUtils,$ionicSideMenuDelegate,
                                 $state,$ionicHistory,$location) {



  $rootScope.extras = false; // For hiding the side bar and nav icon
    
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

  $scope.user = {};
  $scope.user.firstname = "FIRSTNAME";
  $scope.user.lastname = "LASTNAME";
  $scope.user.phone = "1234567890";
  $scope.user.email = "testing@gmail.com";
  $scope.user.password = "PASSWORD";

  // $scope.$on('handleUserSignup', function(events, return_data) {
  //   alert("BROCAST DONE");
  //   console.dir(return_data.data.insert_id);
  // });

  $scope.signupEmail = function (formName, cred) {
    if (formName.$valid) {  // Check if the form data is valid or not
      sharedUtils.showLoading();
      sharedUtils.createUserWithEmailAndPassword(cred).then(function (result) {
         sharedUtils.hideLoading();
          if (result.data.msg == "error") {
            sharedUtils.showAlert(result.data.error);  
          } else {
            $rootScope.extras = true;
            $scope.isLoggedIn = false;
            //sharedUtils.changeView('/home');
            sharedUtils.changeView('page1/dashboard');
          }
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Sign up Error");
      });
    } else {
      sharedUtils.showAlert("Error","Plase enter valid data");
    }
  }

})
 
.controller('forgotPasswordCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$ionicSideMenuDelegate) {
  //$rootScope.extras = false; // For hiding the side bar and nav icon


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  $scope.user = {};
  $scope.user.email = "apptest1@gmail.com";

  $scope.resetPassword = function(formName, cred) {
    if (formName.$valid) {  // Check if the form data is valid or not
        sharedUtils.showLoading();
        sharedUtils.resetUserpasswordWithEmail(cred).then(function (result) {
           sharedUtils.hideLoading();
            if (result.data.msg == "error") {
              sharedUtils.showAlert("Reset Password Error", result.data.error);  
            } else {
              sharedUtils.showAlert("Reset Password", result.data.success);  
              sharedUtils.changeView('/page1/page5');
            }
        }, function (error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Please note","Sign up Error");
        });
    } else {
      sharedUtils.showAlert("Error","Plase enter valid email!");
    }
  }
})

.controller('homeCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$ionicSideMenuDelegate) {

    $rootScope.extras = true;
    //$ionicSideMenuDelegate.toggleLeft(); //To close the side bar
    //$ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space
    if ($rootScope.extras) {
      console.dir("LOGEED IN");
    } else {
      console.dir("NOT LOGEED IN");
    }
    sharedUtils.hideLoading();


    //$state.go('tabsController.login', {}, {location: "replace"});

})

.controller('productCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$stateParams,$ionicSideMenuDelegate) {
    
    $scope.title = "Prodcuts";

    $scope.products = [];

    $scope.loadProducts = function() {
      sharedUtils.showLoading();

      sharedUtils.getProducts($stateParams.category_id).then(function (result) {
         sharedUtils.hideLoading();
          if (result.data.msg == "error") {
            sharedUtils.showAlert("Product error", result.data.error);  
          } else {
            console.dir(result.data);
            $scope.products = result.data.products;
            console.dir($scope.products);
            $scope.$broadcast("scroll.refreshComplete"); // Used to hide the loading button
          }
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Product fetch error!");
      });
    }

    $scope.product_details = [];
    $scope.loadProductDetails = function() {
      sharedUtils.showLoading();

      sharedUtils.getProductDetail($stateParams.product_id).then(function (result) {
         sharedUtils.hideLoading();
          if (result.data.msg == "error") {
            sharedUtils.showAlert("Product error", result.data.error);  
          } else {
            console.dir(result.data.product_details);
            $scope.product_details = result.data.product_details;
            $scope.$broadcast("scroll.refreshComplete"); // Used to hide the loading button
          }
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Product fetch error!");
      });
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }


    $scope.addToCart = function() {
      //add_to_cart

      sharedUtils.addProductInCart($stateParams.product_id).then(function (result) {
         sharedUtils.hideLoading();
          if (result.data.msg == "error") {
            sharedUtils.showAlert("Product error", result.data.error);  
          } else {
            console.dir(result.data);
            sharedUtils.showAlert("Product added", result.data.success);  
             $scope.loadCartProductsInBackground();
            $scope.$broadcast("scroll.refreshComplete"); // Used to hide the loading button
          }
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Product add in cart error!");
      });      
    }
})

.controller('categoryCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$ionicSideMenuDelegate) {

    $rootScope.extras = false;

    $scope.menu = [];
    $scope.loadMenu = function() {
      sharedUtils.showLoading();
      //$scope.menu=$firebaseArray(fireBaseData.refMenu());

      //sharedUtils.hideLoading();
      sharedUtils.getCategories().then(function (result) {
         sharedUtils.hideLoading();
          if (result.data.msg == "error") {
            sharedUtils.showAlert("Category error", result.data.error);  
          } else {
            console.dir(result.data);
            $scope.menu = result.data.categories;
            $scope.$broadcast("scroll.refreshComplete");
            //sharedUtils.showAlert("Reset Password", result.data.success);  
            //sharedUtils.changeView('/page1/page5');
          }
      }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note","Category fetch error!");
      });
    }

    $scope.loadSubcategoryMenu = function(category_id) {
      console.dir(category_id);
      console.dir($scope.menu.length);
      $scope.subMenu = [];
      for(var i =0;i<$scope.menu.length;i++) {
        if($scope.menu[i].parent_id == category_id) {
          $scope.subMenu.push($scope.menu[i]);
        }
      }
        console.dir($scope.subMenu);

    }    
    //sharedUtils.showLoading();

})
