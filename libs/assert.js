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
        var assertion = {
            key: brokeAssertionName,
            value: brokeContext.assert[brokeAssertionName]
        };

        if(typeof assertion.value === 'function') vowsContext[assertion.key] = assertion.value;
        else Assert.merge(vowsContext, brokeContext, assertion);
    });
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
 * @param object brokeContext, a given broke context.
 * @param object assertion, key value pair of a custom asserrtion.
 */
Assert.merge = function merge(vowsContext, brokeContext, assertion) {
    var err = 'Invalid custom assertion "' + assertion.key + '"'
      , customAssertions = brokeContext.customAssertions[assertion.key];

    if(typeof customAssertions === 'function') var methods = customAssertions(assertion.value);
    else return log.error(new Error(err).stack);

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

