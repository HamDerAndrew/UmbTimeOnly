angular.module("umbraco").controller("UmbTimeOnlyController", function ($scope) {
    if(!$scope.model.value) {
        $scope.model.value = {
            hour: "", 
            minutte: "", 
            second: "",
            formatted: 0
        }
    }

    $scope.model.isOpen = false

    $scope.model.openModal = function() {
        $scope.model.isOpen = true
        console.log("Opening modal")
    }

    $scope.model.setTime = function(event) {
        console.log(event)
        console.log("The hour", $scope.model.value.hour)
    }

    $scope.model.timeChanged = function(typeOfTime) {
        // With AngularJS you can pass an identifier in the ng-change event to find out which input fired the event 😎
        if(typeOfTime === "hour") {
            console.log("The hour", $scope.model.hour)
            
        }
        if(typeOfTime === "minutte") {
            console.log("The hour", $scope.model.value.minutte)
        }
        if(typeOfTime === "second") {
            console.log("The hour", $scope.model.value.second)
        }
    }
})