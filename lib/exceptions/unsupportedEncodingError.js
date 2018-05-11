/**
 * Created by Alex on 08.05.2018
 * mailto:alex@asab-se.de
 */
'use strict';

module.exports = class UnsupportedEncodingError extends Error {
    constructor(message, extra) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.extra = extra;
    }
};