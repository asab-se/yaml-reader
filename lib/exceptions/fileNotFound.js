/**
 * Created by Alex on 08.05.2018
 * mailto:alex@asab-se.de
 */
'use strict';

module.exports = function FileNotFoundError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
};

require('util').inherits(module.exports, Error);