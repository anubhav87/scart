angular.module('app.services', [])

.factory('sharedUtils',['$ionicLoading', '$ionicPopup', '$http', '$rootScope', '$location', function($ionicLoading, $ionicPopup, $http, $rootScope, $location){

    var functionObj={};

    functionObj.showLoading=function(){
      $ionicLoading.show({
        content: '<i class=" ion-loading-c"></i> ', // The text to display in the loading indicator
        animation: 'fade-in', // The animation to use
        showBackdrop: true, // Will a dark overlay or backdrop cover the entire view
        maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
        showDelay: 0 // The delay in showing the indicator
      });
    };
    functionObj.hideLoading=function(){
      $ionicLoading.hide();
    };

    functionObj.showAlert = function(title,message) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    };


    functionObj.getBooks = function(title,message) {
      return $http.get(base_url + 'json/get_books_json').then(function(response) {
        books = response.data;
        $rootScope.$broadcast('handleSharedBooks',books);
        return books;
      })
    };

    functionObj.changeView = function(view) {
      $location.path(view); // path not hash
      $location.replace();
    };

    functionObj.signInWithEmailAndPassword = function(request_data) {
      
      var send_data = "data=" + JSON.stringify(request_data);
      return $http({
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //url: base_url + 'json/save_book',
      url: $rootScope.base_url+ 'login_user',
      method: "POST",
      //data: request_data,
      data: send_data,
      dataType: 'JSON',
        }).then(function(response) {
          return response;
          //$rootScope.$emit('handleUserSignup',user);
        });
    };

    functionObj.resetUserpasswordWithEmail = function(request_data) {
      
      var send_data = "data=" + JSON.stringify(request_data);
      return $http({
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //url: base_url + 'json/save_book',
      url: $rootScope.base_url+ 'reset_password',
      method: "POST",
      //data: request_data,
      data: send_data,
      dataType: 'JSON',
        }).then(function(response) {
          return response;
          //$rootScope.$emit('handleUserSignup',user);
        });
    };

    functionObj.createUserWithEmailAndPassword = function(request_data) {
      
      var send_data = "data=" + JSON.stringify(request_data);
      return $http({
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //url: base_url + 'json/save_book',
      url: $rootScope.base_url+ 'signup_user',
      method: "POST",
      //data: request_data,
      data: send_data,
      dataType: 'JSON',
        }).then(function(response) {
          return response;
          //$rootScope.$emit('handleUserSignup',user);
        });
    };

    functionObj.getCategories = function() {
      
      var send_data = "data=" + JSON.stringify({});
      return $http({
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //url: base_url + 'json/save_book',
      url: $rootScope.base_url+ 'get_categories',
      method: "POST",
      //data: request_data,
      data: send_data,
      dataType: 'JSON',
        }).then(function(response) {
          return response;
          //$rootScope.$emit('handleUserSignup',user);
        });
    };

    functionObj.getProducts = function(category_id) {
      
      var send_data = "data=" + JSON.stringify({});
      return $http({
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //url: base_url + 'json/save_book',
      url: $rootScope.base_url+ 'get_products_by_category&category_id='+category_id,
      method: "POST",
      //data: request_data,
      data: send_data,
      dataType: 'JSON',
        }).then(function(response) {
          //console.dir(response.data.products);
          //return response.data.products;
          return response;
          //$rootScope.$emit('handleUserSignup',user);
        });
    };

    functionObj.getProductDetail = function(product_id) {
      
      var send_data = "data=" + JSON.stringify({});
      return $http({
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //url: base_url + 'json/save_book',
      url: $rootScope.base_url+ 'get_product_details_by_product_id&product_id='+product_id,
      method: "POST",
      //data: request_data,
      data: send_data,
      dataType: 'JSON',
        }).then(function(response) {
          //console.dir(response.data.products);
          //return response.data.products;
          return response;
          //$rootScope.$emit('handleUserSignup',user);
        });
    };

    

    return functionObj;

}])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);
