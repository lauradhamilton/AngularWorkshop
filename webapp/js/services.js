/**
 * Created by bpeterson on 1/27/14.
 */

var restaurantServices = angular.module('restaurantServices', []);

restaurantServices.factory('Restaurant', ['$http',
    function ($http) {
        return {
            GetAllRestaurants: function () {
                return $http.get("/restaurants");
            },
            GetRestaurant: function (attrs) {
                return $http.get("/restaurants/"+attrs.restaurantId);
            },
            GetReservations: function (attrs) {
                return $http.get("/restaurants/"+attrs.restaurantId+"/reservations");
            }
        };
    }]);

/*
var restaurantServices = angular.module('restaurantServices', ['ngResource']);

restaurantServices.factory('Restaurant', ['$resource',
    function ($resource) {
        return $resource('/restaurants/:restaurantId/:reservations', {restaurantId: '@restaurantId'}, {
            GetRestaurant: {method: 'GET', params: {restaurantId: 'restaurantId'}, cache: true},
            GetAllRestaurants: {method: 'GET', params: {}, isArray: true},
            GetReservations: {method: 'GET', params: {restaurantId: 'restaurantId', reservations: 'reservations'}}
        });
    }]);

restaurantServices.factory('Reservation', ['$resource',
    function ($resource) {
        return $resource('/reservations/:reservationId', {reservationId: '@reservationId'});
    }
]);*/
