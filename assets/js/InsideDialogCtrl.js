app.controller('InsideDialogCtrl', function ($scope, ngDialog) {
            
            $scope.openHelperDialog = function () {
                ngDialog.open({
                    template: 'HelperDialog',
                    controller: 'InsideDialogCtrl',
                    className: 'ngdialog-theme-default'
                });

            } 

            $scope.openAssoDialog = function () {
                ngDialog.open({
                    template: 'AssoDialog',
                    controller: 'InsideDialogCtrl',
                    className: 'ngdialog-theme-default'
                });
            } 

            
            
        });