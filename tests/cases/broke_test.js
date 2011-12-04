/*
 * Broke test module.
 */

var vows = require('vows')
  , assert = require('assert')

var Broke = require('../../libs/broke.js')
  , customAssertionsMock = require('../mocks/custom_assertions_mock.js')

vows
    .describe('broke')

    .addBatch({
        /*
         * Test Broke.test()
         */
        'call test() without parameter': {
            topic: function() {
                var suite = Broke.test();

                this.callback(undefined, suite);
            },
            'should return undefined': function(err, suite) {
                assert.isNull(err);
                assert.isUndefined(suite);
            }
        },
        'call test() with string as first parameter': {
            topic: function() {
                var firstSuite = Broke.test('first dummy test')
                var secondSuite = Broke.test('second dummy test');

                this.callback(undefined, firstSuite, secondSuite);
            },
            'should return a new test suite': function(err, firstSuite, secondSuite) {
                assert.isNull(err);

                assert.isObject(firstSuite);
                assert.deepEqual(firstSuite.batches, []);
                assert.isObject(firstSuite.suite);
                assert.equal(firstSuite.suite.subject, 'first dummy test');

                assert.isObject(secondSuite);
                assert.deepEqual(secondSuite.batches, []);
                assert.isObject(secondSuite.suite);
                assert.equal(secondSuite.suite.subject, 'second dummy test');
            }
        },

        /*
         * Test Broke.start()
         */
        'try to use start() if there is no test suite defined': {
            topic: function() {
                this.callback(undefined, Broke.start);
            },
            'should not be possible': function(err, method) {
                assert.isNull(err);
                assert.isUndefined(method);
            }
        },
        'call start() without parameter, and a defined test suite': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .start();

                this.callback(undefined, suite);
            },
            'should return undefined': function(err, suite) {
                assert.isNull(err);
                assert.isUndefined(suite);
            }
        },
        'call start() with a batch, and a defined test suite': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .start({'dummy batch': {}});

                this.callback(undefined, suite);
            },
            'should return a test suite including the defined batch': function(err, suite) {
                assert.isNull(err);
                assert.isObject(suite);
                assert.isArray(suite.batches);
                assert.length(suite.batches, 1);
                assert.equal(Object.keys(suite.batches[0])[0], 'dummy batch');
                assert.isObject(suite.suite);
                assert.equal(suite.suite.subject, 'dummy test suite');
            }
        },

        /*
         * Test Broke.batch()
         */
        'try to use batch() if there is no test suite defined': {
            topic: function() {
                this.callback(undefined, Broke.batch);
            },
            'should not be possible': function(err, method) {
                assert.isNull(err);
                assert.isUndefined(method);
            }
        },
        'call batch() without parameter, and a defined test suite': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .batch();

                this.callback(undefined, suite);
            },
            'should return undefined': function(err, suite) {
                assert.isNull(err);
                assert.isUndefined(suite);
            }
        },
        'call batch() with a batch, and a defined test suite': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .batch({'dummy batch': {}});

                this.callback(undefined, suite);
            },
            'should return a test suite including the defined batch': function(err, suite) {
                assert.isNull(err);
                assert.isObject(suite);
                assert.isArray(suite.batches);
                assert.length(suite.batches, 1);
                assert.equal(Object.keys(suite.batches[0])[0], 'dummy batch');
                assert.isObject(suite.suite);
                assert.equal(suite.suite.subject, 'dummy test suite');
            }
        },

        /*
         * Test Broke.stop()
         */
        'try to use stop() if there is no test suite defined': {
            topic: function() {
                this.callback(undefined, Broke.stop);
            },
            'should not be possible': function(err, method) {
                assert.isNull(err);
                assert.isUndefined(method);
            }
        },
        'call stop() without parameter, and a defined test suite': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .stop();

                this.callback(undefined, suite);
            },
            'should return undefined': function(err, suite) {
                assert.isNull(err);
                assert.isUndefined(suite);
            }
        },
        'call stop() with a batch, and a defined test suite without batches': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .stop({'dummy batch': {}});

                this.callback(undefined, suite);
            },
            'should return undefined': function(err, suite) {
                assert.isNull(err);
                assert.isUndefined(suite);
            }
        },
        'call stop() with a batch, and a defined test suite including batches': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .batch({'dummy batch': {}})
                    .stop({'dummy stop batch': {}});

                this.callback(undefined, suite);
            },
            'should return a test suite including the defined batch': function(err, suite) {
                assert.isNull(err);
                assert.isObject(suite);
                assert.isArray(suite.batches);
                assert.length(suite.batches, 2);
                assert.equal(Object.keys(suite.batches[0])[0], 'dummy batch');
                assert.equal(Object.keys(suite.batches[1])[0], 'dummy stop batch');
                assert.isObject(suite.suite);
                assert.equal(suite.suite.subject, 'dummy test suite');
            }
        },

        /*
         * Test Broke.run()
         */
        'try to use run() if there is no test suite defined': {
            topic: function() {
                this.callback(undefined, Broke.run);
            },
            'should not be possible': function(err, method) {
                assert.isNull(err);
                assert.isUndefined(method);
            }
        },
        'call run() without parameter, and a defined test suite': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .run();

                this.callback(undefined, suite);
            },
            'should return undefined': function(err, suite) {
                assert.isNull(err);
                assert.isUndefined(suite);
            }
        },
        'call run() with module, and a defined test suite without batches': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .run(module);

                this.callback(undefined, suite);
            },
            'should return undefined': function(err, suite) {
                assert.isNull(err);
                assert.isUndefined(suite);
            }
        },
        'call run() with module, custom assertions, and a defined test suite including batches': {
            topic: function() {
                var suite = Broke
                    .test('dummy test suite')
                    .batch({'dummy batch': {}})
                    .run(module, customAssertionsMock);

                this.callback(undefined, suite);
            },
            'should return a test suite including the defined batch and custom assertions': function(err, suite) {
                var keys = Object.keys(suite.customAssertions);

                var customAssertionNames = [
                    'statusCode',
                    'anotherAssertion',
                    'brokenAssertion',
                    'anotherBrokenAssertion'
                ];

                assert.isNull(err);
                assert.isObject(suite);
                assert.isArray(suite.suite.batches);
                assert.isObject(suite.customAssertions);
                assert.deepEqual(keys, customAssertionNames);
                assert.equal(suite.suite.subject, 'dummy test suite');
            }
        },
    })

.export(module);

