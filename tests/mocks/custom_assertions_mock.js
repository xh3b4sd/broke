/*
 *
 * Custom Assertions module.
 *
 */

/*
 * Node dependencies.
 */
var assert = require('assert');

var customAssertions = {
    /*
     * Test the status code of a request.
     */
    statusCode: function statusCode(code) {
        var assertion = {};

        assertion['should respond without errors'] = function(err, res, data) {
            assert.isNull(err);
        };

        assertion['should respond with status code ' + code] = function(err, res, data) {
            assert.equal(res.statusCode, code);
        };

        return assertion;
    },

    /*
     * Some other fancy custom assertion.
     */
    anotherAssertion: function anotherAssertion(expected) {
        var assertion = {};

        assertion['should test your crazy app'] = function(err, data) {
            assert.isNull(err);
        };

        return assertion;
    },

    /*
     * Broken assertion that dont supports a method.
     */
    brokenAssertion: function brokenAssertion() {
        var assertion = {};

        assertion['that assertion is no function'] = [];

        return assertion;
    },

    /*
     * Broken assertion that dont returns an object.
     */
    anotherBrokenAssertion: function brokenAssertion() {
        var assertion = [];

        assertion[0] = function(err, data) {
            assert.isNull(err);
        };

        return assertion;
    },
};

module.exports = customAssertions;

