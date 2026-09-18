import { jest } from '@jest/globals'

const main = {
  run: jest.fn()
}

jest.unstable_mockModule('../src/main.js', () => main)

test('run called immediately', async () => {
  await import('../src/index.js')
  expect(main.run).toHaveBeenCalled()
})
