import BobRossClient from '../src/BobRossClient'

const client = new BobRossClient({
  serverUrl: 'https://test.com'
})

test('instantiation fails without a serverUrl param', () => {
  expect.assertions(1)
  try {
    new BobRossClient({})
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

test('getUrl string is correct', () => {
  const serverUrl = 'https://knotel.io/images'
  const hmacs = { 'S300x225*W0seO': '2fdbb7f8f2c8ecf49ac437a40b25950ff8c930e9' }
  const client = new BobRossClient({ serverUrl, hmacs })
  const hash = '256cd9a0e3824a9b81e9f41e616019e8'
  const options = { resize: "300x225*" }
  const url = 'https://knotel.io/images/H2fdbb7f8f2c8ecf49ac437a40b25950ff8c930e9S300x225*W0seO/256cd9a0e3824a9b81e9f41e616019e8'
  expect(client.getUrl(hash, options)).toBe(url)
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
