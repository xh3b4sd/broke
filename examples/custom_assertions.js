/*
 *
 * Custom Assertions module.
 *
 * Custom assertions have to return an object that contains
 * the tested assertion name as key and a function that tests
 * the parameters you have injected into "this.callback()".
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
    }
};

module.exports = customAssertions;

