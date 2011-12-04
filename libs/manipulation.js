/*
 *
 * Manipulation module.
 *
 */

/*
 * Class definition.
 */
function Manipulation() {};



/*
 * Default config.
 */
Manipulation.prototype.defaultConfigs = {
    delay: 0,
    timeout: 0,
    repeats: 1,
    calmDown: 0
};



/*
 *
 * Instance functions.
 *
 */



/*
 * Set default configurations to the broke context. Context
 * configurations are optional.
 *
 * @param object brokeContext, a given broke context.
 */
Manipulation.prototype.config = function config(brokeContext) {
    var defaultConfigs = this.defaultConfigs;

    brokeContext.config = brokeContext.config || {};

    Object.keys(defaultConfigs).forEach(function(config) {
        brokeContext.config[config] = brokeContext.config[config] || defaultConfigs[config];
    });
};

/*
 * Execute the given callback function after the broke context
 * configuration delay.
 *
 * @param object brokeContext, a given broke context.
 * @param function cb, callback to execute.
 */
Manipulation.prototype.delay = function delay(brokeContext, cb) {
    var delay = brokeContext.config.delay;

    if(delay === 0) cb();
    else setTimeout(cb, delay);
};

/*
 * Execute the given callback function as often as the broke
 * configuration repeats is set.
 *
 * @param object brokeContext, a given broke context.
 * @param function cb, callback to execute.
 */
Manipulation.prototype.repeats = function repeats(brokeContext, cb) {
    var i = 1
      , ii = brokeContext.config.repeats;

    for(i; i <= ii; i++) {
        cb(' [#' + i + ']');
    }
};

/*
 * Start to track the execution time of a test case.
 *
 * @param object brokeContext, a given broke context.
 */
Manipulation.prototype.timeoutStart = function timeoutStart(brokeContext) {
    if(brokeContext.config.timeout > 0) brokeContext.start = Date.now();
};

/*
 * Finish to track the execution time of a test case
 * and inject an error if the test duratiuon exceeds
 * the configured timeout.
 *
 * @param object brokeContext, a given broke context.
 * @param array args, arguments of the test case callback.
 */
Manipulation.prototype.timeoutEnd = function timeoutEnd(brokeContext, args) {
    if(brokeContext.config.timeout === 0) return;

    var duration = Date.now() - brokeContext.start;

    if(duration > brokeContext.config.timeout) {
        args.shift();
        args.unshift('Test case "' + brokeContext.name + '" timed out.');
    }
};

/*
 * Execute the assertions of a context after a given periode
 * of time, to let the processed test calm down.
 *
 * @param object brokeContext, a given broke context.
 * @param function cb, callback to execute.
 */
Manipulation.prototype.calmDown = function calmDown(brokeContext, cb) {
    var calmDown = brokeContext.config.calmDown;

    if(calmDown === 0) cb();
    else setTimeout(cb, calmDown);
};

/*
 * Export the module.
 */
module.exports = new Manipulation;

