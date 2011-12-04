/*
 * Manipulation test module.
 */

var vows = require('vows')
  , assert = require('assert');

var Manipulation = require('../../libs/manipulation.js');

/*
 * Custom test helper.
 */
var testHelper = {
    /*
     * Assert broke configuration.
     */
    assertConfig: function assertConfig(brokeContext, expectedConfig) {
        assert.isObject(brokeContext);
        assert.isObject(expectedConfig);
        assert.include(brokeContext, 'config');
        assert.isObject(brokeContext.config);

        var config = brokeContext.config
          , keys = Object.keys(config);

        assert.length(keys, 4);

        assert.include(config, 'repeats');
        assert.include(config, 'delay');
        assert.include(config, 'calmDown');
        assert.include(config, 'timeout');

        assert.equal(config.repeats, expectedConfig.repeats);
        assert.equal(config.delay, expectedConfig.delay);
        assert.equal(config.calmDown, expectedConfig.calmDown);
        assert.equal(config.timeout, expectedConfig.timeout);
    }
};

vows
    .describe('manipulation')

    .addBatch({
        // Test Manipulation.defaultConfigs
        'defaultConfigs': {
            topic: function() {
                this.callback(undefined, Manipulation.defaultConfigs);
            },
            'should includes the correct default configs': function(err, defaultConfigs) {
                assert.isObject(defaultConfigs);

                assert.include(defaultConfigs, 'repeats');
                assert.include(defaultConfigs, 'delay');
                assert.include(defaultConfigs, 'calmDown');
                assert.include(defaultConfigs, 'timeout');

                assert.equal(defaultConfigs.repeats, 1);
                assert.equal(defaultConfigs.delay, 0);
                assert.equal(defaultConfigs.calmDown, 0);
                assert.equal(defaultConfigs.timeout, 0);
            }
        },

        // Test Manipulation.config()
        'call config() without given brokeContext configurations': {
            topic: function() {
                var brokeContext = {};

                Manipulation.config(brokeContext);

                this.callback(undefined, brokeContext);
            },
            'should merge default configs into brokeContext': function(err, brokeContext) {
                var expectedConfig = {
                    repeats: 1,
                    delay: 0,
                    calmDown: 0,
                    timeout: 0
                };

                testHelper.assertConfig(brokeContext, expectedConfig);
            }
        },
        'call config() with given brokeContext configurations': {
            topic: function() {
                var brokeContext = {
                    config: {
                        repeats: 5,
                        delay: 6,
                        calmDown: 7,
                        timeout: 8
                    }
                };

                Manipulation.config(brokeContext);

                this.callback(undefined, brokeContext);
            },
            'should not overwrite given configs of brokeContext': function(err, brokeContext) {
                var expectedConfig = {
                    repeats: 5,
                    delay: 6,
                    calmDown: 7,
                    timeout: 8
                };

                testHelper.assertConfig(brokeContext, expectedConfig);
            }
        },
        'call config() with some given brokeContext configurations': {
            topic: function() {
                var brokeContext = {
                    config: {
                        repeats: 5,
                        delay: 6,
                    }
                };

                Manipulation.config(brokeContext);

                this.callback(undefined, brokeContext);
            },
            'should merge default with given configs of brokeContext': function(err, brokeContext) {
                var expectedConfig = {
                    repeats: 5,
                    delay: 6,
                    calmDown: 0,
                    timeout: 0
                };

                testHelper.assertConfig(brokeContext, expectedConfig);
            }
        },

        // Test Manipulation.delay()
        'call delay() with brokeContext.config.delay = 0': {
            topic: function() {
                var self = this;

                var brokeContext = {
                    config: {delay: 0},
                    start: Date.now()
                };

                Manipulation.delay(brokeContext, function() {
                    self.callback(undefined, brokeContext);
                });
            },
            'should not delay the callback execution': function(err, brokeContext) {
                var duration = Date.now() - brokeContext.start;

                // Callback execution should not be delayed more than 5 ms.
                assert.isTrue(duration < 5);
            }
        },
        'call delay() with brokeContext.config.delay = 100': {
            topic: function() {
                var self = this;

                var brokeContext = {
                    config: {delay: 100},
                    start: Date.now()
                };

                Manipulation.delay(brokeContext, function() {
                    self.callback(undefined, brokeContext);
                });
            },
            'should not delay the callback execution': function(err, brokeContext) {
                var duration = Date.now() - brokeContext.start;

                // Callback execution should not be delayed more than 105 ms.
                assert.isTrue(duration >= 100);
                assert.isTrue(duration < 105);
            }
        },

        // Test Manipulation.repeats()
        'call repeats() with brokeContext.config.repeats = 1': {
            topic: function() {
                var self = this;

                var brokeContext = {
                    config: {repeats: 1},
                    repeated: 0,
                    states: []
                };

                Manipulation.repeats(brokeContext, function(state) {
                    brokeContext.states.push(state);

                    if(++brokeContext.repeated === brokeContext.config.repeats) {
                        self.callback(undefined, brokeContext);
                    }
                });
            },
            'should repeat the callback 1 time': function(err, brokeContext) {
                assert.equal(brokeContext.repeated, 1);
                assert.deepEqual(brokeContext.states, [' [#1]']);
            }
        },
        'call repeats() with brokeContext.config.repeats = 3': {
            topic: function() {
                var self = this;

                var brokeContext = {
                    config: {repeats: 3},
                    repeated: 0,
                    states: []
                };

                Manipulation.repeats(brokeContext, function(state) {
                    brokeContext.states.push(state);

                    if(++brokeContext.repeated === brokeContext.config.repeats) {
                        self.callback(undefined, brokeContext);
                    }
                });
            },
            'should repeat the callback 1 time': function(err, brokeContext) {
                assert.equal(brokeContext.repeated, 3);
                assert.deepEqual(brokeContext.states, [' [#1]', ' [#2]', ' [#3]']);
            }
        },

        // Test Manipulation.timeoutStart()
        'call timeoutStart() with brokeContext.config.timeout = 0': {
            topic: function() {
                var brokeContext = {
                    config: {timeout: 0},
                };

                Manipulation.timeoutStart(brokeContext);

                this.callback(undefined, brokeContext);
            },
            'should not initialize brokeContext.start': function(err, brokeContext) {
                assert.isUndefined(brokeContext.start);
            }
        },
        'call timeoutStart() with brokeContext.config.timeout = 1': {
            topic: function() {
                var brokeContext = {
                    config: {timeout: 1},
                };

                Manipulation.timeoutStart(brokeContext);

                this.callback(undefined, brokeContext);
            },
            'should initialize brokeContext.start with current timestamp': function(err, brokeContext) {
                assert.isNumber(brokeContext.start);
                assert.isTrue(Date.now() - brokeContext.start < 5);
            }
        },

        // Test Manipulation.timeoutEnd()
        'call timeoutEnd() with brokeContext.config.timeout = 0': {
            topic: function() {
                var args = ['err', 'data'];

                var brokeContext = {
                    config: {timeout: 0},
                    start: Date.now()
                };

                Manipulation.timeoutEnd(brokeContext, args);

                this.callback(undefined, brokeContext, args);
            },
            'should do nothing': function(err, brokeContext, args) {
                assert.deepEqual(args, ['err', 'data']);
            }
        },
        'call timeoutEnd() with brokeContext.config.timeout = 1000 that dont exceed': {
            topic: function() {
                var args = ['err', 'data'];

                var brokeContext = {
                    config: {timeout: 1000},
                    start: Date.now()
                };

                Manipulation.timeoutEnd(brokeContext, args);

                this.callback(undefined, brokeContext, args);
            },
            'should do nothing': function(err, brokeContext, args) {
                assert.deepEqual(args, ['err', 'data']);
            }
        },
        'call timeoutEnd() with brokeContext.config.timeout = 1000 that exceed': {
            topic: function() {
                var args = ['err', 'data'];

                var brokeContext = {
                    name: 'timeout test',
                    config: {timeout: 1000},
                    start: Date.now() - 2000
                };

                Manipulation.timeoutEnd(brokeContext, args);

                this.callback(undefined, brokeContext, args);
            },
            'should do nothing': function(err, brokeContext, args) {
                assert.deepEqual(args, ['Test case "timeout test" timed out.', 'data']);
            }
        },

        // Test Manipulation.calmDown()
        'call calmDown() with brokeContext.config.calmDown = 0': {
            topic: function() {
                var self = this;

                var brokeContext = {
                    config: {calmDown: 0},
                    start: Date.now()
                };

                Manipulation.calmDown(brokeContext, function() {
                    self.callback(undefined, brokeContext);
                });
            },
            'should not calmDown the callback execution': function(err, brokeContext) {
                var duration = Date.now() - brokeContext.start;

                // Callback execution should not be calmDowned more than 5 ms.
                assert.isTrue(duration < 5);
            }
        },
        'call calmDown() with brokeContext.config.calmDown = 100': {
            topic: function() {
                var self = this;

                var brokeContext = {
                    config: {calmDown: 100},
                    start: Date.now()
                };

                Manipulation.calmDown(brokeContext, function() {
                    self.callback(undefined, brokeContext);
                });
            },
            'should not calmDown the callback execution': function(err, brokeContext) {
                var duration = Date.now() - brokeContext.start;

                // Callback execution should not be calmDowned more than 105 ms.
                assert.isTrue(duration >= 100);
                assert.isTrue(duration < 105);
            }
        },
    })

.export(module);

