import * as core from '@actions/core'
import * as tool from '@actions/tool-cache'
import * as glob from '@actions/glob'
import * as path from 'path'

function extract(url: string): (file: string) => Promise<string> {
  if (url.endsWith('.tar.gz') || url.endsWith('.tgz')) {
    return tool.extractTar
  } else if (url.endsWith('.zip')) {
    return tool.extractZip
  } else {
    return tool.extract7z
  }
}

function findFirst(expression: string): (folder: string) => Promise<string> {
  return async (folder: string) =>
    glob
      .create(path.join(folder, expression))
      .then(async globber => globber.glob())
      .then(found => found[0])
}

async function run(): Promise<void> {
  try {
    const url = core.getInput('toolUrl', {required: true})
    const expression = core.getInput('archiveGlob')
    await tool
      .downloadTool(url)
      .then(extract(url))
      .then(findFirst(expression))
      .then(core.addPath)
      .catch(core.setFailed)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
