/**
 * Unit tests for src/main.js
 *
 * The core module is mocked via a fixture so the real '@actions/core' module is
 * not imported. The downloader module is mocked with mock objects, like in the
 * downloader tests, so no real downloads happen during these tests.
 */
import { jest } from '@jest/globals'

const core = {
  getInput: jest.fn(),
  addPath: jest.fn(),
  setFailed: jest.fn(),
  debug: jest.fn()
}

const downloader = {
  materialize: jest.fn(),
  findGlob: jest.fn()
}

jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('../src/downloader.js', () => downloader)

let r

beforeEach(() => {
  jest.resetAllMocks()
})

beforeAll(async () => {
  r = await import('../src/main.js')
})

const inputValues = {
  archiveUrl: 'https://example.com/tool.tar.gz',
  archiveGlob: '*/bin',
  toolName: 'tool',
  toolVersion: '1.1',
  toolArch: 'none'
}

function mockInputs(values) {
  core.getInput.mockImplementation((name, options) => {
    if (options && options.required && !values[name]) {
      throw new Error(`Input required and not supplied: ${name}`)
    }
    return values[name]
  })
}

test('run materializes, globs, and adds found paths to PATH', async () => {
  mockInputs(inputValues)
  downloader.materialize.mockImplementation(async () => 'extracted folder')
  downloader.findGlob.mockImplementation((expression) => async (folder) => {
    expect(expression).toBe('*/bin')
    expect(folder).toBe('extracted folder')
    return ['extracted folder/bin']
  })

  await r.run()

  expect(downloader.materialize).toHaveBeenCalledWith(
    'https://example.com/tool.tar.gz',
    {
      name: 'tool',
      version: '1.1',
      arch: 'none'
    }
  )
  expect(downloader.findGlob).toHaveBeenCalledWith('*/bin')
  expect(core.addPath).toHaveBeenCalledWith('extracted folder/bin')
  expect(core.setFailed).not.toHaveBeenCalled()
})

test('run reports failure when the required input is missing', async () => {
  mockInputs({ ...inputValues, archiveUrl: '' })

  await r.run()

  expect(downloader.materialize).not.toHaveBeenCalled()
  expect(core.setFailed).toHaveBeenCalledWith(
    new Error('Input required and not supplied: archiveUrl')
  )
})

test('run reports failure when materializing rejects', async () => {
  mockInputs({
    ...inputValues,
    archiveGlob: '',
    toolName: '',
    toolVersion: '',
    toolArch: ''
  })
  downloader.materialize.mockImplementation(async () => {
    throw new Error('boom')
  })

  await r.run()

  expect(core.setFailed).toHaveBeenCalledWith(new Error('boom'))
})

test('run reports failure on an unexpected error', async () => {
  core.getInput.mockImplementation(() => {
    throw new TypeError('bad input')
  })

  await r.run()

  expect(core.setFailed).toHaveBeenCalledWith(new TypeError('bad input'))
})
