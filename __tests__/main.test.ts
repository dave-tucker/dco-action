import {checkSignOff} from '../src/dco'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('check no signoff', async () => {
  const input = `
This is a commit

It's not signed off
`;
  expect(checkSignOff(input)).toBe(false);
})

test('check valid signoff', async () => {
  const input = `
This is a commit

It's signed off

Signed-off-by: Test User <test@example.com>
`;
  expect(checkSignOff(input)).toBe(true);
})

test('check legacy signoff wo github', async () => {
  const input = `
This is a commit

It's signed off in Docker DCO format

Docker-DCO-1.1-Signed-off-by: Test User <test@example.com>
`;
  expect(checkSignOff(input)).toBe(true);
})

test('check signoff with github', async () => {
  const input = `
This is a commit

It's signed off in Docker DCO format

Signed-off-by: Test User <test@example.com> (github: foo)
`;
  expect(checkSignOff(input)).toBe(false);
})

test('check legacy signoff with github', async () => {
  const input = `
This is a commit

It's signed off in Docker DCO format

Docker-DCO-1.1-Signed-off-by: Test User <test@example.com> (github: foo)
`;
  expect(checkSignOff(input)).toBe(true);
})


/*
// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = '500'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
*/