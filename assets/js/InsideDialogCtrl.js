app.controller('InsideDialogCtrl', function ($scope, $http, ngDialog,$location, $window) {
            
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

            $scope.connectRefugee = function ()  {
                $http.post("/auth-local", $scope.user)
                    .then(function(response) {
                        if (response.data){
                            $window.location.href = '/';
                        }
                    }, 
                    function(response) {
                        alert(response.error);
                    });
             }

             $scope.connectDonor = function ()  {
                $http.post("/auth-local", $scope.helper)
                    .then(function(response) {
                        if (response.data){
                            $window.location.href = '/';
                        }
                    }, 
                    function(response) {
                        alert(response.error);
                    });
             }

            $scope.connectAsso = function ()  {
                $http.post("/auth-local-assoc", $scope.asso)
                    .then(function(response) {
                        if (response.data){
                            $window.location.href = '/';
                        }
                    }, 
                    function(response) {
                        alert(response.error);
                    });
             }

             $scope.createRefugee = function ()  {
                $scope.user.situation="refugee";
                $http({
                    method: 'POST',
                    url: "/personnes",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {
                        first_name:$scope.user.first_name.toString(),
                        last_name:$scope.user.last_name.toString(),
                        password:$scope.user.password.toString(),
                        birthdate:$scope.user.birthdate,
                        email:$scope.user.email.toString(),
                        gender:$scope.user.gender.toString(),
                        situation:$scope.user.situation.toString()
                            }

                }).success(function () {$window.location.href = '/';})
                .error(function(error){console.log(error)});
                
             }

             $scope.createDonor = function ()  {
                $scope.helper.situation="donor";
                $http({
                    method: 'POST',
                    url: "/personnes",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {
                        first_name:$scope.helper.first_name.toString(),
                        last_name:$scope.helper.last_name.toString(),
                        password:$scope.helper.password.toString(),
                        birthdate:$scope.helper.birthdate,
                        email:$scope.helper.email.toString(),
                        gender:$scope.helper.gender.toString(),
                        situation:$scope.helper.situation.toString()
                            }

                }).success(function () {$window.location.href = '/';})
                .error(function(error){console.log(error)});
             }

            $scope.createAsso = function ()  {
                $http.get( "http://nominatim.openstreetmap.org/?format=json&addressdetails=1&format=json&limit=1&q="+$scope.asso.address.toString())
                .success(function(response) {
                    console.log(response);
                    $http({
                    method: 'POST',
                    url: "/associations",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {
                        name:$scope.asso.name.toString(),
                        password:$scope.asso.password.toString(),
                        address:$scope.asso.address.toString(),
                        email:$scope.asso.email.toString(),
                        lat:response[0].lat,
                        lon:response[0].lon
                    }

                }).success(function () {$window.location.href = '/';})
                .error(function(error){console.log(error)});

                })
                .error(function(error){console.log(error)});
                
             }
            
        });