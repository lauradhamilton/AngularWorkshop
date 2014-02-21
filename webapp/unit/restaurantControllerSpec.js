'use strict';

describe('Restaurant controllers', function() {
    var restaurantData = function(){
        return [
            {
                name: "Bartolotta's Lake Park Bistro",
                cuisine: "French",
                address: "3133 E Newberry Blvd",
                tagline: "At the Bartolotta restaurants we like to think that every meal we serve is special.",
                description: "Bartolotta's Lake Park Bistro is one of the premiere brasserie-style French restaurants in Wisconsin. With a location in Milwaukee, it provides an ideal setting for hosting social occasions, corporate group events, weddings and parties.",
                rating: 83,
                price: 4
            }, {
                name: "Sanford",
                cuisine: "American",
                address: "1547 N Jackson St",
                description: "It is the philosophy of Sanford Restaurant to start with the finest possible ingredients, coming from as close to home as possible, supporting local farms and artisans whenever possible. We then treat those ingredients with the utmost respect, coaxing and elevating the natural flavor to the highest possible level.",
                rating: 88,
                price: 4
            }];
    };

    beforeEach(function(){
        if (jasmine.version_ && jasmine.version_.major===1){
            this.addMatchers({
                toEqualData: function(expected){
                    return angular.equals(this.actual,expected);
                }
            })
        }else {
            jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                        compare:function(actual,expected){
                            var result = {};
                            result.pass =  angular.equals(actual, expected);
                            return result;
                        }
                    }
                }
            });
        }
    });

    beforeEach(module('restaurantReservationApp'));
    beforeEach(module('restaurantServices'));

    describe('restaurantReservationControllers', function(){
        var scope, ctrl, $httpBackend;

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/restaurants').
                respond(restaurantData());

            scope = $rootScope.$new();
            ctrl = $controller('RestaurantListController', {$scope: scope});
        }));


        it('should create "restaurants" model with 2 restaurants fetched from xhr', function() {
            expect(scope.restaurants).toEqualData([]);
            $httpBackend.flush();

            expect(scope.restaurants).toEqualData(restaurantData());
            expect(scope.restaurants.length).toBeGreaterThan(0);
        });


        it('should set the default value of orderProp model', function() {
            expect(scope.orderProp).toBe('name');
        });
    });
});