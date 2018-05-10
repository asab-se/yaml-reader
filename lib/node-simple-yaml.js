/**
 * Created by Alex on 07.05.2018
 * mailto:asabau@bitsolve.de
 */
'use strict';
const yaml = require('js-yaml');
const fs = require('fs');
const exceptions = require('./exceptions'),
      FileNotFoundError = exceptions.FileNotFoundError,
      InvalidFileExtensionError = exceptions.InvalidFileExtensionError;

class YamlParser {
    readYaml(pathToYmlFile) {
        let split = pathToYmlFile.split('.');
        if (split[split.length-1] === 'yml') {
            try {
                return yaml.safeLoad(fs.readFileSync(pathToYmlFile, 'utf8'));
            }
            catch (e) {
                throw new FileNotFoundError(`yml file could not be found in given path: ${pathToYmlFile}`);
            }
        }
        else {
            throw new InvalidFileExtensionError(`Provided file did not have a .yml extension! I got: ${pathToYmlFile}`);
        }
    }
}

const yamlParser = new YamlParser();

/**
 *
 * @param {string} pathToYmlFile The path to the yml file which shall be parsed.
 * @returns {object}
 * @throws FileNotFoundError, InvalidFileExtensionError
 */
module.exports= yamlParser;