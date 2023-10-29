/* eslint-disable no-console */
import * as process from 'process';
import * as path from 'path';
import { rmSync } from 'fs';
import { execSync, ExecSyncOptions } from 'child_process';

const cmd = path.join(__dirname, '..', '..', 'dist', 'index.js');
const target = path.join(__dirname, '..', '..', 'target');
const testEnv = {...process.env,
  RUNNER_TEMP: target,
  RUNNER_TOOL_CACHE: target
};

afterAll(() => { rmSync(target, { recursive: true }); });

test('test all parameters', () => {
  const options: ExecSyncOptions = {
    env: {...testEnv,
      INPUT_ARCHIVEURL: 'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.tar.gz',
      INPUT_ARCHIVEGLOB: '*',
      INPUT_TOOLNAME: 'example',
      INPUT_TOOLVERSION: '2017.2.2',
      INPUT_TOOLARCH: 'none'
    }
  };
  console.log('First run - download');
  try {
    console.log(execSync(`node ${cmd}`, options).toString());
  }
  catch (e) {
    console.error(e);
    throw e;
  }
  console.log('Second run - get from cache');
  try {
    console.log(execSync(`node ${cmd}`, options).toString());
  }
  catch (e) {
    console.error(e);
    throw e;
  }
});

test('test required parameters', () => {
  const options: ExecSyncOptions = {
    env: {...testEnv,
      INPUT_ARCHIVEURL: 'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.zip'
    }
  };
  console.log('First run - download');
  try {
    console.log(execSync(`node ${cmd}`, options).toString());
  }
  catch (e) {
    console.error(e);
    throw e;
  }
});
