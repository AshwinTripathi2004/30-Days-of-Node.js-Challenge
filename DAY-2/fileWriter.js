//import {writeFile} from fs;
const fs = require('fs');

function writeToFile(filePath, content){
    fs.writeFile(filePath, content, "utf8", (err)=>{
        if(err){
            console.log("Error :- " + err);
        }
        else{
            console.log("Data written to output.txt!");       
        }
    });
}


writeToFile('test-files/output1.txt', 'Sample content.');
//writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');