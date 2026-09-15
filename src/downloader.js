import * as tool from '@actions/tool-cache'
import * as glob from '@actions/glob'
import * as path from 'node:path'

/**
 * Options describing how (and whether) to cache the extracted tool.
 *
 * @typedef {Object} CacheOptions
 * @property {string} [name] The tool name used by the tool cache.
 * @property {string} [version] The tool version used by the tool cache.
 * @property {string} [arch] The target architecture used by the tool cache.
 */

/**
 * Materialize the tool: return the cached folder if present, otherwise
 * download and extract it (caching the result when the cache options are set).
 *
 * @param {string} url The URL to download the archive from.
 * @param {CacheOptions} cache The cache options.
 * @returns {Promise<string>} The folder containing the extracted tool.
 */
export async function materialize(url, cache) {
  return getCache(cache) || extract(url).then(setCache(cache))
}

/**
 * Return the cached folder for the given options, or an empty string on miss.
 *
 * @param {CacheOptions} cache The cache options.
 * @returns {string} The cached folder, or '' on cache miss.
 */
function getCache(cache) {
  return cache.name && cache.version
    ? tool.find(cache.name, cache.version, cache.arch)
    : ''
}

/**
 * Wrap a cache so the extracted folder is cached when options are present.
 *
 * @param {CacheOptions} cache The cache options.
 * @returns {(folder: string) => Promise<string>} A function that caches the folder.
 */
function setCache(cache) {
  return async (folder) =>
    cache.name && cache.version
      ? tool.cacheDir(folder, cache.name, cache.version, cache.arch)
      : folder
}

/**
 * @typedef {Object} Extractor
 * @property {(url: string) => boolean} test Determines if this extractor handles the URL.
 * @property {(file: string) => Promise<string>} action Downloads and extracts the archive.
 */

const extractors = [
  {
    test: (url) => /\.zip$/.test(url),
    action: tool.extractZip
  },
  {
    test: (url) => /\.7z$/.test(url),
    action: tool.extract7z
  },
  {
    test: (url) => /\.xar$/.test(url),
    action: tool.extractXar
  },
  {
    test: (url) =>
      /\.t(ar\.[^.]+|b2|bz|bz2|z2|az|gz|lz|xz|Z|aZ|zst)$/.test(url),
    action: (file) => tool.extractTar(file, undefined, 'x')
  }
]

/**
 * Download the archive and extract it using the matching extractor.
 *
 * @param {string} url The URL to download the archive from.
 * @returns {Promise<string>} The extracted folder.
 */
async function extract(url) {
  const extractor = extractors.find((e) => e.test(url))
  if (!extractor) {
    throw Error(`Can not extract from ${url}`)
  }
  return tool.downloadTool(url).then(extractor.action)
}

/**
 * Build a glob over the extracted folder to find the path entry such as the
 * bin directory. The glob is matched relative to the extracted folder.
 *
 * @param {string} [expression] The glob expression relative to the extracted folder.
 * @returns {(folder: string) => Promise<string[]>} A function that globs the folder.
 */
export function findGlob(expression = '') {
  return async (folder) =>
    glob
      .create(path.join(folder, expression), { implicitDescendants: false })
      .then(async (globber) => globber.glob())
}
