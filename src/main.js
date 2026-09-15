import * as core from '@actions/core'
import { findGlob, materialize } from './downloader.js'

/**
 * The main function for the action.
 *
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const url = core.getInput('archiveUrl', { required: true })
    const expression = core.getInput('archiveGlob')
    const cache = {
      name: core.getInput('toolName'),
      version: core.getInput('toolVersion'),
      arch: core.getInput('toolArch')
    }
    await materialize(url, cache)
      .then(findGlob(expression))
      .then((found) => found.forEach(core.addPath))
      .catch(core.setFailed)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
