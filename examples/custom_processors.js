/*
 *
 * Custom Processors module.
 *
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

