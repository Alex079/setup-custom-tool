import * as tool from '@actions/tool-cache';
import * as glob from '@actions/glob';
import * as path from 'path';

export interface CacheOptions {
  readonly name?: string;
  readonly version?: string;
  readonly arch?: string;
}

export async function materialize(url: string, cache: CacheOptions): Promise<string> {
  return getCache(cache) || extract(url).then(setCache(cache));
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
    test: url => /\.zip$/.test(url),
    action: tool.extractZip
  },
  {
    test: url => /\.7z$/.test(url),
    action: tool.extract7z
  },
  {
    test: url => /\.xar$/.test(url),
    action: tool.extractXar
  },
  {
    test: url => /\.t(ar\.[^.]+|b2|bz|bz2|z2|az|gz|lz|xz|Z|aZ|zst)$/.test(url),
    action: file => tool.extractTar(file, undefined, 'x')
  }
];

async function extract(url: string): Promise<string> {
  const extractor = extractors.find(e => e.test(url));
  if (!extractor) {
    throw Error(`Can not extract from ${url}`);
  }
  return tool.downloadTool(url).then(extractor.action);
}

export function findGlob(expression: string = ''): (folder: string) => Promise<string[]> {
  return async folder =>
    glob.create(path.join(folder, expression), { implicitDescendants: false }).then(async globber => globber.glob());
}
