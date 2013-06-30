#stream-iterator
Turns a Node.js streams2 stream into an asynchronous iterator.\\
The iterator can be conveniently used with the iterator functions in the [async-iterators](https://github.com/mirkokiefer/async-iterators) module.

``` js
var createStreamIterator = require('stream-iterator')

var iterator = createStreamIterator(aReadableStream)

var iterate = function() {
  iterator.next(function(err, data) {
    console.log(data)
    if (data) iterate()
  })
}

```

##License
MIT