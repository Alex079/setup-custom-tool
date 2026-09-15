import { jest } from '@jest/globals'
import * as path from 'node:path'

// Build mock objects and register them as mocks for the modules the module
// under test imports. The mock objects must be declared before the module is
// dynamically imported so the mocks are used in place of the real modules.
const tool = {
  find: jest.fn(),
  downloadTool: jest.fn(),
  extractZip: jest.fn(),
  extractTar: jest.fn(),
  extract7z: jest.fn(),
  extractXar: jest.fn(),
  cacheDir: jest.fn()
}
const glob = {
  create: jest.fn()
}

jest.unstable_mockModule('@actions/tool-cache', () => tool)
jest.unstable_mockModule('@actions/glob', () => glob)

beforeEach(() => {
  jest.resetAllMocks()
})

let d

beforeAll(async () => {
  d = await import('../src/downloader.js')
})

test('downloading zip with cache hit', async () => {
  tool.find.mockImplementation(() => 'cached folder')

  const result = await d.materialize('URL.zip', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).not.toHaveBeenCalled()
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('cached folder')
})

test('downloading zip with cache miss', async () => {
  tool.find.mockImplementation(() => '')
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extractZip.mockImplementation(async () => 'tmp folder')
  tool.cacheDir.mockImplementation(async () => 'cached folder')

  const result = await d.materialize('URL.zip', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.zip')
  expect(tool.extractZip).toHaveBeenCalledWith('tmp file')
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '')
  expect(result).toBe('cached folder')
})

test('downloading zip without caching', async () => {
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extractZip.mockImplementation(async () => 'tmp folder')

  const result = await d.materialize('URL.zip', {
    name: '',
    version: '',
    arch: ''
  })

  expect(tool.find).not.toHaveBeenCalled()
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.zip')
  expect(tool.extractZip).toHaveBeenCalledWith('tmp file')
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('tmp folder')
})

test('downloading tar.bz2 with cache hit', async () => {
  tool.find.mockImplementation(() => 'cached folder')

  const result = await d.materialize('URL.zip', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).not.toHaveBeenCalled()
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('cached folder')
})

test('downloading tar.bz2 with cache miss', async () => {
  tool.find.mockImplementation(() => '')
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extractTar.mockImplementation(async () => 'tmp folder')
  tool.cacheDir.mockImplementation(async () => 'cached folder')

  const result = await d.materialize('URL.tar.bz2', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.tar.bz2')
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).toHaveBeenCalledWith('tmp file', undefined, 'x')
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '')
  expect(result).toBe('cached folder')
})

test('downloading tar.bz2 without caching', async () => {
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extractTar.mockImplementation(async () => 'tmp folder')

  const result = await d.materialize('URL.tar.bz2', {
    name: '',
    version: '',
    arch: ''
  })

  expect(tool.find).not.toHaveBeenCalled()
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.tar.bz2')
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).toHaveBeenCalledWith('tmp file', undefined, 'x')
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('tmp folder')
})

test('downloading tar.gz with cache hit', async () => {
  tool.find.mockImplementation(() => 'cached folder')

  const result = await d.materialize('URL.zip', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).not.toHaveBeenCalled()
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('cached folder')
})

test('downloading tar.gz with cache miss', async () => {
  tool.find.mockImplementation(() => '')
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extractTar.mockImplementation(async () => 'tmp folder')
  tool.cacheDir.mockImplementation(async () => 'cached folder')

  const result = await d.materialize('URL.tar.gz', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.tar.gz')
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).toHaveBeenCalledWith('tmp file', undefined, 'x')
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '')
  expect(result).toBe('cached folder')
})

test('downloading tar.gz without caching', async () => {
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extractTar.mockImplementation(async () => 'tmp folder')

  const result = await d.materialize('URL.tar.gz', {
    name: '',
    version: '',
    arch: ''
  })

  expect(tool.find).not.toHaveBeenCalled()
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.tar.gz')
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).toHaveBeenCalledWith('tmp file', undefined, 'x')
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('tmp folder')
})

