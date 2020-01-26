import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('test runs', () => {
  process.env['INPUT_TOOLURL'] =
    'https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip'
  process.env['INPUT_ARCHIVEGLOB'] = '*'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
