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

    /*
     * Test Assert.create()
     */
    .addBatch({
        'call create() with normal assertions in a broke context': {
            topic: function() {
                var vowsContext = {};

                Assert.create(vowsContext, brokeContextMock[0]['init the test suite']);

                this.callback(undefined, vowsContext);
            },
            'should create normal assertions in a vows context': function(err, vowsContext) {
                var keys = Object.keys(vowsContext)
                  , assertion = 'test suite initialized';

                assert.isNull(err);
                assert.isObject(vowsContext);
                assert.length(keys, 1);
                assert.equal(keys[0], assertion);
                assert.isFunction(vowsContext[assertion]);
            }
        },
        'call create() with used custom assertions that are not injected': {
            topic: function() {
                var vowsContext = {};

                Assert.create(vowsContext, brokeContextMock[1]['test your code']);

                this.callback(undefined, vowsContext);
            },
            'should not create custom assertions in a vows context': function(err, vowsContext) {
                var keys = Object.keys(vowsContext);

                assert.isNull(err);
                assert.isObject(vowsContext);
                assert.length(keys, 0);
            }
        },
        'call create() with used custom assertions that are injected': {
            topic: function() {
                var vowsContext = {};

                Assert.inject(customAssertionsMock);
                Assert.create(vowsContext, brokeContextMock[1]['test your code']);

                this.callback(undefined, vowsContext);
            },
            'should create custom assertions in a vows context': function(err, vowsContext) {
                var keys = Object.keys(vowsContext)
                  , firstAssertion = 'should respond without errors'
                  , secondAssertion = 'should respond with status code 301';

                assert.isNull(err);
                assert.isObject(vowsContext);
                assert.length(keys, 2);
                assert.equal(keys[0], firstAssertion);
                assert.equal(keys[1], secondAssertion);
                assert.isFunction(vowsContext[firstAssertion]);
                assert.isFunction(vowsContext[secondAssertion]);
            }
        },
        'call create() using custom assertions that dont return an object': {
            topic: function() {
                var vowsContext = {}
                  , brokeContext = brokeContextMock[3]['test case using another broken custom assertion'];

                Assert.inject(customAssertionsMock);
                Assert.create(vowsContext, brokeContext);

                this.callback(undefined, vowsContext);
            },
            'should not create custom assertions in a vows context': function(err, vowsContext) {
                var keys = Object.keys(vowsContext);

                assert.isNull(err);
                assert.isObject(vowsContext);
                assert.length(keys, 0);
            }
        },
    })

.export(module);

