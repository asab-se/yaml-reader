/**
 * Created by Alex on 11.05.2018
 * mailto:alex@asab-se.de
 */
'use strict';

const constants = require('./constants'),
    encodingConstants = constants.ENCODING;
module.exports.validate = {
    encoding: function(encoding) {
        if (Object.values(encodingConstants).indexOf(encoding) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
}