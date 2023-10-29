import * as tool from '@actions/tool-cache';
import * as glob from '@actions/glob';
import * as path from 'path';

export interface CacheOptions {
  readonly name?: string;
  readonly version?: string;
  readonly arch?: string;
}

export async function materialize(url: string, cache: CacheOptions): Promise<string> {
  return getCache(cache) || tool.downloadTool(url).then(extract(url)).then(setCache(cache));
}

function getCache(cache: CacheOptions): string {
  return (cache.name && cache.version) ? tool.find(cache.name, cache.version, cache.arch) : '';
}

function setCache(cache: CacheOptions): (folder: string) => Promise<string> {
  return async folder => (cache.name && cache.version) ? tool.cacheDir(folder, cache.name, cache.version, cache.arch) : folder;
}

interface Extractor {
  test(url: string): boolean,
  action(file: string): Promise<string>
}

const extractors: Extractor[] = [
  {
    test: url => url.endsWith('.tar.bz2'),
    action: file => tool.extractTar(file, undefined, 'xj')
  },
  {
    test: url => url.endsWith('.tar.gz') || url.endsWith('.tgz'),
    action: tool.extractTar
  },
  {
    test: url => url.endsWith('.zip'),
    action: tool.extractZip
  },
  {
    test: url => url.endsWith('.7z'),
    action: tool.extract7z
  },
  {
    test: url => url.endsWith('.xar'),
    action: tool.extractXar
  }
];

function extract(url: string): (file: string) => Promise<string> {
  const extractor = extractors.find(e => e.test(url));
  if (!extractor) {
    throw Error(`Can not extract from ${url}`);
  }
  return extractor.action;
}

export function findGlob(expression: string = ''): (folder: string) => Promise<string[]> {
  return async folder =>
    glob.create(path.join(folder, expression), { implicitDescendants: false }).then(async globber => globber.glob());
}
