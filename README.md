# YAML Reader

This is a lightweight reader of yaml files. It's only purpose is to read
yaml files to use its attributes in a node app. Therefore it keeps simple
and its dependencies low.


## Installation

```
npm install --save yaml-reader
```

<br/>

## Usage

Read a yaml file synchronously. This is like requiring a json config file via `require()`:

```
const config = require('yaml-reader').read('path/to/yml.yml');
```

You can also read a yaml asynchronously. The result will be returned as a `Promise`.

```
const yamlReader = require('yaml-reader');

yamlReader.readAsync('path/to/yml.yml')
.then((config) => {
    // access properties of your yaml
    // console.log(config.myProperty)
})
.catch((err) => {
    // handle errors (like FileNotFoundError)
})
```

In both cases you can pass in the encoding of the file with an option object. If this is not passed, *utf8* will be used by default.

```
const options = {
    encoding: yamlReader.constants.ENCODING.UTF_16_LE
};
const config = require('yaml-reader').read('path/to/yml.yml', options);

// or async

yamlReader.readAsync('path/to/yml.yml', options)
.then((config) => {
    // access properties of your yaml
    // console.log(config.myProperty)
})
.catch((err) => {
    // handle errors (like FileNotFoundError)
})
```

<br/>

## API

#### yaml.read(file [, options])
#### yaml.readYaml(file [, options])

Read a yaml file _synchronously_ .

- __file__ _\<string>_ : The path to the yaml file to read
- __options__ _<Object | null>_ : Options parsed to the reader
    - __options.encoding__ _<string | null>_: The encoding of the yaml file. Is 'utf-8' by default.
    You can use `yaml-reader.constants.ENCODING` for supported encodings.

```
const config = require('yaml-reader').read('path/to/yml.yml');
```

Or with encoding specified:

```
const options = {
    encoding: yamlReader.constants.ENCODING.UTF_8
};
const config = require('yaml-reader').read('path/to/yml.yml', options);
```

<hr/>

#### yaml.readAsync(file [, options])
#### yaml.readYamlAsync(file [, options])

Read a yaml file _asynchronously_. The yaml attributes will be returned with a Promise.

- __file__ _\<string>_ : The path to the yaml file to read
- __options__ _<Object | null>_ : Options parsed to the reader
    - __options.encoding__ _<string | null>_: The encoding of the yaml file. Is 'utf-8' by default.
    You can use `yaml-reader.constants.ENCODING` for supported encodings.

The config is returned as a _Promise\<Object>.resolve_ if the file was readable or rejected otherwise.

```
const yamlReader = require('yaml-reader');

yamlReader.readAsync('path/to/yml.yml')
.then((config) => {
    // access properties of your yaml
    // console.log(config.myProperty)
})
.catch((err) => {
    // handle errors (like FileNotFoundError)
})
```
