/* eslint-disable no-console */
import * as process from 'process';
import * as path from 'path';
import { rmSync } from 'fs';
import { execSync, ExecSyncOptions, SpawnSyncReturns } from 'child_process';

const cmd = path.join(__dirname, '..', '..', 'dist', 'index.js');
const target = path.join(__dirname, '..', '..', 'target');
const testEnv = {...process.env,
  RUNNER_TEMP: target,
  RUNNER_TOOL_CACHE: target
};

afterAll(() => { rmSync(target, { recursive: true }); });

function runner(name: string, options: ExecSyncOptions) {
  console.log(name);
  try {
    console.log(execSync(`node ${cmd}`, options).toString());
  }
  catch (e) {
    console.error((e as SpawnSyncReturns<Buffer | string>).stdout.toString());
    throw e;
  }
}

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
  runner('First run - download', options);
  runner('Second run - get from cache', options);
});

test('test required parameters', () => {
  runner('Download zip', { env: {...testEnv, INPUT_ARCHIVEURL: 'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.zip'} });
  runner('Download tar.bz', { env: {...testEnv, INPUT_ARCHIVEURL: 'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.tar.bz'} });
  runner('Download tar.bz2', { env: {...testEnv, INPUT_ARCHIVEURL: 'https://github.com/Alex079/setup-custom-tool/wiki/sample/content.tar.bz2'} });
});
