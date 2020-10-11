import * as d from '../downloader';
import * as tool from '@actions/tool-cache';
import * as glob from '@actions/glob';

test('downloading zip with cache hit', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation(() => 'cached folder');
  const download = jest.spyOn(tool, 'downloadTool');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir');

  const result = await d.materialize('URL.zip', { name: 'tool', version: '1.1', arch: '' });

  expect(findInCache).toHaveBeenCalledTimes(1);
  expect(findInCache).toHaveBeenCalledWith('tool', '1.1', '');
  expect(download).not.toHaveBeenCalled();
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).not.toHaveBeenCalled();
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading zip with cache miss', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation();
  const download = jest.spyOn(tool, 'downloadTool').mockImplementation(async () => 'tmp file');
  const extractZip = jest.spyOn(tool, 'extractZip').mockImplementation(async () => 'tmp folder');
  const extractTar = jest.spyOn(tool, 'extractTar');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir').mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.zip', { name: 'tool', version: '1.1', arch: '' });

  expect(findInCache).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledWith('URL.zip');
  expect(extractZip).toHaveBeenCalledTimes(1);
  expect(extractZip).toHaveBeenCalledWith('tmp file');
  expect(extractTar).not.toHaveBeenCalled();
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).toHaveBeenCalledTimes(1);
  expect(putInCache).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '');
  expect(result).toBe('cached folder');
});

test('downloading zip without caching', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation();
  const download = jest.spyOn(tool, 'downloadTool').mockImplementation(async () => 'tmp file');
  const extractZip = jest.spyOn(tool, 'extractZip').mockImplementation(async () => 'tmp folder');
  const extractTar = jest.spyOn(tool, 'extractTar');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir');

  const result = await d.materialize('URL.zip', { name: '', version: '', arch: '' });

  expect(findInCache).not.toHaveBeenCalled();
  expect(download).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledWith('URL.zip');
  expect(extractZip).toHaveBeenCalledTimes(1);
  expect(extractZip).toHaveBeenCalledWith('tmp file');
  expect(extractTar).not.toHaveBeenCalled();
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('downloading tar.bz2 with cache hit', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation(() => 'cached folder');
  const download = jest.spyOn(tool, 'downloadTool');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir');

  const result = await d.materialize('URL.tar.bz2', { name: 'tool', version: '1.1', arch: '' });

  expect(findInCache).toHaveBeenCalledTimes(1);
  expect(findInCache).toHaveBeenCalledWith('tool', '1.1', '');
  expect(download).not.toHaveBeenCalled();
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).not.toHaveBeenCalled();
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading tar.bz2 with cache miss', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation();
  const download = jest.spyOn(tool, 'downloadTool').mockImplementation(async () => 'tmp file');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar').mockImplementation(async () => 'tmp folder');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir').mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.tar.bz2', { name: 'tool', version: '1.1', arch: '' });

  expect(findInCache).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledWith('URL.tar.bz2');
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).toHaveBeenCalledTimes(1);
  expect(extractTar).toHaveBeenCalledWith('tmp file', undefined, 'xj');
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).toHaveBeenCalledTimes(1);
  expect(putInCache).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '');
  expect(result).toBe('cached folder');
});

test('downloading tar.bz2 without caching', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation();
  const download = jest.spyOn(tool, 'downloadTool').mockImplementation(async () => 'tmp file');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar').mockImplementation(async () => 'tmp folder');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir');

  const result = await d.materialize('URL.tar.bz2', { name: '', version: '', arch: '' });

  expect(findInCache).not.toHaveBeenCalled();
  expect(download).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledWith('URL.tar.bz2');
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).toHaveBeenCalledTimes(1);
  expect(extractTar).toHaveBeenCalledWith('tmp file', undefined, 'xj');
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('downloading tar.gz with cache hit', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation(() => 'cached folder');
  const download = jest.spyOn(tool, 'downloadTool');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir');

  const result = await d.materialize('URL.tar.gz', { name: 'tool', version: '1.1', arch: '' });

  expect(findInCache).toHaveBeenCalledTimes(1);
  expect(findInCache).toHaveBeenCalledWith('tool', '1.1', '');
  expect(download).not.toHaveBeenCalled();
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).not.toHaveBeenCalled();
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading tar.gz with cache miss', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation();
  const download = jest.spyOn(tool, 'downloadTool').mockImplementation(async () => 'tmp file');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar').mockImplementation(async () => 'tmp folder');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir').mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.tar.gz', { name: 'tool', version: '1.1', arch: '' });

  expect(findInCache).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledWith('URL.tar.gz');
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).toHaveBeenCalledTimes(1);
  expect(extractTar).toHaveBeenCalledWith('tmp file');
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).toHaveBeenCalledTimes(1);
  expect(putInCache).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '');
  expect(result).toBe('cached folder');
});

