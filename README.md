# Setup custom tool

![build](https://github.com/Alex079/setup-custom-tool/workflows/build/badge.svg) ![test](https://github.com/Alex079/setup-custom-tool/workflows/test/badge.svg)

<a href="https://github.com/Alex079/setup-custom-tool/actions?query=workflow%3Abuild"><img src="https://github.com/Alex079/setup-custom-tool/workflows/build/badge.svg" /></a>
<a href="https://github.com/Alex079/setup-custom-tool/actions?query=workflow%3Atest"><img src="https://github.com/Alex079/setup-custom-tool/workflows/test/badge.svg" /></a>

This action can download, unpack, and add to PATH a tool of your choice.
The supported archive types are `.tgz`, `.tar.gz`, `.zip`, `.7z`.
The unpacked tool can be cached and reused.
Glob expression is used to find folders to add to PATH.
See [Toolkit](https://github.com/actions/toolkit) for more details about github toolkit.

## Usage

### Parameters

See [action.yml](action.yml) for parameters description.

### Example

See [test.yml](.github/workflows/test.yml) for a workflow example.

## Coding

### Install the dependencies  
```
$ npm install
```

### Run build
```
$ npm run build
```

### Run test
```
$ npm run test
```

### Run all
```
$ npm run all
```
