/**
 * Created by Alex on 07.05.2018
 * mailto:alex@asab-se.de
 */
'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const exceptions = require('./exceptions');

const constants = require('./constants');
const optionsHandler = require('./optionsHandler');

class YamlReader {
    /**
     *
     * Synchronous read of a yaml file.
     *
     * @param {string} pathToYmlFile The path to the yaml file to retrieve.
     * @param {object} [options] An options object for further preferences of the file read.
     * @param {string} [options.encoding] The encoding of the file to read. Is utf8 by default.
     * @returns {*} The attributes of the yaml file.
     * @throws IllegalArgumentError, FileNotFoundError, InvalidFileExtensionError
     */
    read(pathToYmlFile, options) {
        if (!pathToYmlFile) {
            throw new exceptions.IllegalArgumentError(`path to yml file was empty!`);
        }
        let split = pathToYmlFile.split('.');
        if (split[split.length-1] === 'yml') {
            try {
                options = !options ? {} : options;
                options.encoding = options.encoding || constants.ENCODING.UTF_8;
                let encodingValid = optionsHandler.validate.encoding(options.encoding);
                if (encodingValid) {
                    return yaml.safeLoad(fs.readFileSync(pathToYmlFile, options.encoding));
                }
                else {
                    throw new exceptions.UnsupportedEncodingError(`encoding ${options.encoding} is not supported!`);
                }
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    throw new exceptions.FileNotFoundError(
                        `The yaml file could not be found! The path to the yaml file was: ${pathToYmlFile}`
                    );
                } else {
                    throw err;
                }
            }
        }
        else {
            throw new exceptions.InvalidFileExtensionError(`Provided file was not a .yml file! I got: ${pathToYmlFile}`);
        }
    }
    /**
     * Asynchronous read of a yaml file. Attributes will be returned by a Promise.
     *
     * @param {string} pathToYmlFile The path to the yaml file to retrieve.
     * @param {object} [options] An options object for further preferences of the file read.
     * @param {string} [options.encoding] The encoding of the file to read. Is utf8 by default.
     * @returns {Promise<any>} The attributes of the yaml file.
     * @throws IllegalArgumentError, FileNotFoundError, InvalidFileExtensionError
     */
    readAsync(pathToYmlFile, options, cb) {
        if (cb && typeof cb === 'function') {
            readAsyncWithCallback(pathToYmlFile, options, (err, data) => {
                return cb(err, data);
            })
        }
        else {
            return readAsyncWithPromise(pathToYmlFile, options);
        }
    }
}

const readAsyncWithCallback = function readAsyncWithCallback(pathToYmlFile, options, cb) {
    if (!pathToYmlFile) {
        return cb(new exceptions.IllegalArgumentError(`path to yml file was empty!`));
    }
    let split = pathToYmlFile.split('.');
    if (split[split.length-1] === 'yml') {
        options = !options ? {} : options;
        options.encoding = options.encoding || constants.ENCODING.UTF_8;
        let encodingValid = optionsHandler.validate.encoding(options.encoding);
        if (encodingValid) {
            yaml.safeLoad(fs.readFile(pathToYmlFile, options.encoding || constants.ENCODING.UTF_8, (err, ymlData) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        return cb(new exceptions.FileNotFoundError(
                            `The yaml file could not be found! The path to the yaml file was: ${pathToYmlFile}`
                        ));
                    } else {
                        return cb(err);
                    }
                }
                else {
                    return cb(null, ymlData);
                }
            }))
        }
        else {
            return cb(new exceptions.UnsupportedEncodingError(`encoding ${options.encoding} is not supported!`));
        }
    }
    else {
        return cb(new exceptions.InvalidFileExtensionError(`Provided file did not have a .yml extension! I got: ${pathToYmlFile}`));
    }
};

const readAsyncWithPromise = function readAsyncPromise(pathToYmlFile, options) {
    return new Promise((resolve, reject) => {
        if (!pathToYmlFile) {
            reject (new exceptions.IllegalArgumentError(`path to yml file was empty!`));
        }
        let split = pathToYmlFile.split('.');
        if (split[split.length-1] === 'yml') {
            options = !options ? {} : options;
            options.encoding = options.encoding || constants.ENCODING.UTF_8;
            let encodingValid = optionsHandler.validate.encoding(options.encoding);
            if (encodingValid) {
                return yaml.safeLoad(fs.readFile(pathToYmlFile, options.encoding || constants.ENCODING.UTF_8, (err, ymlData) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            reject (new exceptions.FileNotFoundError(
                                `The yaml file could not be found! The path to the yaml file was: ${pathToYmlFile}`
                            ));
                        } else {
                            reject (err);
                        }
                    }
                    else {
                        resolve (ymlData);
                    }
                }))
            }
            else {
                reject (new exceptions.UnsupportedEncodingError(`encoding ${options.encoding} is not supported!`));
            }
        }
        else {
            reject (new exceptions.InvalidFileExtensionError(`Provided file did not have a .yml extension! I got: ${pathToYmlFile}`));
        }
    })
}

const yamlReader = new YamlReader();

module.exports.read = yamlReader.read;
module.exports.readYaml = yamlReader.read;
module.exports.readAsync = yamlReader.readAsync;
module.exports.readYamlAsync = yamlReader.readAsync;

module.exports.constants = constants;
