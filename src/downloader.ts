import * as tool from '@actions/tool-cache';
import * as glob from '@actions/glob';
import * as path from 'path';

export interface CacheOptions {
  readonly name: string;
  readonly version: string;
  readonly arch?: string;
}

export async function materialize(url: string, cache: CacheOptions): Promise<string> {
  const folder = getCache(cache);
  if (folder) {
    return folder;
  }
  return tool
    .downloadTool(url)
    .then(extract(url))
    .then(setCache(cache));
}

function getCache(cache: CacheOptions): string {
  if (cache.name && cache.version) {
    return tool.find(cache.name, cache.version, cache.arch);
  }
  return '';
}

function setCache(cache: CacheOptions): (folder: string) => Promise<string> {
  if (cache.name && cache.version) {
    return async folder => tool.cacheDir(folder, cache.name, cache.version, cache.arch);
  }
  return async folder => folder;
}

function extract(url: string): (file: string) => Promise<string> {
  if (url.endsWith('.tar.gz') || url.endsWith('.tgz')) {
    return tool.extractTar;
  } else if (url.endsWith('.zip')) {
    return tool.extractZip;
  } else {
    return tool.extract7z;
  }
}

export function findGlob(expression: string): (folder: string) => Promise<string[]> {
  return async folder =>
    glob.create(path.join(folder, expression), { implicitDescendants: false }).then(async globber => globber.glob());
}
