import invariant from 'invariant'
import _ from 'lodash'

class BobRossClient {
  constructor (serverUrl, hmacs) {
    invariant(serverUrl, `Bob Ross Client requires a serverUrl.`)
    this.serverUrl = serverUrl
    this.hmacs = hmacs || {}
  }

  getUrl(hash, options) {
    invariant(hash, `The getUrl method requires a hash param.`)
    options || (options = {})
    
    if (options['watermark'] === undefined) {
        options['watermark'] = {}
    }
    options['optimize'] = true

    var query = []
    var non_hmac_query = []
    _.each(options, function (value, key) {
        if (key == 'optimize') {
            query.push('O')
        } else if (key === 'progressive') {
            query.push('O')
        } else if (key === 'resize') {
            query.push('S' + value.toLowerCase())
        } else if (key === 'background') {
            query.push('B' + value.toLowerCase())
        } else if (key === 'expires') {
            query.push('E' + Math.floor(value.valueOf() / 1000).toString(16))
        } else if (key === 'watermark' && value) {
            query.push('W' + (value['id'] || 0).toString() + (value['position'] || 'se').toLowerCase() + (value['offset'] || ""))
        } else if (key === 'lossless') {
            query.push('L')
        } else if (key === 'grayscale') {
            query.push('G')
        } else if (key === 'page') {
            non_hmac_query.push('R' + value)
        }
    })
    
    let hmac = this.hmacs[query.join('')]
    
    query = query.concat(non_hmac_query).join('')
    
    if (hmac) {
      return this.serverUrl + "/" + 'H' + hmac + encodeURIComponent(query) + "/" + hash
    } else {
        return this.serverUrl + "/" + encodeURIComponent(query) + "/" + hash
    }
  }
  
  getSrcset(hash, options) {
    invariant(hash, `The getSrcset method requires a hash param.`)
    options || (options = {})
    invariant(options.resize, `The getSrcset options param requires a resize key.`)
    var size_match = options.resize.match(/(\d+)x(\d+)(.*)/)
    invariant(size_match, `Invalid resize value: ${options.resize}. Must be in the form "100x150".`)
    var width = parseInt(size_match[1])
    var height = parseInt(size_match[2])
    var style = size_match[3]
    return [
        [this.getUrl(hash, _.extend({}, options, {resize: width * 2 + "x" + height * 2 + style} )), '2x'].join(" "),
        [this.getUrl(hash, _.extend({}, options, {resize: width * 3 + "x" + height * 3 + style} )), '3x'].join(" "),
    ].join(", ")
  }
}

export default BobRossClient
