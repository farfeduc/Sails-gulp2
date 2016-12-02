/**
 *  ## AngularJS Controller - HomeCtrl
 *
 *
 */
 
 app.controller('HomeCtrl', ['$scope', '$rootScope', '$http', '$timeout', 'Notification','ngDialog', function($scope, $rootScope, $http, $timeout, Notification, ngDialog) {

 	

 	$scope.openDefault = function () {
                ngDialog.open({
                    template: 'HelperOrAssoDialog',
                    controller: 'InsideDialogCtrl',
                    className: 'ngdialog-theme-default'
                });
            };

    $scope.openRefugeeDialog = function () {
                ngDialog.open({
                    template: 'RefugeeDialog',
                    controller: 'InsideDialogCtrl',
                    className: 'ngdialog-theme-default'
                });
            }        

}]);
