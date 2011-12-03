/*
 *
 * Test Case module.
 *
 */

/*
 * Node dependencies.
 */
var log = require('logerize')
  , EventEmitter = require('events').EventEmitter;

/*
 * App modules.
 */
var Topic = require('./topic.js')
  , Assert = require('./assert.js')
  , Manipulation = require('./manipulation.js');

/*
 * Class definition.
 */
function TestCase() {};



/*
 *
 * Instance functions.
 *
 */



/*
 * Transform the broke batch to a valid vows batch.
 *
 * @param object brokeBatch, a given broke batch.
 *
 * @return object vowsBatch, a valid vows batch.
 */
TestCase.prototype.createBatch = function createBatch(brokeBatch) {
    var vowsBatch = {};

    Object.keys(brokeBatch).forEach(function(contextName) {
        var brokeContext = brokeBatch[contextName];

        // Validate process type.
        if(typeof brokeContext.process !== 'object') {
            return log.error(new Error('Invalid process type').stack);
        }

        brokeContext.name = contextName;
        brokeContext.emitter = new EventEmitter;

        TestCase.createContext(vowsBatch, brokeContext, function(contextName, context) {
            vowsBatch[contextName] = context;
        });
    });

    return vowsBatch;
};



/*
 *
 * Class functions.
 *
 */



/*
 * Create a valid vows context. Context´s are just test cases,
 * that are executed in parallel inside a batch.
 *
 * @param object vowsBatch, an empty object that is used to create a vows batch.
 * @param object brokeContext, a given broke context.
 * @param function cb, callback to execute.
 */
TestCase.createContext = function createContext(vowsBatch, brokeContext, cb) {
    var vowsContext = {};

    Manipulation.config(brokeContext);
    Topic.create(vowsContext, brokeContext);
    Assert.create(vowsContext, brokeContext);
    Manipulation.repeats(brokeContext, function(contextId) {
        cb(brokeContext.name + contextId, vowsContext);
    })
};

/*
 * Export the module.
 */
module.exports = new TestCase;

