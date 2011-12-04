/*
 *
 * Assert module.
 *
 */

/*
 * Node dependencies.
 */
var log = require('logerize');

/*
 * App modules.
 */
var customAssertions = {};

/*
 * Class definition.
 */
function Assert() {};



/*
 *
 * Instance functions.
 *
 */



/*
 * Create the assertions for a vows context.
 *
 * @param object vowsContext, the vows context to add the assertions.
 * @param object brokeContext, a given broke context.
 */
Assert.prototype.create = function create(vowsContext, brokeContext) {
    Object.keys(brokeContext.assert).forEach(function(brokeAssertionName) {
        var brokeAssertion = brokeContext.assert[brokeAssertionName];

        if(typeof brokeAssertion === 'function') vowsContext[brokeAssertionName] = brokeAssertion;
        else Assert.merge(vowsContext, brokeAssertionName, brokeAssertion);
    });
};

/*
 * Set injected custom assertions as local variable.
 *
 * @param object customAssertions, injected custom assertions.
 *
 * @return object customAssertions, injected custom assertions.
 */
Assert.prototype.inject = function inject(injectedCustomAssertions) {
    customAssertions = injectedCustomAssertions;

    return customAssertions;
};



/*
 *
 * Class functions.
 *
 */



/*
 * Merge custom assertions into a vows context.
 *
 * @param object vowsContext, the vows context to add the assertions.
 * @param string brokeAssertionName, name of the custom assertion to merge.
 * @param !function brokeAssertion, the expected parameter for a custom assertion.
 */
Assert.merge = function merge(vowsContext, brokeAssertionName, brokeAssertion) {
    var err = 'Invalid custom assertion "' + brokeAssertionName + '"'
      , customAssertion = customAssertions[brokeAssertionName];

    if(typeof customAssertion !== 'function') return log.error(new Error(err).stack);

    var methods = customAssertion(brokeAssertion);

    if(typeof methods !== 'object' || Array.isArray(methods)) return log.error(new Error(err).stack);

    Object.keys(methods).forEach(function(assertionName) {
        var assertion = methods[assertionName];

        if(typeof assertion === 'function') vowsContext[assertionName] = assertion;
        else log.error(new Error(err).stack);
    });
};

/*
 * Export the module.
 */
module.exports = new Assert;

