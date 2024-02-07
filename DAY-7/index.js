const express = require('express');

const app = express();


function greetHandler(req, res) {
    const name = req.query.name || 'Guest';
    res.send(`Hello ${name}!`);
}

app.get('/greet', greetHandler);



app.listen(3000, ()=>{
    console.log("App running on port 3000!");
})