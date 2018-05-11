/**
 * Created by Alex on 07.05.2018
 * mailto:alex@asab-se.de
 */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const yamlReader = require('../../lib/yamlReader');

const exceptions = require('../../lib/exceptions');

describe('on valid input', function () {
    describe('on synchronous read', function() {
        describe('without specified encoding', function() {
            it('should read the yaml file with utf-8 encoding', function() {
                const config = yamlReader.read('test/res/simple-config.yml');
                return expect(config).to.not.be.null;
            });
        });
        describe('with specified encoding', function() {
            it('should read the yaml file with utf-8 encoding', function() {
                const config = yamlReader.read('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.UTF_8});
                return expect(config).to.not.be.null;
            });
            it('should read the yaml file with utf-8 encoding', function() {
                const config = yamlReader.read('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.UTF_16_LE});
                return expect(config).to.not.be.null;
            });
            it('should read the yaml file with ascii encoding', function() {
                const config = yamlReader.read('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.ASCII});
                return expect(config).to.not.be.null;
            });
            it('should read the yaml file with base64 encoding', function() {
                const config = yamlReader.read('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.BASE_64});
                return expect(config).to.not.be.null;
            });
            it('should read the yaml file with binary encoding', function() {
                const config = yamlReader.read('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.BINARY});
                return expect(config).to.not.be.null;
            });
            it('should read the yaml file with hex encoding', function() {
                const config = yamlReader.read('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.HEX});
                return expect(config).to.not.be.null;
            });
            it('should read the yaml file with hex encoding', function() {
                const config = yamlReader.read('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.LATIN_1});
                return expect(config).to.not.be.null;
            });
        });
    });
    describe('on asynchronous read', function() {
        describe('without a callback', function() {
            describe('without specified encoding', function() {
                it('should return the yaml attributes with utf-8 encoding as a Promise.resolve after asynchronous read', () => {
                    return yamlReader.readAsync('test/res/simple-config.yml')
                        .then(function (config) {
                            return expect(config).to.not.be.null;
                        });
                });
            });
            describe('with specified encoding', function() {
                it('should return the yaml attributes with utf-8 encoding as a Promise.resolve after asynchronous read', () => {
                    return yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.UTF_8})
                        .then(function (config) {
                            return expect(config).to.not.be.null;
                        });
                });
                it('should return the yaml attributes with utf-16-le encoding as a Promise.resolve after asynchronous read', () => {
                    return yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.UTF_16_LE})
                        .then(function (config) {
                            return expect(config).to.not.be.null;
                        });
                });
                it('should return the yaml attributes with base64 encoding as a Promise.resolve after asynchronous read', () => {
                    return yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.BASE_64})
                        .then(function (config) {
                            return expect(config).to.not.be.null;
                        });
                });
                it('should return the yaml attributes with binary encoding as a Promise.resolve after asynchronous read', () => {
                    return yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.BINARY})
                        .then(function (config) {
                            return expect(config).to.not.be.null;
                        });
                });
                it('should return the yaml attributes with hex encoding as a Promise.resolve after asynchronous read', () => {
                    return yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.HEX})
                        .then(function (config) {
                            return expect(config).to.not.be.null;
                        });
                });
                it('should return the yaml attributes with latin-1 encoding as a Promise.resolve after asynchronous read', () => {
                    return yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.LATIN_1})
                        .then(function (config) {
                            return expect(config).to.not.be.null;
                        });
                });
            })
        });

        describe('with callback', function() {
            describe('without specified encoding', function() {
                it('should return the yaml attributes with utf-8 encoding as a Promise.resolve after asynchronous read', (done) => {
                    yamlReader.readAsync('test/res/simple-config.yml', {test: 'test'}, (err, data) => {
                        expect(data).to.not.be.null;
                        done();
                    })
                });
            });
            describe('with specified encoding', function() {
                it('should return the yaml attributes with utf-8 encoding as a Promise.resolve after asynchronous read', (done) => {
                    yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.UTF_8}, (err, data) => {
                        expect(data).to.not.be.null;
                        done();
                    })
                });
                it('should return the yaml attributes with utf-16-le encoding as a Promise.resolve after asynchronous read', (done) => {
                    yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.UTF_8}, (err, data) => {
                        expect(data).to.not.be.null;
                        done();
                    })
                });
                it('should return the yaml attributes with base64 encoding as a Promise.resolve after asynchronous read', (done) => {
                    yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.BASE_64}, (err, data) => {
                        expect(data).to.not.be.null;
                        done();
                    })
                });
                it('should return the yaml attributes with binary encoding as a Promise.resolve after asynchronous read', (done) => {
                    yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.BINARY}, (err, data) => {
                        expect(data).to.not.be.null;
                        done();
                    })
                });
                it('should return the yaml attributes with hex encoding as a Promise.resolve after asynchronous read', (done) => {
                    yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.HEX}, (err, data) => {
                        expect(data).to.not.be.null;
                        done();
                    })
                });
                it('should return the yaml attributes with latin-1 encoding as a Promise.resolve after asynchronous read', (done) => {
                    yamlReader.readAsync('test/res/simple-config.yml', {encoding: yamlReader.constants.ENCODING.LATIN_1}, (err, data) => {
                        expect(data).to.not.be.null;
                        done();
                    })
                });
            });
        });
    });

});

describe('on invalid input', function() {
    describe('when reading sync', function() {
        it('should throw an IllegalArgumentError if invoked with null path', function() {
            return expect(() => {
                yamlReader.read();
            }).to.throw(exceptions.IllegalArgumentError);
        });
        it('should throw an InvalidFileExtensionError if not a yaml file', function() {
            return expect(() => {
                yamlReader.read('test.txt');
            }).to.throw(exceptions.InvalidFileExtensionError);
        });
        it('should throw an InvalidFileExtensionError if not a yaml file', function() {
            return expect(() => {
                yamlReader.read('test/res/test.yml');
            }).to.throw(exceptions.FileNotFoundError);
        });
        describe('with a wrong encoding', function() {
            it('should throw an UnsupportedEncodingError', function() {
                return expect(() => {
                    yamlReader.read('test/res/simple-config.yml', {encoding: 'unsupported'});
                }).to.throw(exceptions.UnsupportedEncodingError);
            });
        });
    });
    describe('when reading async', function() {
        it('should reject with an IllegalArgumentError if invoked with null path', function() {
            return expect(yamlReader.readAsync()).to.be.rejectedWith(exceptions.IllegalArgumentError);
        });
        it('should reject with an IllegalArgumentError if invoked with null path', function() {
            return expect(yamlReader.readAsync('test.txt')).to.be.rejectedWith(exceptions.InvalidFileExtensionError);
        });
        it('should reject with an IllegalArgumentError if invoked with null path', function() {
            return expect(yamlReader.readAsync('test/res/test.yml')).to.be.rejectedWith(exceptions.FileNotFoundError);
        });
        describe('with a wrong encoding', function() {
            it('should throw an UnsupportedEncodingError', function() {
                return expect(yamlReader.readAsync('test/res/simple-config.yml', {encoding: 'unsupported'})
                ).to.be.rejectedWith(exceptions.UnsupportedEncodingError);
            });
        });
    });
});
