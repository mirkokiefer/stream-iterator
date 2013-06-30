
var assert = require('assert')
var iterators = require('async-iterators')
var stream = require('stream')
var createStreamIterator = require('./index')

var data = [1, 2, 3, 4, 5]
var createMockStream = function() {
  var mockStream = stream.Readable({objectMode: true, highWaterMark: 2})
  var index = 0

  mockStream._read = function() {
    mockStream.push(data[index])
    index++
    if (index == 5) mockStream.push(null)
  }

  return mockStream
}

var runForEachIteratorTest = function(iterator, cb) {
  var index = 0
  iterators.forEach(iterator, function(err, res) {
    assert.equal(res, data[index])
    index++
  }, function() {
    assert.equal(index, 5)
    cb()
  })
}

describe('stream-iterator', function() {
  it('should transform a stream into an iterator', function(done) {
    var mockStream = createMockStream()
    var mockStreamIterator = createStreamIterator(mockStream)
    runForEachIteratorTest(mockStreamIterator, done)
  })
})
