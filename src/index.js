const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');   

const app = express (); 
const server = require('http').Server(app);
const io = require('socket.io')(server); // require http para usar com socket.io

app.use((req,res, next) => {
    req.io = io;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");

    next();
});

app.use('/files', express.static(path.resolve(__dirname,'..','uploads','resized')));
app.use(require('./routes'));

mongoose.connect('mongodb+srv://admin:123@cluster0-ue6dt.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,  
});

app.use(cors());
server.listen(3333); //socket.io conseguir ouvir