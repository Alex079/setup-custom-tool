// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const config = {
  input: 'src/index.js',
  output: {
    esModule: true,
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    // Transform guarded `require()` calls (e.g. minimatch's `try { require('path') } catch {}`).
    // By default the commonjs plugin leaves these untouched, which leaves `require` undefined
    // in the ESM bundle and silently swallows the resulting ReferenceError.
    commonjs({ ignoreTryCatch: false }),
    nodeResolve({ preferBuiltins: true })
  ]
}

export default config
