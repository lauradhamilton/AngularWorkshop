/**
 * Created by bpeterson on 1/27/14.
 */

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
]);
