var auth = require('basic-auth');

/**
 * Simple basic auth middleware for use with Express 4.x.
 * via http://www.danielstjules.com/2014/08/03/basic-auth-with-express-4/
 *
 * @param   {string}   username Expected username
 * @param   {string}   password Expected password
 * @returns {function} Express 4 middleware requiring the given credentials
 */
var basicAuth = function(username, password) {
  return function(req, res, next) {
    var user = auth(req);
    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    }
    next();
  };
};

module.exports = basicAuth;
