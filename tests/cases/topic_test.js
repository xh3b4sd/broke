/*
 * Topic test module.
 */

var vows = require('vows')
  , assert = require('assert');

var Topic = require('../../libs/topic.js')
  , customProcessorsMock = require('../mocks/custom_processors_mock.js')
  , brokeContextMock = require('../mocks/broke_context_mock');

vows
    .describe('topic')

    // Test Topic.create()
    .addBatch({
        'call create() without injected custom processors': {
            topic: function() {
                var vowsContext = {}
                  , brokeContext = new brokeContextMock.create('init the test suite');

                brokeContext.customProcessors = {};

                Topic.create(vowsContext, brokeContext);

                this.callback(undefined, vowsContext, brokeContext);
            },
            'should do nothing': function(err, vowsContext, brokeContext) {
                assert.deepEqual(vowsContext, {});
                assert.include(brokeContext, 'process');
                assert.include(brokeContext, 'assert');
                assert.include(brokeContext.process, 'method');
                assert.include(brokeContext.assert, 'test suite initialized');
            }
        },
        'call create() with injected custom processor that is not a function': {
            topic: function() {
                var vowsContext = {}
                  , brokeContext = new brokeContextMock.create('test your code');

                brokeContext.customProcessors = {};

                Topic.create(vowsContext, brokeContext);

                this.callback(undefined, vowsContext, brokeContext);
            },
            'should do nothing': function(err, vowsContext, brokeContext) {
                assert.deepEqual(vowsContext, {});
                assert.include(brokeContext, 'process');
                assert.include(brokeContext, 'assert');
                assert.include(brokeContext.process, 'request');
                assert.include(brokeContext.assert, 'statusCode');
            }
        },
        'call create() with injected custom processor': {
            topic: function() {
                var vowsContext = {}
                  , brokeContext = new brokeContextMock.create('broken custom assertion');

                brokeContext.customProcessors = customProcessorsMock;

                Topic.create(vowsContext, brokeContext);

                this.callback(undefined, vowsContext, brokeContext);
            },
            'should create vowsContext.topic': function(err, vowsContext, brokeContext) {
                // Test vowsContext
                assert.isObject(vowsContext);
                assert.include(vowsContext, 'topic');
            },
            'should modify brokeContext correctly': function(err, vowsContext, brokeContext) {
                assert.include(brokeContext, 'process');
                assert.include(brokeContext, 'assert');
                assert.include(brokeContext.process, 'request');
                assert.include(brokeContext.assert, 'brokenAssertion');
            }
        }
    })

.export(module);

