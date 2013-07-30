app.controller("BoxAwesome",
    ["$scope", "scenario", "socket",
        function($scope, scenario, socket){
    $scope.box = {
        disabled: true,
        content: 'empty'
	};

    $scope.close_box = function(){
        // If you have to shut down some things, use a listener on this broadcast.
        $scope.$broadcast($scope.box.content.type + "-close");

        $scope.box.disabled = true;
        if ($scope.box.content.marker){
            $scope.box.content.marker._icon.classList.remove('selected-icon');
        }
        $scope.box.content = 'empty';
    };

    $scope.$on('open_box', function(message, content) {
        if ($scope.box.content.marker !== undefined){
            $scope.box.content.marker._icon.classList.remove('selected-icon');
        }
        $scope.$apply(function() {
            $scope.box.content = content;
            $scope.box.disabled = false;
        });
        // If you have dynamic content, you should listen to this broadcast.
        $scope.$broadcast(content.type, content);
    });

    // Close the box from another scope using $rootScope.$broadcast
    $scope.$on('close_box', function(message, content) {
        $scope.close_box();
    });

    $scope.$on('keypress-esc', function(message, content) {
        $scope.close_box();
    });
}]);