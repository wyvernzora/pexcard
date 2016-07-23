/**
 * endpoint.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
/* eslint no-unused-vars: 1, no-shadow: 0 */
const _            = require('lodash');
const Debug        = require('debug')('pexcard:endpoint');
const Request      = require('request-promise');
const UrlBuilder   = require('./util/url-builder');


function endpoint(parent, { method, path }) {

  /**
   * Construct the actual endpoint URL template
   */
  const template = UrlBuilder(parent.root, path);
  Debug(template.params);


  /**
   * Return the request function factory
   */
  return async (args = { }, query, headers) => {

    /* Grab any headers specified in parent */
    headers = _.assign({ }, parent.headers, headers);


    /* Make the request */
    const response = await Request({
      method,
      headers,
      qs: query,
      json: true,
      uri: template(args),
      body: _.omit(args, template.params)
    });


    return response;
  };

}
module.exports = endpoint;