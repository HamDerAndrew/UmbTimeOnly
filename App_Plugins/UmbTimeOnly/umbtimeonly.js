angular.module("umbraco").controller("UmbTimeOnlyController", function ($scope) {
    if(!$scope.model.value) {
        $scope.model.value = {
            hour: 0,
            minutes: 0,
            seconds: 0
        }
    }

    if (typeof $scope.model.value === 'object' && $scope.model.value != null) {
        $scope.model.timeValue = buildDateObjectFromTime($scope.model.value);
    }
    
    // Watch for changes to the time input and update it
    $scope.$watch('model.timeValue', function (newVal) {
        $scope.model.value = extractTimePartsFromDate(newVal);
    });

    function buildDateObjectFromTime(timeObj) {
        if (!timeObj) {
            return null;
        }
    
        const { hour, minutes, seconds } = timeObj
        const date = new Date();
        date.setHours(hour, minutes, seconds, 0);
        return date;
    }

    $scope.useCurrentTime = function() {
        const date = new Date();
        $scope.model.timeValue = buildDateObjectFromTime({
            hour: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        });
    }

    function extractTimePartsFromDate(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return null;
        }

        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        return time = {
            hour: hours,
            minutes: minutes,
            seconds: seconds
        }
    }
})