/**
 * Created by Alex on 07.05.2018
 * mailto:alex@asab-se.de
 */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const simpleYaml = require('../../lib/yamlReader');

const exceptions = require('../../lib/exceptions');

describe('on valid input', function () {
    it('should return the yaml attributes after synchronous read', () => {
        const config = simpleYaml.readYaml('test/res/simple-config.yml');
        return expect(config).to.not.be.null;
    });
    it('should return the yaml attributes as a Promise.resolve after asynchronous read', () => {
        return simpleYaml.readYamlAsync('test/res/simple-config.yml')
            .then(function (config) {
                return expect(config).to.not.be.null;
            });
    });
});

describe('on invalid input', function() {
    describe('when reading sync', function() {
        it('should throw an IllegalArgumentError if invoked with null path', function() {
            return expect(() => {
                simpleYaml.readYaml();
            }).to.throw(exceptions.IllegalArgumentError);
        });
        it('should throw an InvalidFileExtensionError if not a yaml file', function() {
            return expect(() => {
                simpleYaml.readYaml('test.txt');
            }).to.throw(exceptions.InvalidFileExtensionError);
        });
        it('should throw an InvalidFileExtensionError if not a yaml file', function() {
            return expect(() => {
                simpleYaml.readYaml('test/res/test.yml');
            }).to.throw(exceptions.FileNotFoundError);
        });
    });
    describe('when reading async', function() {
        it('should reject with an IllegalArgumentError if invoked with null path', function() {
            return expect(simpleYaml.readYamlAsync()).to.be.rejectedWith(exceptions.IllegalArgumentError);
        });
        it('should reject with an IllegalArgumentError if invoked with null path', function() {
            return expect(simpleYaml.readYamlAsync('test.txt')).to.be.rejectedWith(exceptions.InvalidFileExtensionError);
        });
        it('should reject with an IllegalArgumentError if invoked with null path', function() {
            return expect(simpleYaml.readYamlAsync('test/res/test.yml')).to.be.rejectedWith(exceptions.FileNotFoundError);
        });
    });
});
