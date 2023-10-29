import * as core from '@actions/core';
import { findGlob, materialize } from './downloader';

async function run(): Promise<void> {
  try {
    const url = core.getInput('archiveUrl', { required: true });
    const expression = core.getInput('archiveGlob');
    const cache = {
      name: core.getInput('toolName'),
      version: core.getInput('toolVersion'),
      arch: core.getInput('toolArch')
    };
    await materialize(url, cache)
      .then(findGlob(expression))
      .then(found => found.forEach(core.addPath))
      .catch(core.setFailed);
  } catch (e) {
    core.setFailed(e as Error);
  }
}

run();
