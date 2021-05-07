var fs = require('fs');
var array = fs.readFileSync('data').toString().split("\n");
for(i in array) {
    console.log(array[i].split('|')[0].split('watch'))
}