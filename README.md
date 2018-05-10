# Installation

```
npm install --save yaml-reader
```


# Usage

```
const config = require('yaml-reader').readYaml('path/to/yml.yml');
```

or if read asynchronously:

```
const yamlReader = require('yaml-reader');

yamlReader.readYamlAsync('path/to/yml.yml')
.then((config) => {
    // access properties of your yaml
})
```
