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
var Manipulation = require('./manipulation.js')
  , Request = require('./request.js');

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
        var self = this
          , type = 'topicError';

        // Execute given process phases.
        if(typeof brokeContext.process.method === 'function') type = 'topicMethod';
        else if(typeof brokeContext.process.request === 'object') type = 'topicRequest';

        self.callback = Topic.callback.call(self, brokeContext, self.callback);

        Manipulation.timeoutStart(brokeContext);
        Manipulation.delay(brokeContext, function() {
            Topic[type].call(self, vowsContext, brokeContext);
        });
    };
};



/*
 *
 * Class functions.
 *
 */



/*
 * Just call the process function with the scope of a
 * vows topic.
 *
 * @param object vowsContext, the vows context to add the topic.
 * @param object brokeContext, a given broke context.
 */
Topic.topicMethod = function topicMethod(vowsContext, brokeContext) {
    brokeContext.process.method.call(this);
};

/*
 * Process the topic request in the scope of a vows topic.
 *
 * @param object vowsContext, the vows context to add the topic.
 * @param object brokeContext, a given broke context.
 */
Topic.topicRequest = function topicRequest(vowsContext, brokeContext) {
    var brokeReq = brokeContext.process.request;

    if(typeof brokeReq.method !== 'string') var err = 'No request method given';
    if(typeof brokeReq.url !== 'string') var err = 'No request url given';
    if(typeof err === 'string') return log.error(new Error(err).stack);

    Request.options(brokeReq);
    Request.process.call(this, brokeReq);
};

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

