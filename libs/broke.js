/*
 *
 * Broke module.
 *
 */

/*
 * Node dependencies.
 */
var vows = require('vows')
  , log = require('logerize')
  , EventEmitter = require('events').EventEmitter;

/*
 * App modules.
 */
var TestCase = require('./test_case.js')
  , Topic = require('./topic.js')
  , Assert = require('./assert.js');

/*
 * Class definition.
 */
function Broke() {};



/*
 *
 * Instance functions.
 *
 */



/*
 * Define the optional start phase. If there is no test name defined,
 * return with an error.
 *
 * @param object startPhase, the optional phase to initialize a test.
 *
 * @return object, a Broke test instance.
 */
Broke.prototype.start = function start(startPhase) {
    if(typeof startPhase === 'undefined') var err = 'No start phase defined.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    this.batches.push(startPhase);

    return this;
};

/*
 * Define a test batch. If there is no batch defined, return with an error.
 *
 * @param arguments, objects of batches.
 *
 * @return object, a Broke test instance.
 */
Broke.prototype.batch = function batch(batch) {
    if(typeof batch === 'undefined') var err = 'No batch defined.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    this.batches.push(batch);

    return this;
};

/*
 * Define the optional stop phase. If there is no batch defined, return with
 * an error.
 *
 * @param object stopPhase, the phase to end a test.
 *
 * @return object, a Broke test instance.
 */
Broke.prototype.stop = function stop(stopPhase) {
    if(typeof stopPhase === 'undefined') var err = 'No stop phase defined.';
    if(this.batches.length === 0) var err = 'No batches defined.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    this.batches.push(stopPhase);

    return this;
};

/*
 * Run a test. If there is no batch defined, return with an error.
 *
 * @param object module, executing module instance.
 * @param object config, test suite config to inject custom stuff.
 */
Broke.prototype.run = function run(module, config) {
    if(typeof module === 'undefined') var err = 'No module to export defined.';
    if(this.batches.length === 0) var err = 'No batches defined.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    if(typeof config === 'object') {
        if(typeof config.processors === 'object') this.processors = Topic.inject(config.processors);
        if(typeof config.assertions === 'object') this.assertions = Assert.inject(config.assertions);
    }

    batches.call(this);

    this.suite.export(module);

    return this;
};



/*
 *
 * Class functions.
 *
 */



/*
 * Create and return a new test suite. If there is no test name defined, return
 * with an error.
 *
 * @param string testName, the required name of the test.
 *
 * @return object, a Broke test instance.
 */
Broke.test = function test(testName) {
    if(typeof testName !== 'string') var err = 'No test name given.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    var broke = new this;

    broke.batches = [];
    broke.suite = vows.describe(testName);

    return broke;
};



/*
 *
 * Private functions.
 *
 */



/*
 * Add broke batches to vows test suite.
 */
function batches() {
    var self = this;

    self.batches.forEach(function(batch) {
        self.suite.addBatch(TestCase.createBatch(batch));
    });
};

/*
 * Export module.
 */
module.exports = Broke;

