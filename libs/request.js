/*
 *
 * Request module.
 *
 */

/*
 * Node dependencies.
 */
var url = require('url')
  , log = require('logerize');

/*
 * Module variables.
 */
var defaultOptions = {
    encoding: 'utf8',
    protocol: 'http'
};

var connections = {
    http: require('http'),
    https: require('https'),
};

/*
 * Class definition.
 */
function Request() {};



/*
 *
 * Instance functions.
 *
 */



/*
 * Create and merge request options.
 *
 * @param object brokeReq, a request to test.
 */
Request.prototype.options = function options(brokeReq) {
    brokeReq.options = brokeReq.options || {};

    var parsedUrl = url.parse(brokeReq.url)
      , protocol = parsedUrl.protocol.replace(':', '');

    brokeReq.options.host = parsedUrl.host;
    brokeReq.options.path = parsedUrl.pathname;
    brokeReq.options.method = brokeReq.method;

    Object.keys(defaultOptions).forEach(function(option) {
        brokeReq.options[option] = brokeReq.options[option] || defaultOptions[option]
    });
};

/*
 * Process a request with given options in the scope of a
 * vows topic.
 *
 * @param object brokeReq, a request to test.
 */
Request.prototype.process = function process(brokeReq) {
    var self = this
      , options = brokeReq.options;

    var req = connections[options.protocol].request(options, function(res) {
        res.setEncoding(options.encoding);

        Request.events(res, function(err, res, data) {
            self.callback(err, res, data);
        });
    });

    if(typeof options.data !== 'undefined') req.write(options.data);
    req.end();
};



/*
 *
 * Class functions.
 *
 */



/*
 * Listen on response events of a request.
 *
 * @param object res, instance of a node server response.
 * @param function cb, callback to execute.
 */
Request.events = function events(res, cb) {
    var data = '';

    res.on('data', function(chunk) {
        data += chunk;
    });

    res.on('end', function() {
        cb(undefined, res, data);
    });

    res.on('error', function(err) {
        cb(err, undefined, undefined);
    });
};

/*
 * Export the module.
 */
module.exports = new Request;

