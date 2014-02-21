/**
 * Created by bpeterson on 1/30/14.
 */


"use strict";

describe("Formatters", function () {

    var ratingFormatterFilter;

    beforeEach(module("formatters"));

    // Note that the 'inject' function takes an object with '_' around it and the word 'Filter'
    // This is done since the rating formatter is a 'Filter' and the injector needs to know the type.
    // The '_' are ignored and it allows access to the variable outside of the injection.
    beforeEach(inject(function (_ratingFormatterFilter_) {
        ratingFormatterFilter = _ratingFormatterFilter_;
    }));

    describe("Date Format", function () {
        it("should show time only", inject(function (dateFormatterFilter) {
            describe("special", function () {
                it("special case of undefined value", function () {
                    expect(dateFormatterFilter(undefined, "None")).toBe("None");

                });
            });
            describe("normal",function(){
                it("should display time 0 as the offset of GMT for current location.",function(){
                    expect(dateFormatterFilter(0)).toBe("6:00 PM");
                });
            })
        }));


    });
    describe("Price Format", function () {
            it("should show (n) dollar signs representing the count value.",
                inject(function (priceFormatterFilter) {
                    expect(priceFormatterFilter(-10)).toBe("");
                    expect(priceFormatterFilter(0)).toBe("");
                    expect(priceFormatterFilter(1)).toBe("$");
                    expect(priceFormatterFilter(2)).toBe("$$");
                    expect(priceFormatterFilter(3)).toBe("$$$");
                    expect(priceFormatterFilter(4)).toBe("$$$$");

                }));
        }
    );

    describe("Rating Format", function () {
        it("should show the number of stars based on a 0-100% rating value.",
            function () {
                describe("Cross over points", function () {
                    it("crosses over to the next star value as expected", function () {
                        expect(ratingFormatterFilter()).toBe("");
                        expect(ratingFormatterFilter(0)).toBe("");
                        expect(ratingFormatterFilter(9)).toBe("");
                        expect(ratingFormatterFilter(10)).toBe("*");
                        expect(ratingFormatterFilter(29)).toBe("*");
                        expect(ratingFormatterFilter(30)).toBe("**");
                        expect(ratingFormatterFilter(49)).toBe("**");
                        expect(ratingFormatterFilter(50)).toBe("***");
                        expect(ratingFormatterFilter(69)).toBe("***");
                        expect(ratingFormatterFilter(70)).toBe("****");
                        expect(ratingFormatterFilter(89)).toBe("****");
                        expect(ratingFormatterFilter(90)).toBe("*****");
                        expect(ratingFormatterFilter(100)).toBe("*****");
                    });
                });
                describe("Error ranges", function () {
                    it("Supports out of bound values",
                        function () {
                            expect(ratingFormatterFilter(-10)).toBe("");
                            expect(ratingFormatterFilter(101)).toBe("*****");
                            expect(ratingFormatterFilter(10001)).toBe("*****");
                        });
                });
                describe("Normal ranges", function () {
                    it("Supports 0-9 for zero stars", function () {
                        for (var i = 0; i < 10; i++) {
                            expect(ratingFormatterFilter(i)).toBe("");
                        }
                    });


                    it("Supports 1 star", function () {
                        for (var i = 10; i < 30; i++) {
                            expect(ratingFormatterFilter(i)).toBe("*");
                        }
                    });

                    it("Supports 2 stars", function () {
                        for (var i = 30; i < 50; i++) {
                            expect(ratingFormatterFilter(i)).toBe("**");
                        }
                    });

                    it("Supports 3 stars", function () {
                        for (var i = 50; i < 70; i++) {
                            expect(ratingFormatterFilter(i)).toBe("***");
                        }
                    });

                    it("Supports 4 stars", function () {
                        for (var i = 70; i < 90; i++) {
                            expect(ratingFormatterFilter(i)).toBe("****");
                        }
                    });

                    it("Supports 5 stars", function () {
                        for (var i = 90; i < 100; i++) {
                            expect(ratingFormatterFilter(i)).toBe("*****");
                        }
                    });

                });
            }

        )
    });

});