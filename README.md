# YAML Reader

This is a lightweight reader of yaml files. It's only purpose is to read
yaml files to use its attributes in a node app. Therefore it keeps simple
and its dependencies low.

The asynchronous read provides promise based and callback based support, thus 
you can choose the style you like better.

## Notes

yaml-reader is written in ECMA 6 (Node version 8.11.1). Be sure your node version can handle
this or use babel for older node versions. No guarantee that everything works fine when using babel.

## Installation

```
npm install --save yaml-reader
```

<br/>

## Usage

yaml-reader resolves the path from your project root onwards, e.g. having the following project structure
you call `yamlReader.read('configs/app-config.yml')` wherever you want to read the yaml file. So this will
work in bot `bin/app.js` and `lib/some-module-someService.js` in this example.   
```
+-- package.json
+-- README.md
+-- bin
+---- app.js
+-- lib
+---- some-module
+------ someService.js
+---- ...
+-- configs
+---- app-config.yml
```

<br/>

#### Synchronous read

Read a yaml file synchronously. This is like requiring a json config file via `require()`:

```
const config = require('yaml-reader').read('path/to/yml.yml');
```

<br/>

#### Asynchronous read

You can also read a yaml asynchronously. The result will be returned as a `Promise` or, if
a callback function is provided, with a callback.

##### Promise based:
```
const yamlReader = require('yaml-reader');

yamlReader.readAsync('path/to/yml.yml')
.then((config) => {
    ...
})
.catch((err) => {
    ...
})
```

##### Callback based:
```
const yamlReader = require('yaml-reader');

// without options, thus null as 2nd arg
yamlReader.readAsync('path/to/yml.yml', null, (err, config) => {
    if (err) {
        ...
    }
    else {
        ...
    }
})
```

In all cases you can pass in the encoding of the file with an option object. If this is not passed, *utf8* will be used by default.

```
const options = {
    encoding: yamlReader.constants.ENCODING.UTF_16_LE
};
const config = require('yaml-reader').read('path/to/yml.yml', options);

// or async

yamlReader.readAsync('path/to/yml.yml', options, (err, config) => {
    ...
}

yamlReader.readAsync('path/to/yml.yml', options)
.then((config) => {
    ...
})
```

<br/>

## API

#### yamlReader.read(file [, options])
#### yamlReader.readYaml(file [, options])

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

#### yamlReader.readAsync(file [, options, callback])
#### yamlReader.readYamlAsync(file [, options, callback])

Read a yaml file _asynchronously_. The yaml attributes will be returned with a Promise.

- __file__ _\<string>_ : The path to the yaml file to read
- __options__ _<Object | null>_ : Options parsed to the reader
    - __options.encoding__ _<string | null>_: The encoding of the yaml file. Is 'utf-8' by default.
    You can use `yaml-reader.constants.ENCODING` for supported encodings.
- __callback__ _<function | null>_ : An optional callback. If this is null the reader assumes you use Promises instead.
    So take care to use the promise syntax if you do not provide a callback.

The config is either returned as a _Promise\<Object>.resolve_ if the file was readable or rejected otherwise, or with
the callback if invoked with a callback.

```
const yamlReader = require('yaml-reader');
const options = { ... }
//
// awaiting promises
//

yamlReader.readAsync('path/to/yml.yml', options)
.then((config) => {
    // access properties of your yaml
    // console.log(config.myProperty)
})
.catch((err) => {
    // handle errors (like FileNotFoundError)
})

//
// or with callback
//

yamlReader.readAsync('path/to/yml.yml', options, (err, config) => {
    ...
}
```
