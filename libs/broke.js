/*
 *
 * Broke module.
 *
 */

/*
 * Node dependencies.
 */
var vows = require('vows')
  , EventEmitter = require('events').EventEmitter;

/*
 * App modules.
 */
var TestCase = require('./test_case.js')
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
 * Define the test name. If there is no test name defined, return
 * with an error.
 *
 * @param string testName, the required name of the test.
 *
 * @return object, a Broke test instance.
 */
Broke.prototype.test = function test(testName) {
    if(typeof testName !== 'string') var err = 'No test name given.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    if(typeof this.batches === 'undefined') this.batches = [];

    this.suite = vows.describe(testName);

    return this;
};

/*
 * Define the optional start phase. If there is no test name defined,
 * return with an error.
 *
 * @param function || string || object startPhase, the phase to initialize a test.
 *
 * @return object, a Broke test instance.
 */
Broke.prototype.start = function start(startPhase) {
    if(typeof this.suite === 'undefined') var err = 'No test suite defined.';
    if(typeof startPhase === 'undefined') var err = 'No start phase defined.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    this.batches.push(startPhase);

    return this;
};

/*
 * Define the test batches. If there is no test name defined, return
 * with an error. If there is no batch defined, return with an error.
 *
 * @param arguments, objects of batches.
 *
 * @return object, a Broke test instance.
 */
Broke.prototype.batch = function batch(batch) {
    if(typeof this.suite === 'undefined') var err = 'No test suite defined.';
    if(typeof batch === 'undefined') var err = 'No batch defined.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    this.batches.push(batch);

    return this;
};

/*
 * Define the optional stop phase. If there is no test name defined,
 * return with an error. If there is no batch defined, return with
 * an error.
 *
 * @param function || string || object stopPhase, the phase to end a test.
 *
 * @return object, a Broke test instance.
 */
Broke.prototype.stop = function stop(stopPhase) {
    if(typeof this.suite === 'undefined') var err = 'No test suite defined.';
    if(typeof this.batches === 'undefined') var err = 'No batch defined.';
    if(typeof stopPhase === 'undefined') var err = 'No stop phase defined.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    this.batches.push(stopPhase);

    return this;
};

/*
 * Run a test. If there is no test name defined, return with an error.
 * If there is no batch defined, return with an error.
 *
 * @param object module, executing module instance.
 * @param object customAssertions, custom assertions a test suite can use.
 */
Broke.prototype.run = function run(module, customAssertions) {
    if(typeof this.suite === 'undefined') var err = 'No test suite defined.';
    if(typeof this.batches === 'undefined') var err = 'No batch defined.';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    if(typeof customAssertions === 'object') Assert.inject(customAssertions);

    Broke.batches.call(this, this.batches);

    this.suite.export(module);
};



/*
 *
 * Class functions.
 *
 */



/*
 * Add broke batches to vows test suite.
 *
 * @param array batches, a list of given broke batches.
 */
Broke.batches = function batches(batches) {
    var self = this;

    batches.forEach(function(batch) {
        self.suite.addBatch(TestCase.createBatch(batch));
    });
};

/*
 * Export module.
 */
module.exports = new Broke;

