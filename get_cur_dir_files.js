const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, 'xray_jsonfiles');
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
});

xray_list = xray_list.filter(item => {
    if (!item.includes(".json")) {
        return item;
    }
});

xray_list.forEach(item => {
    console.log(item);
});
