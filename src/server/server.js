const fs      = require('fs')
const express = require('express');
const app     = express();
const ws      = require('express-ws')(app);
const port    = 4000;
import API from 'API';

app.use(express.static('public'));

app.ws('/api', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg);
        ws.send(msg);
    });
    ws.send("WebSockets connected");
});


const response = (req, res) => {
    const index = fs.readFileSync('public/index.html','utf8');
    res.end(index);
};

const validateLogged = (req, res, next) => {
    // Do validation here
    if(req){
        next();
    }else{
        return res.redirect('/');
    }
}

app.get('/route1*', validateLogged, response);
app.get('/route2*', validateLogged, response);
app.get('/route3*', validateLogged, response);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`)
})