test('downloading tar.gz without caching', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation();
  const download = jest.spyOn(tool, 'downloadTool').mockImplementation(async () => 'tmp file');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar').mockImplementation(async () => 'tmp folder');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir');

  const result = await d.materialize('URL.tar.gz', { name: '', version: '', arch: '' });

  expect(findInCache).not.toHaveBeenCalled();
  expect(download).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledWith('URL.tar.gz');
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).toHaveBeenCalledTimes(1);
  expect(extractTar).toHaveBeenCalledWith('tmp file');
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('downloading 7z with cache hit', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation(() => 'cached folder');
  const download = jest.spyOn(tool, 'downloadTool');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar');
  const extract7z = jest.spyOn(tool, 'extract7z');
  const putInCache = jest.spyOn(tool, 'cacheDir');

  const result = await d.materialize('URL.7z', { name: 'tool', version: '1.1', arch: '' });

  expect(findInCache).toHaveBeenCalledTimes(1);
  expect(findInCache).toHaveBeenCalledWith('tool', '1.1', '');
  expect(download).not.toHaveBeenCalled();
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).not.toHaveBeenCalled();
  expect(extract7z).not.toHaveBeenCalled();
  expect(putInCache).not.toHaveBeenCalled();
  expect(result).toBe('cached folder');
});

test('downloading 7z with cache miss', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation();
  const download = jest.spyOn(tool, 'downloadTool').mockImplementation(async () => 'tmp file');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar');
  const extract7z = jest.spyOn(tool, 'extract7z').mockImplementation(async () => 'tmp folder');
  const putInCache = jest.spyOn(tool, 'cacheDir').mockImplementation(async () => 'cached folder');

  const result = await d.materialize('URL.7z', { name: 'tool', version: '1.1', arch: '' });

  expect(findInCache).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledWith('URL.7z');
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).not.toHaveBeenCalled();
  expect(extract7z).toHaveBeenCalledTimes(1);
  expect(extract7z).toHaveBeenCalledWith('tmp file');
  expect(putInCache).toHaveBeenCalledTimes(1);
  expect(putInCache).toHaveBeenCalledWith('tmp folder', 'tool', '1.1', '');
  expect(result).toBe('cached folder');
});

test('downloading 7z without caching', async () => {
  const findInCache = jest.spyOn(tool, 'find').mockImplementation();
  const download = jest.spyOn(tool, 'downloadTool');
  const extractZip = jest.spyOn(tool, 'extractZip');
  const extractTar = jest.spyOn(tool, 'extractTar');
  const extract7z = jest.spyOn(tool, 'extract7z').mockImplementation(async () => 'tmp folder');
  const putInCache = jest.spyOn(tool, 'cacheDir');

  const result = await d.materialize('URL.7z', { name: '', version: '', arch: '' });

  expect(findInCache).not.toHaveBeenCalled();
  expect(download).toHaveBeenCalledTimes(1);
  expect(download).toHaveBeenCalledWith('URL.7z');
  expect(extractZip).not.toHaveBeenCalled();
  expect(extractTar).not.toHaveBeenCalled();
  expect(extract7z).toHaveBeenCalledTimes(1);
  expect(extract7z).toHaveBeenCalledWith('tmp file');
  expect(putInCache).not.toHaveBeenCalled();
  expect(result).toBe('tmp folder');
});

test('finding subfolder', async () => {
  const globCreate = jest.spyOn(glob, 'create');

  const result = await d.findGlob('subfolder')('tmp folder');

  expect(globCreate).toHaveBeenCalledTimes(1);
  expect(result).toStrictEqual([]);
});
