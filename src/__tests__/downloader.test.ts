import * as d from '../downloader';
import * as tool from '@actions/tool-cache';
import * as glob from '@actions/glob';
import path from 'path';

jest
  .mock('@actions/tool-cache')
  .mock('@actions/glob');

const mockedTool = (tool as jest.Mocked<typeof tool>);
const mockedGlob = (glob as jest.Mocked<typeof glob>);

beforeEach(jest.resetAllMocks);

test('downloading zip with cache hit', async () => {
  mockedTool.find.mockImplementation(() => 'cached folder');

  const result = await d.materialize('URL.zip', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).not.toHaveBeenCalled();
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading zip with cache miss', async () => {
  mockedTool.find.mockImplementation(() => '');
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extractZip.mockImplementation(async () => 'tmp folder');
  mockedTool.cacheDir.mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.zip', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.zip');
  expect(tool.extractZip).toHaveBeenCalledWith('tmp file');
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '');
  expect(result).toBe('cached folder');
});

test('downloading zip without caching', async () => {
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extractZip.mockImplementation(async () => 'tmp folder');
  
  const result = await d.materialize('URL.zip', { name: '', version: '', arch: '' });

  expect(tool.find).not.toHaveBeenCalled();
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.zip');
  expect(tool.extractZip).toHaveBeenCalledWith('tmp file');
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('downloading tar.bz2 with cache hit', async () => {
  mockedTool.find.mockImplementation(() => 'cached folder');

  const result = await d.materialize('URL.zip', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).not.toHaveBeenCalled();
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading tar.bz2 with cache miss', async () => {
  mockedTool.find.mockImplementation(() => '');
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extractTar.mockImplementation(async () => 'tmp folder');
  mockedTool.cacheDir.mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.tar.bz2', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.tar.bz2');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).toHaveBeenCalledWith('tmp file', undefined, 'xj');
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '');
  expect(result).toBe('cached folder');
});

test('downloading tar.bz2 without caching', async () => {
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extractTar.mockImplementation(async () => 'tmp folder');
  
  const result = await d.materialize('URL.tar.bz2', { name: '', version: '', arch: '' });

  expect(tool.find).not.toHaveBeenCalled();
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.tar.bz2');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).toHaveBeenCalledWith('tmp file', undefined, 'xj');
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('downloading tar.gz with cache hit', async () => {
  mockedTool.find.mockImplementation(() => 'cached folder');

  const result = await d.materialize('URL.zip', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).not.toHaveBeenCalled();
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading tar.gz with cache miss', async () => {
  mockedTool.find.mockImplementation(() => '');
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extractTar.mockImplementation(async () => 'tmp folder');
  mockedTool.cacheDir.mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.tar.gz', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.tar.gz');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).toHaveBeenCalledWith('tmp file');
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '');
  expect(result).toBe('cached folder');
});

test('downloading tar.gz without caching', async () => {
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extractTar.mockImplementation(async () => 'tmp folder');
  
  const result = await d.materialize('URL.tar.gz', { name: '', version: '', arch: '' });

  expect(tool.find).not.toHaveBeenCalled();
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.tar.gz');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).toHaveBeenCalledWith('tmp file');
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('downloading 7z with cache hit', async () => {
  mockedTool.find.mockImplementation(() => 'cached folder');

  const result = await d.materialize('URL.7z', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).not.toHaveBeenCalled();
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading 7z with cache miss', async () => {
  mockedTool.find.mockImplementation(() => '');
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extract7z.mockImplementation(async () => 'tmp folder');
  mockedTool.cacheDir.mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.7z', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.7z');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).toHaveBeenCalledWith('tmp file');
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '');
  expect(result).toBe('cached folder');
});

test('downloading 7z without caching', async () => {
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extract7z.mockImplementation(async () => 'tmp folder');
  
  const result = await d.materialize('URL.7z', { name: '', version: '', arch: '' });

  expect(tool.find).not.toHaveBeenCalled();
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.7z');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).toHaveBeenCalledWith('tmp file');
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('downloading xar with cache hit', async () => {
  mockedTool.find.mockImplementation(() => 'cached folder');

  const result = await d.materialize('URL.xar', { name: 'tool', version: '1.1', arch: '' });

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', '');
  expect(tool.downloadTool).not.toHaveBeenCalled();
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading xar with cache miss', async () => {
  mockedTool.find.mockImplementation(() => '');
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extractXar.mockImplementation(async () => 'tmp folder');
  mockedTool.cacheDir.mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.xar', { name: 'tool', version: '1.1'});

  expect(tool.find).toHaveBeenCalledWith('tool', '1.1', undefined);
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.xar');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).toHaveBeenCalledWith('tmp file');
  expect(tool.cacheDir).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', undefined);
  expect(result).toBe('cached folder');
});

test('downloading xar without caching', async () => {
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  mockedTool.extractXar.mockImplementation(async () => 'tmp folder');
  
  const result = await d.materialize('URL.xar', {});

  expect(tool.find).not.toHaveBeenCalled();
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.xar');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).toHaveBeenCalledWith('tmp file');
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('failed extracting', async () => {
  mockedTool.downloadTool.mockImplementation(async () => 'tmp file');
  
  const result = await d.materialize('URL.archive', { name: 'tool', arch: 'arch' })
    .catch((error: Error) => expect(error?.message).toBe('Can not extract from URL.archive'));

  expect(tool.find).not.toHaveBeenCalled();
  expect(tool.downloadTool).toHaveBeenCalledWith('URL.archive');
  expect(tool.extractZip).not.toHaveBeenCalled();
  expect(tool.extractTar).not.toHaveBeenCalled();
  expect(tool.extract7z).not.toHaveBeenCalled();
  expect(tool.extractXar).not.toHaveBeenCalled();
  expect(tool.cacheDir).not.toHaveBeenCalled();
  expect(result).toBeUndefined();
});

test('globbing subfolder', async () => {
  const expected = path.join('root folder', 'subfolder', 'bin');
  mockedGlob.create.mockImplementation(async () =>
    ({ glob: async () => [expected], globGenerator: async function*() {}, getSearchPaths: () => [] }));

  const result = await d.findGlob(path.join('*', 'bin'))('root folder');

  expect(glob.create).toHaveBeenCalledWith(path.join('root folder', '*', 'bin'), { implicitDescendants: false });
  expect(result).toStrictEqual([expected]);
});

test('globbing root folder', async () => {
  mockedGlob.create.mockImplementation(async () =>
    ({ glob: async () => ['root folder'], globGenerator: async function*() {}, getSearchPaths: () => [] }));

  const result = await d.findGlob(undefined)('root folder');

  expect(glob.create).toHaveBeenCalledWith('root folder', { implicitDescendants: false });
  expect(result).toStrictEqual(['root folder']);
});
