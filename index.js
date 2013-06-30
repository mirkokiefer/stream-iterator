
var createStreamIterator = function(readable) {
  var isReadable = true
  var hasEnded = false

  readable.on('readable', function() {
    isReadable = true
  })
  readable.on('end', function() {
    hasEnded = true
  })

  var next = function(cb) {
    if (hasEnded) {
      return cb(null, undefined)
    }
    if (isReadable) {
      var res = readable.read()
      if (res === null) {
        isReadable = false
        return next(cb)
      }
      cb(null, res)
    } else {
      var onEnd = function() { next(cb) }
      readable.once('readable', function() {
        readable.removeListener('end', onEnd)
        next(cb)
      })
      readable.once('end', onEnd)
    }
  }

  return {next: next}
}

module.exports = createStreamIterator