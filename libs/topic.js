/*
 *
 * Topic module.
 *
 */

/*
 * Node dependencies.
 */
var log = require('logerize');

/*
 * App modules.
 */
var Manipulation = require('./manipulation.js');

/*
 * Module variables.
 */
var customProcessors = {};

/*
 * Class definition.
 */
function Topic() {};



/*
 *
 * Instance functions.
 *
 */



/*
 * Create the topic for a vows context. It is important to
 * create the topic function here and call the given broke
 * process with the scope of the defined topic function, to
 * make "this.callback()" accessable in the broke context.
 *
 * @param object vowsContext, the vows context to add the topic.
 * @param object brokeContext, a given broke context.
 */
Topic.prototype.create = function create(vowsContext, brokeContext) {
    vowsContext.topic = function topic() {
        var self = this;

        // Execute first given process phases.
        var processPhaseName = Object.keys(brokeContext.process)[0]
          , processPhase = customProcessors[processPhaseName];

        if(typeof processPhase === 'undefined') {
            return log.error(new Error('Invalid process phase "' + processPhaseName + '".').stack);
        }

        self.callback = Topic.callback.call(self, brokeContext, self.callback);

        Manipulation.timeoutStart(brokeContext);
        Manipulation.delay(brokeContext, function() {
            processPhase.call(self, vowsContext, brokeContext);
        });
    };
};

/*
 * Set injected custom processors as local variable.
 *
 * @param object injectedProcessors, injected custom processors.
 *
 * @return object customProcessors, injected custom processors.
 */
Topic.prototype.inject = function inject(injectedProcessors) {
    customProcessors = injectedProcessors;

    return customProcessors;
};



/*
 *
 * Class functions.
 *
 */



/*
 * Just throws a error.
 *
 * @param object vowsContext, the vows context to add the topic.
 * @param object brokeContext, a given broke context.
 */
Topic.topicError = function topicError(vowsContext, brokeContext) {
    this.callback('Invalid process. Cannot execute test case.');
};

/*
 * Wrap vows callback function for better control flow.
 *
 * @param function cb, vows "this.callback".
 *
 * @param object brokeContext, a given broke context.
 * @return function callback, the wrapped callback function.
 */
Topic.callback = function callback(brokeContext, cb) {
    var self = this;

    return function callback() {
        var args = [].slice.call(arguments);

        Manipulation.calmDown(brokeContext, function() {
            Manipulation.timeoutEnd(brokeContext, args);
            cb.apply(self, args);
        });
    };
};

/*
 * Export the module.
 */
module.exports = new Topic;

