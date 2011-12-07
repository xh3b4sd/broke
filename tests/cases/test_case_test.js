/*
 * Test Case test module.
 */

var vows = require('vows')
  , assert = require('assert');

var TestCase = require('../../libs/test_case.js')
  , customAssertionsMock = require('../mocks/custom_assertions_mock.js')
  , customProcessorsMock = require('../mocks/custom_processors_mock.js')
  , brokeContextMock = require('../mocks/broke_context_mock.js');

var testHelper = {
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
        'broken custom assertion [#1]',
        'broken custom assertion [#2]',
        'broken custom assertion [#3]',
        'broken custom assertion [#4]',
        'broken custom assertion [#5]',
        'another broken custom assertion [#1]',
        'another broken custom assertion [#2]',
        'another broken custom assertion [#3]',
        'another broken custom assertion [#4]',
        'another broken custom assertion [#5]',
    ],

    /*
     * Check if topics of a vowsBatch are functions.
     */
    assertTopics: function(keys, vowsBatch) {
        keys.forEach(function(key) {
            assert.isFunction(vowsBatch[key].topic);
        });
    },

    assertAssertions: function(keys, vowsBatch) {
        // Check keys length of assertions + topic
        assert.length(Object.keys(vowsBatch[keys[0]]), 2);

        assert.length(Object.keys(vowsBatch[keys[1]]), 3);
        assert.length(Object.keys(vowsBatch[keys[2]]), 3);
        assert.length(Object.keys(vowsBatch[keys[3]]), 3);
        assert.length(Object.keys(vowsBatch[keys[4]]), 3);
        assert.length(Object.keys(vowsBatch[keys[5]]), 3);

        assert.length(Object.keys(vowsBatch[keys[6]]), 1);
        assert.length(Object.keys(vowsBatch[keys[7]]), 1);
        assert.length(Object.keys(vowsBatch[keys[8]]), 1);
        assert.length(Object.keys(vowsBatch[keys[9]]), 1);
        assert.length(Object.keys(vowsBatch[keys[10]]), 1);

        assert.length(Object.keys(vowsBatch[keys[11]]), 1);
        assert.length(Object.keys(vowsBatch[keys[12]]), 1);
        assert.length(Object.keys(vowsBatch[keys[13]]), 1);
        assert.length(Object.keys(vowsBatch[keys[14]]), 1);
        assert.length(Object.keys(vowsBatch[keys[15]]), 1);

        // Check assertion functions
        assert.isFunction(vowsBatch[keys[0]]['test suite initialized']);
        assert.isFunction(vowsBatch[keys[1]]['should respond without errors']);
        assert.isFunction(vowsBatch[keys[1]]['should respond with status code 301']);
        assert.isFunction(vowsBatch[keys[2]]['should respond without errors']);
        assert.isFunction(vowsBatch[keys[2]]['should respond with status code 301']);
        assert.isFunction(vowsBatch[keys[3]]['should respond without errors']);
        assert.isFunction(vowsBatch[keys[3]]['should respond with status code 301']);
        assert.isFunction(vowsBatch[keys[4]]['should respond without errors']);
        assert.isFunction(vowsBatch[keys[4]]['should respond with status code 301']);
        assert.isFunction(vowsBatch[keys[5]]['should respond without errors']);
        assert.isFunction(vowsBatch[keys[5]]['should respond with status code 301']);
    }
};

vows
    .describe('testCase')

    .addBatch({
        // Test TestCase.createBatch()
        'call createBatch()': {
            topic: function() {
                var configMock = {
                    assertions: customAssertionsMock,
                    processors: customProcessorsMock
                };

                var vowsBatch = TestCase.createBatch(brokeContextMock.batch, configMock);

                this.callback(undefined, vowsBatch);
            },
            'should create vows batch including all contexts': function(err, vowsBatch) {
                var keys = Object.keys(vowsBatch);

                assert.deepEqual(keys, testHelper.expectedBatchKeys);
            },
            'should create vows batch having the correct topics': function(err, vowsBatch) {
                var keys = Object.keys(vowsBatch);

                testHelper.assertTopics(keys, vowsBatch);
            },
            'should create vows batch having the correct assertions': function(err, vowsBatch) {
                var keys = Object.keys(vowsBatch);

                testHelper.assertAssertions(keys, vowsBatch);
            }
        }
    })

.export(module);

