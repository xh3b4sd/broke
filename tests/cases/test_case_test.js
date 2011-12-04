/*
 * Test Case test module.
 */

var vows = require('vows')
  , assert = require('assert');

var TestCase = require('../../libs/test_case.js')
  , brokeContextMock = require('../mocks/broke_context_mock.js');

var testHelper = {
    /*
     * Create a broke batch from the broke context mock.
     */
    parseBatch: function(brokeContextMock) {
        var brokeBatch = {};

        brokeContextMock.forEach(function(context) {
            Object.keys(context).forEach(function(name) {
                brokeBatch[name] = context[name];
            });
        });

        return brokeBatch;
    },

    /*
     * Expected context names of the parsed broke context mock.
     */
    expectedBatchKeys: [
        'init the test suite [#1]',
        'test your code [#1]',
        'test your code [#2]',
        'test your code [#3]',
        'test your code [#4]',
        'test your code [#5]',
        'test case using broken custom assertion [#1]',
        'test case using broken custom assertion [#2]',
        'test case using broken custom assertion [#3]',
        'test case using broken custom assertion [#4]',
        'test case using broken custom assertion [#5]',
        'test case using another broken custom assertion [#1]',
        'test case using another broken custom assertion [#2]',
        'test case using another broken custom assertion [#3]',
        'test case using another broken custom assertion [#4]',
        'test case using another broken custom assertion [#5]',
    ],

    /*
     * Check if topics of a vowsBatch are functions.
     */
    assertTopics: function(keys, vowsBatch) {
        keys.forEach(function(key) {
            assert.isFunction(vowsBatch[key].topic);
        });
    }
};

vows
    .describe('testCase')

    .addBatch({
        // Test TestCase.createBatch()
        'call createBatch()': {
            topic: function() {
                var brokeBatch = testHelper.parseBatch(brokeContextMock)
                    vowsBatch = TestCase.createBatch(brokeBatch);

                this.callback(undefined, vowsBatch);
            },
            'should return vows batch': function(err, vowsBatch) {
                var keys = Object.keys(vowsBatch);

                assert.deepEqual(keys, testHelper.expectedBatchKeys);
                assert.isFunction(vowsBatch[keys[0]]['test suite initialized']);

                testHelper.assertTopics(keys, vowsBatch);
            }
        }
    })

.export(module);

