angular.module("umbraco").controller("UmbTimeOnlyController", function ($scope) {
    if(!$scope.model.value) {
        $scope.model.value = ""
    }

    if (typeof $scope.model.value === 'string') {
        $scope.model.timeValue = parseTimeStringToDate($scope.model.value);
    }
    
    $scope.$watch('model.timeValue', function (newVal) {
        $scope.model.value = formatDateToTimeString(newVal);
    });

    function parseTimeStringToDate(timeString) {
        // If the timeString does not match this format: hh:mm:ss
        if (!timeString || !/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
            return null;
        }
    
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, seconds, 0);
        return date;
    }

    function formatDateToTimeString(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return null;
        }
    
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
})