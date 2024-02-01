const fs = require('fs');

function readFileContent(filePath){
    fs.readFile(filePath, (err, data)=>{
        if(err){
            console.log("Error :- " + err);
        }
        else{
            console.log("File Data is :- \n" + data);
        }
    });
}


readFileContent('test-files/file1.txt');
//readFileContent('test-files/empty-file.txt');
//readFileContent('test-files/nonexistent-file.txt');const fs = require('fs');

