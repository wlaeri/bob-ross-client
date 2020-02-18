import BobRossClient from '../src/BobRossClient'

const client = new BobRossClient('https://test.com')

test('instantiation fails without a serverUrl param', () => {
  expect.assertions(1)
  try {
    new BobRossClient()
  } catch (e) {
    expect(e.message).toMatch(/require/)
  }
})

test('getUrl method fails without a hash param', () => {
  expect.assertions(1)
  try {
    client.getUrl()
  } catch (e) {
    expect(e.message).toMatch(/require/)
  }
})

test('getUrl method returns a string', () => {
  expect(typeof client.getUrl('abc123')).toBe('string')
})

test('getSrcset method fails without a hash param', () => {
  expect.assertions(1)
  try {
    client.getSrcset()
  } catch (e) {
    expect(e.message).toMatch(/require/)
  }
})

test('getSrcset method fails without a resize key in the options param', () => {
  expect.assertions(1)
  try {
    client.getSrcset('abc123')
  } catch (e) {
    expect(e.message).toMatch(/require/)
  }
})

test('getSrcset method fails with an invalid resize value in the options param', () => {
  expect.assertions(1)
  try {
    client.getSrcset('abc123', { resize: 'invalid' })
  } catch (e) {
    expect(e.message).toMatch(/invalid/)
  }
})

test('getSrcset method returns a string', () => {
  expect(typeof client.getSrcset('abc123', { resize: '200x300' })).toBe('string')
})
