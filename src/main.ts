import * as ac from '@actions/core'
import * as atc from '@actions/tool-cache'
import * as ag from '@actions/glob'
import {join} from 'path'

function extract(url: string): (file: string) => Promise<string> {
  if (url.endsWith('.tar.gz') || url.endsWith('.tgz')) {
    return atc.extractTar
  } else if (url.endsWith('.zip')) {
    return atc.extractZip
  } else {
    return atc.extract7z
  }
}

function findFirst(expression: string): (folder: string) => Promise<string> {
  return async (folder: string) =>
    ag
      .create(join(folder, expression))
      .then(async globber => globber.glob())
      .then(found => found[0])
}

async function run(): Promise<void> {
  try {
    const url = ac.getInput('toolUrl', {required: true})
    const expression = ac.getInput('archiveGlob')
    await atc
      .downloadTool(url)
      .then(extract(url))
      .then(findFirst(expression))
      .then(ac.addPath)
      .catch(ac.setFailed)
  } catch (error) {
    ac.setFailed(error.message)
  }
}

run()
