# Setup custom tool

<a href="https://github.com/Alex079/setup-custom-tool/actions?query=workflow%3ACI"><img src="https://github.com/Alex079/setup-custom-tool/workflows/CI/badge.svg" /></a>

This action can download, unpack, and add to PATH a tool of your choice.
The supported archive types are `.tar`, `.zip`, `.7z`, `.xar`.
The unpacked tool can be cached and reused.
Glob expression is used to find folders to add to PATH.
See [Toolkit](https://github.com/actions/toolkit) for more details about github toolkit.

## Usage

### Parameters

See [action.yml](action.yml) for parameters description.

### Example

```
name: My build
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  build:
    runs-on: ${{matrix.os}}
    strategy:
      matrix:
        os:
          - ubuntu-latest
          - windows-latest
          - macos-latest
    steps:
      - name: Checkout current repository
        uses: actions/checkout@v2
      - name: Deploy 'customTool'
        uses: Alex079/setup-custom-tool@v1
        with:
          archiveUrl: <direct download URL of 'customTool' archive>
          archiveGlob: '*/bin'
      - name: Run 'customTool' on current repository
        run: customTool -f ./
```
