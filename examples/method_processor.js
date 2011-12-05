/*
 *
 * Method Processor module.
 *
 */

/*
 * Just call the process function with the scope of a
 * vows topic. So you can do something like that:
 *
 *      process: {
 *          method: function() {
 *              // use vows "this.callback"
 *          }
 *      }
 *
 * @param object vowsContext, the vows context to add the topic.
 * @param object brokeContext, a given broke context.
 */
module.exports = function methodProcessor(vowsContext, brokeContext) {
    brokeContext.process.method.call(this);
};

