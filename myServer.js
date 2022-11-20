const express = require('express');
const app = express();
const mainRouter = require('./routes/main');
const port = 4500;
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');

mongoose.connect("mongodb://localhost:27017/user-information", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', () => {
    console.log("Database connection failed");
});

db.once('open', () => {
    console.log("Database connection Estabilshed");
});

//Set the template engine as ejs
app.set('view engine', 'ejs');

//For serving static file
app.use(express.static('/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/photo', express.static(__dirname + '/public/photo'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', mainRouter);
app.use('/registration', mainRouter);
app.use('/login', mainRouter);
app.use('/userhomepage', mainRouter);
app.use('/userdata', mainRouter);
app.use('/particularUser', mainRouter);

app.listen(port,(err)=>{
    if(!err){
        console.log(`Server connected at port ${port} successfully.`);
    }
    else{
        console.log(err)
    }
});
