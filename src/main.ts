import * as core from '@actions/core';
import { materialize, findGlob } from './downloader';

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
      .then(found => {
        for (const path of found) {
          core.addPath(path);
        }
      })
      .catch(core.setFailed);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
