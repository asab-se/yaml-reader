/**
 * Created by Alex on 07.05.2018
 * mailto:alex@asa-se.de
 */
'use strict';
const yaml = require('js-yaml');
const fs = require('fs');
const exceptions = require('./exceptions');

class YamlParser {
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
    readYaml(pathToYmlFile, options) {
        if (!pathToYmlFile) {
            throw new exceptions.IllegalArgumentError(`path to yml file was empty!`);
        }
        let split = pathToYmlFile.split('.');
        if (split[split.length-1] === 'yml') {
            try {
                options = !options ? {} : options;
                return yaml.safeLoad(fs.readFileSync(pathToYmlFile, options.encoding || 'utf8'));
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
    readYamlAsync(pathToYmlFile, options) {
        return new Promise((resolve, reject) => {
            if (!pathToYmlFile) {
                reject (new exceptions.IllegalArgumentError(`path to yml file was empty!`));
            }
            let split = pathToYmlFile.split('.');
            if (split[split.length-1] === 'yml') {
                options = !options ? {} : options;
                return yaml.safeLoad(fs.readFile(pathToYmlFile, options.encoding || 'utf8', (err, ymlData) => {
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
                reject (new exceptions.InvalidFileExtensionError(`Provided file did not have a .yml extension! I got: ${pathToYmlFile}`));
            }
        })

    }
}

const yamlParser = new YamlParser();

module.exports.readYaml = yamlParser.readYaml;
module.exports.readYamlAsync = yamlParser.readYamlAsync;