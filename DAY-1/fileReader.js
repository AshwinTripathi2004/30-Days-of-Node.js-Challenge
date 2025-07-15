const fs = require('fs');

function readFileContent(filePath){
    fs.readFile(filePath, (err, data)=>{
        if(err){
            console.log("Error :- " + err);
        }
        else{
            console.log("File Data is :- \n" + data);
            // If you want to convert the buffer to a string, uncomment the next line
        }
    });
}


readFileContent('test-files/file1.txt');
//readFileContent('test-files/empty-file.txt');
//readFileContent('test-files/nonexistent-file.txt');const fs = require('fs');

