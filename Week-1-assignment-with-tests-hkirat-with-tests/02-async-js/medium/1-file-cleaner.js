// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman


// ```

var a = 'hello     world    my    name   is       raman'
let b = a.split(' ')
let arr = []
for (var i = 0; i < b.length; i++){
    if (b[i].length > 0)
        arr.push(b[i])
    
}
var data = arr.join(' ')
var fs = require('fs')

fs.writeFile('./read.txt',data, 'utf8', function (err, data) {
    if (err) {
        console.log(err)
        return;
    }
    else
        console.log('done properly')
})