test('downloading 7z with cache hit', async () => {
  tool.find.mockImplementation(() => 'cached folder')

  const result = await d.materialize('URL.7z', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).not.toHaveBeenCalled()
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('cached folder')
})

test('downloading 7z with cache miss', async () => {
  tool.find.mockImplementation(() => '')
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extract7z.mockImplementation(async () => 'tmp folder')
  tool.cacheDir.mockImplementation(async () => 'cached folder')

  const result = await d.materialize('URL.7z', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.7z')
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).toHaveBeenCalledWith('tmp file')
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '')
  expect(result).toBe('cached folder')
})

test('downloading 7z without caching', async () => {
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extract7z.mockImplementation(async () => 'tmp folder')

  const result = await d.materialize('URL.7z', {
    name: '',
    version: '',
    arch: ''
  })

  expect(tool.find).not.toHaveBeenCalled()
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.7z')
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).toHaveBeenCalledWith('tmp file')
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('tmp folder')
})

test('downloading xar with cache hit', async () => {
  tool.find.mockImplementation(() => 'cached folder')

  const result = await d.materialize('URL.xar', {
    name: 'tool',
    version: '1.1',
    arch: ''
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '')
  expect(tool.downloadTool).not.toHaveBeenCalled()
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('cached folder')
})

test('downloading xar with cache miss', async () => {
  tool.find.mockImplementation(() => '')
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extractXar.mockImplementation(async () => 'tmp folder')
  tool.cacheDir.mockImplementation(async () => 'cached folder')

  const result = await d.materialize('URL.xar', {
    name: 'tool',
    version: '1.1'
  })

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', undefined)
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.xar')
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).toHaveBeenCalledWith('tmp file')
  expect(tool.cacheDir).toHaveBeenCalledWith(
    'tmp folder',
    'tool',
    '1.1',
    undefined
  )
  expect(result).toBe('cached folder')
})

test('downloading xar without caching', async () => {
  tool.downloadTool.mockImplementation(async () => 'tmp file')
  tool.extractXar.mockImplementation(async () => 'tmp folder')

  const result = await d.materialize('URL.xar', {})

  expect(tool.find).not.toHaveBeenCalled()
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.xar')
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).toHaveBeenCalledWith('tmp file')
  expect(tool.cacheDir).not.toHaveBeenCalled()
  expect(result).toBe('tmp folder')
})

test('failed extracting', async () => {
  let caughtError
  try {
    await d.materialize('URL.archive', { name: 'tool', arch: 'arch' })
  } catch (error) {
    caughtError = error
  }

  expect(caughtError).toBeInstanceOf(Error)
  expect(caughtError.message).toBe('Can not extract from URL.archive')
  expect(tool.find).not.toHaveBeenCalled()
  expect(tool.downloadTool).not.toHaveBeenCalled()
  expect(tool.extractZip).not.toHaveBeenCalled()
  expect(tool.extractTar).not.toHaveBeenCalled()
  expect(tool.extract7z).not.toHaveBeenCalled()
  expect(tool.extractXar).not.toHaveBeenCalled()
  expect(tool.cacheDir).not.toHaveBeenCalled()
})

test('globbing subfolder', async () => {
  const expected = path.join('root folder', 'subfolder', 'bin')
  glob.create.mockImplementation(async () => ({
    glob: async () => [expected],
    globGenerator: async function* () {},
    getSearchPaths: () => []
  }))

  const result = await d.findGlob(path.join('*', 'bin'))('root folder')

  expect(glob.create).toHaveBeenCalledWith(
    path.join('root folder', '*', 'bin'),
    { implicitDescendants: false }
  )
  expect(result).toStrictEqual([expected])
})

test('globbing root folder', async () => {
  glob.create.mockImplementation(async () => ({
    glob: async () => ['root folder'],
    globGenerator: async function* () {},
    getSearchPaths: () => []
  }))

  const result = await d.findGlob(undefined)('root folder')

  expect(glob.create).toHaveBeenCalledWith('root folder', {
    implicitDescendants: false
  })
  expect(result).toStrictEqual(['root folder'])
})
