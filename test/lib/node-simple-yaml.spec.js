/**
 * Created by Alex on 07.05.2018
 * mailto:alex@asab-se.de
 */

const chai = require('chai');
const expect = chai.expect;

const simpleYaml = require('../../lib/node-simple-yaml');

describe('on valid input', function() {
    it('should return the parsed config file', () => {
        const config = simpleYaml.readYaml('test/res/simple-config.yml');
        return expect(config).to.not.be.null;
    });
});