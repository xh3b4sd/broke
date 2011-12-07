/*
 * Assert test module.
 */

var vows = require('vows')
  , assert = require('assert')

var Assert = require('../../libs/assert.js')
  , customAssertionsMock = require('../mocks/custom_assertions_mock.js')
  , brokeContextMock = require('../mocks/broke_context_mock.js')

vows
    .describe('assert')

    // Test Assert.create()
    .addBatch({
        'call create() with normal assertions in a broke context': {
            topic: function() {
                var vowsContext = {};

                Assert.create(vowsContext, new brokeContextMock.create('init the test suite'));

                this.callback(undefined, vowsContext);
            },
            'should create normal assertions in a vows context': function(err, vowsContext) {
                var assertion = 'test suite initialized';

                assert.isObject(vowsContext);
                assert.deepEqual(Object.keys(vowsContext), [assertion]);
                assert.isFunction(vowsContext[assertion]);
            }
        },
        'call create() with used custom assertions that are not injected': {
            topic: function() {
                var vowsContext = {}
                  , brokeContext = new brokeContextMock.create('test your code');

                brokeContext.customAssertions = {};

                Assert.create(vowsContext, brokeContext);

                this.callback(undefined, vowsContext);
            },
            'should not create custom assertions in a vows context': function(err, vowsContext) {
                assert.isObject(vowsContext);
                assert.deepEqual(Object.keys(vowsContext), []);
            }
        },
        'call create() with used custom assertions that are injected': {
            topic: function() {
                var vowsContext = {}
                  , brokeContext = new brokeContextMock.create('test your code');

                brokeContext.customAssertions = customAssertionsMock;

                Assert.create(vowsContext, brokeContext);

                this.callback(undefined, vowsContext);
            },
            'should create custom assertions in a vows context': function(err, vowsContext) {
                var firstAssertion = 'should respond without errors'
                  , secondAssertion = 'should respond with status code 301';

                assert.isObject(vowsContext);
                assert.deepEqual(Object.keys(vowsContext), [firstAssertion, secondAssertion]);
                assert.isFunction(vowsContext[firstAssertion]);
                assert.isFunction(vowsContext[secondAssertion]);
            }
        },
        'call create() using custom assertions that dont return an object': {
            topic: function() {
                var vowsContext = {}
                  , brokeContext = new brokeContextMock.create('another broken custom assertion');

                brokeContext.customAssertions = customAssertionsMock;

                Assert.create(vowsContext, brokeContext);

                this.callback(undefined, vowsContext);
            },
            'should not create custom assertions in a vows context': function(err, vowsContext) {
                assert.isObject(vowsContext);
                assert.deepEqual(Object.keys(vowsContext), []);
            }
        },
    })

.export(module);

