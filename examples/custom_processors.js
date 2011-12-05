/*
 *
 * Custom Processors module.
 *
 * Custom processors in their easiest form, just provides
 * a function that is called in the scope of a vows topic.
 * Look for examples/method_processor.js.
 */

/*
 * App modules.
 */
var methodProcessor = require('./method_processor.js')
  , requestProcessor = require('./request_processor.js');

var customProcessors = {
    method: methodProcessor,
    request: requestProcessor
};

module.exports = customProcessors;

