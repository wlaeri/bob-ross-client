# Bob Ross Client
A javascript client for [Bob Ross](https://github.com/malomalo/bob_ross) image servers. Generates URLs and image source sets for retrieving images.

## Installation

```bash
$ yarn add bob-ross-client
```

## Implementation

```node
import BobRossClient from 'bob-ross-client'
import hmacs from './hmacs.json'

const client = new BobRossClient({
  serverUrl: process.env.BOB_ROSS_SERVER_URL,
  hmacs
})
```

## Usage

The Bob Ross client has two methods: `client.getUrl` and `client.getSrcset`. Both methods take the image hash and options as parameters. For more information on which keys the options object takes refer to the Bob Ross [documentation](https://github.com/malomalo/bob_ross).

```node
const imageUrl = client.getUrl('abc123', {
  resize: '300x225*',
  ...
})

const imageSrcset = client.getSrcset('abc123', {
  resize: '300x225*',
  ...
})
```

## Resources

* [Bob Ross Docs](https://github.com/malomalo/bob_ross)

## Credits

All credits go to [Jon](https://github.com/malomalo) and [James](https://github.com/waratuman) Bracy.

## License

[MIT](LICENSE)
