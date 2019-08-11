const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "Website", 'xray_jsonfiles');
console.log(directoryPath);
var xray_list = [];
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        xray_list.push(file);
    });
    xray_list.forEach(item => {
        console.log(item);
    });

});

