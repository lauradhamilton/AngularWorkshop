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