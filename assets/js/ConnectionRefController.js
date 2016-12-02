/**
 *  ## AngularJS Controller - ConnectionRefController
 *
 *
 */
 app.controller('ConnectionRefController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

 	$scope.update = function(user) {
        $scope.master = angular.copy(user);
      };

 	
}]);