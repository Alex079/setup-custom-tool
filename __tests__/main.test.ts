import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('test all parameters', () => {
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: {
      ...process.env,
      INPUT_ARCHIVEURL: 'https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip',
      INPUT_ARCHIVEGLOB: '*',
      INPUT_TOOLNAME: 'example',
      INPUT_TOOLVERSION: '2017.2.2',
      INPUT_TOOLARCH: 'none'
    }
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
  console.log(cp.execSync(`node ${ip}`, options).toString())
})

test('test required parameters', () => {
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: {
      ...process.env,
      INPUT_ARCHIVEURL: 'https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip'
    }
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
