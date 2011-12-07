/*
 * Broke context mock module.
 */

module.exports.batch = {
    // Working batches
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
        },
    },
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
        },
    },

    // Broken batches
    'broken custom assertion': {
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
            brokenAssertion: 'that should not work'
        },
    },
    'another broken custom assertion': {
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
            anotherBrokenAssertion: 'that should not work'
        },
    },
    'without process phase': {
        config: {
            repeats: 5,
            delay: 500,
            calmDown: 500,
            timeout: 2000
        },
        assert: {
            anotherBrokenAssertion: 'that should not work'
        },
    },
    'without assert phase': {
        config: {
            repeats: 5,
            delay: 500,
            calmDown: 500,
            timeout: 2000
        },
        process: {
            request: {method: 'GET', url: 'http://google.com', options: {port: 80}}
        },
    }
};

module.exports.create = function create(name) {
    return module.exports.batch[name];
};

