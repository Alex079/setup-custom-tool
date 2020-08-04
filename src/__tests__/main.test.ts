/* eslint-disable no-console */
import * as process from 'process';
import * as path from 'path';
import { rmdirSync } from 'fs';
import { execSync, ExecSyncOptions } from 'child_process';

test('test all parameters', () => {
  const cmd = path.join(__dirname, '..', '..', 'dist', 'index.js');
  const target = path.join(__dirname, '..', '..', 'target');
  const options: ExecSyncOptions = {
    env: {
      ...process.env,
      INPUT_ARCHIVEURL: 'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.tar.gz',
      INPUT_ARCHIVEGLOB: '*',
      INPUT_TOOLNAME: 'example',
      INPUT_TOOLVERSION: '2017.2.2',
      INPUT_TOOLARCH: 'none',
      RUNNER_TEMP: target,
      RUNNER_TOOL_CACHE: target
    }
  };
  console.log('First run - download');
  try {
    console.log(execSync(`node ${cmd}`, options).toString());
  }
  catch (e) {
    console.error(e.stdout.toString());
    throw e;
  }
  console.log('Second run - get from cache');
  try {
    console.log(execSync(`node ${cmd}`, options).toString());
  }
  catch (e) {
    console.error(e.stdout.toString());
    throw e;
  }
  rmdirSync(target, { recursive: true });
});

test('test required parameters', () => {
  const cmd = path.join(__dirname, '..', '..', 'dist', 'index.js');
  const target = path.join(__dirname, '..', '..', 'target');
  const options: ExecSyncOptions = {
    env: {
      ...process.env,
      INPUT_ARCHIVEURL: 'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.zip',
      RUNNER_TEMP: target,
      RUNNER_TOOL_CACHE: target
    }
  };
  console.log('First run - download');
  try {
    console.log(execSync(`node ${cmd}`, options).toString());
  }
  catch (e) {
    console.error(e.stdout.toString());
    throw e;
  }
  rmdirSync(target, { recursive: true });
});
