import * as process from 'node:process'
import * as path from 'node:path'
import { rmSync } from 'node:fs'
import { execSync } from 'node:child_process'

const { fileURLToPath } = await import('node:url')

const cmd = path.join(
  fileURLToPath(new URL('..', import.meta.url)),
  'src',
  'index.js'
)
const target = path.join(
  fileURLToPath(new URL('..', import.meta.url)),
  'target'
)
const testEnv = {
  ...process.env,
  RUNNER_TEMP: target,
  RUNNER_TOOL_CACHE: target
}

afterAll(() => {
  rmSync(target, { recursive: true })
})

function runner(name, env) {
  console.log(name)
  console.log(execSync(`node ${cmd}`, { env }).toString())
}

test('runs with all parameters', () => {
  const env = {
    ...testEnv,
    INPUT_ARCHIVEURL:
      'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.tar.gz',
    INPUT_ARCHIVEGLOB: '*',
    INPUT_TOOLNAME: 'example',
    INPUT_TOOLVERSION: '2017.2.2',
    INPUT_TOOLARCH: 'none'
  }
  runner('First run - download', env)
  runner('Second run - get from cache', env)
  expect(cmd).toMatch(/index\.js$/)
})

test('runs with required parameters', () => {
  runner('Download zip', {
    ...testEnv,
    INPUT_ARCHIVEURL:
      'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.zip'
  })
  runner('Download tar.bz', {
    ...testEnv,
    INPUT_ARCHIVEURL:
      'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.tar.bz'
  })
  runner('Download tar.bz2', {
    ...testEnv,
    INPUT_ARCHIVEURL:
      'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.tar.bz2'
  })
  expect(cmd).toMatch(/index\.js$/)
})
