/*
 * The MIT License (MIT)
 *
 *  Copyright (c) 2014 © NVISIA, LLC.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */


"use strict";

// First argument matches the ng-app directive in index.html.
var restaurantReservationControllers = new angular.module('restaurantReservationControllers', []);

// RestaurantListController is the ng-controller value in index.html. It identifies the DOM element that this controller 'controls'
// This can be done a couple different ways. However, this way supports minification and tends to be the preferred method.
restaurantReservationControllers.controller('RestaurantListController', ['$scope', 'Restaurant',
    function ($scope, Restaurant) {
        $scope.restaurants = Restaurant.GetAllRestaurants();

        $scope.orderProp = 'name'; // Defaults the order property to the Name value.

    }]);



restaurantReservationControllers.controller('RestaurantDetailController', ['$scope', '$routeParams', '$location', 'Restaurant', 'Reservation',
    function ($scope, $routeParams, $location, Restaurant, Reservation) {
        $scope.reservation;
        $scope.restaurant = Restaurant.GetRestaurant({restaurantId: $routeParams.id});

        Restaurant.GetReservations({restaurantId: $routeParams.id},
            function (data) {
                $scope.available = data.available;
            });

        $scope.selectTime = function (selectedTime) {
            $scope.selectedTime = selectedTime;
        };
    }]);


restaurantReservationControllers.controller('ReservationFormController',['$scope','$location','Restaurant','Reservation',
    function ($scope, $location, Restaurant, Reservation) {
        $scope.makeReservation = function () {
            if ($scope.reservationForm.$valid) {
                if ($scope.reservation) {
                    $scope.reservation.restaurantId = $scope.restaurant.id;
                    $scope.reservation.time = $scope.selectedTime;
                }
                var newReservation = new Reservation($scope.reservation);

                // Use built-in save function (using a POST) (Non-GET are prefixed with a '$')
                newReservation.$save(function (reservation) {
                    $location.path("/reservation/" + reservation.id);
                });
            }
        };

    }])
;

restaurantReservationControllers.controller('ReservationDetailController', ['$scope', '$routeParams', 'Reservation', 'Restaurant',
    function ($scope, $routeParams, Reservation, Restaurant) {
        $scope.reservation = Reservation.get({reservationId: $routeParams.id}, function (reservation) {
            $scope.restaurant = Restaurant.GetRestaurant({restaurantId: reservation.restaurantId});
        });
    }]);
