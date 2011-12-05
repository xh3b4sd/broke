/*
 *
 * Example Test module.
 *
 */

/*
 * Node dependencies.
 */
var broke = require('../libs/broke')
  , assert = require('assert');

/*
 * Test suite config including custom processors and
 * custom assertions.
 */
var config = {
    processors: require('./custom_processors.js'),
    assertions: require('./custom_assertions.js'),
};

/*
 * Create a new test suite.
 */
broke
    .test('dummy test suite')

    /*
     * Start phases are just batches you can call as you like.
     */
    .start({
        'init the test suite': {
            process: {
                method: function() {
                    this.callback(undefined, 'data');
                }
            },
            assert: {
                'test suite initialized': function(err, data) {
                    assert.isNull(err);
                    assert.equal(data, 'data');
                }
            }
        }
    })

    /*
     * Batches can be configured and do what you want.
     */
    .batch({
        'test your code': {
            config: {
                repeats: 5,     // Repeats the test case 5 times.
                delay: 500,     // Process the test case after 500 ms.
                calmDown: 500,  // Assert the test case after 500 ms.
                timeout: 2000   // End the test with an error after 2000 ms.
            },
            process: {
                /*
                 * Process requests. To do that you have to inject the request
                 * processor into the run(module, [config]) method.
                 */
                request: {method: 'GET', url: 'http://google.com', options: {port: 80}}
            },
            assert: {
                /*
                 * Assert requests. To do that you have to inject the statusCode
                 * assertion into the run(module, [config]) method.
                 */
                statusCode: 301
            }
        }

        // Define more test cases to execute them asynchronousely.
    })

    /*
     * Stop phases are just batches you can call as you like.
     */
    .stop({
        'tear down the test suite': {
            process: {
                method: function() {
                    this.callback(undefined, 'data');
                }
            },
            assert: {
                'test suite back to normal': function(err, data) {
                    assert.isNull(err);
                    assert.equal(data, 'data');
                }
            }
        }
    })

/*
 * Run a test suite and export it.
 *
 * @param object module, a reference to the current module.
 * @param object config, the config including processors and assertions.
 *
 * @return object, instance of initialized test suite.
 */
.run(module, config);


