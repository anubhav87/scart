angular.module('app.controllers', [])

.controller('indexCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$ionicSideMenuDelegate) {

    $scope.testtest = "TESTING TEXT";
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
})

.controller('dashboardCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {

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

.controller('cartCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {
  //$rootScope.extras = true;
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
            $scope.menu = result.data.categories;
            console.dir(result.data);
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
