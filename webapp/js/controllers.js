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

// Create controller module based on ng-controller name in index.html (RestaurantListController).
var restaurantReservationModule = new angular.module('restaurantReservationControllers', []);


// Add Controller to provide the Restaurant List.
// RestaurantListController is the ng-controller value in index.html. It identifies the DOM element that this controller 'controls'
restaurantReservationModule.controller('RestaurantListController', ['$scope', '$http',
    function ($scope, $http) {

        // Use the Angular http service to retrieve the Restaurants.
        $http.get('/restaurants').success(function (data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name'; // Defaults the order property to the Name value.

    }]);


/*
 *  Services below: unavailable to test until Router and Partials step.
*/

// Create a Restaurant Detail Controller
restaurantReservationModule.controller('RestaurantDetailController', ['$scope', '$http', '$routeParams', '$location',
    function ($scope, $http, $routeParams, $location) {
        $scope.reservation;

        $http.get('/restaurants/' + $routeParams.id).success(function (data) {
            $scope.restaurant = data;
        });
        $http.get('/restaurants/' + $routeParams.id + '/reservations').success(function (data) {
            $scope.available = data.available;
        });

        $scope.selectTime = function (selectedTime) {
            $scope.selectedTime = selectedTime;
        };

    }]);


// Create a Reservation Form Controller
restaurantReservationModule.controller('ReservationFormController', ['$scope', '$http', '$routeParams', '$location',
    function ($scope, $http, $routeParams, $location) {
        $scope.reservation;

        $scope.makeReservation = function () {
            if ($scope.reservation) {
                $scope.reservation.restaurantId = $scope.restaurant.id;
                $scope.reservation.time = $scope.selectedTime;
            }

            $http.post('/reservations', $scope.reservation).success(function (data) {
                console.log([data.id]);
                $location.path("/reservation/" + data.id);
            })
        };

    }]);


// Create a Reservation Detail Controller
restaurantReservationModule.controller('ReservationDetailController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $http.get('/reservations/' + $routeParams.id).success(function (data) {
            $scope.reservation = data;
            $http.get('/restaurants/' + data.restaurantId).success(function (data) {
                $scope.restaurant = data;
            });
        })
    }]);
