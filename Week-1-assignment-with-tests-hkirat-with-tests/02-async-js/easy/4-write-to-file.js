// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

var fs = require('fs')
var data = 'is this not happening'
fs.writeFile('./read.txt',data, 'utf8', function (err, data) {
    if (err) {
        console.log(err)
        return;
    }
    else
        console.log('done properly')
})

var a = 0;
for(var i = 0 ; i < 1000000000; i++)
  a += i
console.log(a)