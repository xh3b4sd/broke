
var broke = require('broke')
  , assert = require('assert');

broke
    .test('dummy test suite')

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

    .batch({
        'test your code': {
            config: {
                repeats: 5,
                delay: 500,
                calmDown: 500,
                timeout: 2000
            },
            process: {
                request: {method: 'GET', url: 'http://google.com', options: {port: 80}}
            },
            assert: {
                statusCode: 301
            }
        }
    })

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

.run(module, require('./custom_assertions.js'));


