/**
 * Created by bpeterson on 1/23/14.
 */
"use strict";

angular.module('formatters', []).
    filter('dateFormatter',function () {               // filter is a factory function
        return function (unformattedDate, emptyStrText) { // first arg is the input, rest are filter params
            if (!isNaN(unformattedDate)) {
                var date = new Date(1 * unformattedDate);
                var formattedDate = date.toLocaleTimeString();
                // Take the last 3 chars and the first 2 pairs of separated by colon.
                var segments = formattedDate.split(':', 2);
                return segments[0] + ':' + segments[1] + formattedDate.substring(formattedDate.length - 3);
            } else {
                return "None";
            }
        }
    }).
    filter('priceFormatter',function () {
        return function (price, emptyStrText) {
            var index, out = "";
            for (index = 1; index <= price; index++) {
                out += "$";
            }
            return out;
        }
    }).
    filter('ratingFormatter', function () {
        return function (rating, emptyStrText) {
            var index, out = "";
            if (rating > 100) {
                rating = 100;
            }
            for (index = 1; index <= Math.round(rating / 20); index++) {
                out += "*";
            }

            return out;
        }
    });