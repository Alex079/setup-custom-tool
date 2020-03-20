import * as process from 'process';
import * as path from 'path';
// import { rmdirSync } from 'fs';
import { ExecSyncOptions, execSync } from 'child_process';

test('test all parameters', () => {
  const cmd = path.join(__dirname, '..', 'dist', 'index.js');
  // const target = path.join(__dirname, '..', 'target');
  const options: ExecSyncOptions = {
    env: {
      ...process.env,
      INPUT_ARCHIVEURL: 'https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip',
      INPUT_ARCHIVEGLOB: '*',
      INPUT_TOOLNAME: 'example',
      INPUT_TOOLVERSION: '2017.2.2',
      INPUT_TOOLARCH: 'none'
      // RUNNER_TEMP: target,
      // RUNNER_TOOL_CACHE: target
    }
  };
  console.log('First run');
  console.log(execSync(`node ${cmd}`, options).toString());
  console.log('Second run - cache');
  console.log(execSync(`node ${cmd}`, options).toString());
  // rmdirSync(target, { recursive: true });
});

test('test required parameters', () => {
  const cmd = path.join(__dirname, '..', 'dist', 'index.js');
  // const target = path.join(__dirname, '..', 'target');
  const options: ExecSyncOptions = {
    env: {
      ...process.env,
      INPUT_ARCHIVEURL: 'https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip'
      // RUNNER_TEMP: target,
      // RUNNER_TOOL_CACHE: target
    }
  };
  console.log(execSync(`node ${cmd}`, options).toString());
  // rmdirSync(target, { recursive: true });
});
