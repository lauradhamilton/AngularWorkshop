var restaurantReservationApp = angular.module('restaurantReservationApp', [
    'ngRoute',
    'restaurantReservationControllers',
    'formatters',
    'restaurantServices',
    'customDirectives'
]);

restaurantReservationApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/restaurants', {
                templateUrl: 'partials/restaurant-list.html',
                controller: 'RestaurantListController'
            })
            .when('/restaurant/:id', {
                templateUrl:'partials/restaurant-detail.html',
                controller:'RestaurantDetailController'
            })
            .when('/reservation/:id', {
                templateUrl:'partials/reservation-detail.html',
                controller:'ReservationDetailController'
            })
            .otherwise({
                redirectTo: '/restaurants'
            });
    }]);