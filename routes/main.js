const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const user = require('../src/model/user');
const admin = require('../src/model/admin');
const schedule = require('../src/model/schedule');




// **** User part ****/

//ROUTE TO SHOW HOMEPAGE
router.get('/',(req,res)=>{
    res.render('homepage');
});


//ROUTE TO SHOW REGISTRATION FORM
router.get('/registration',(req,res)=>{
    res.render('registration');
});


//ROUTE TO COLLECT USER DATA FROM REGISTRATION FORM TO DATABASE
router.post('/send', (req, res) => {

    // let user_name = req.body.user_name;
    // let user_phone = req.body.user_phone;
    // let user_email = req.body.user_email;
    // let user_password = req.body.user_password;
    // let user_address = req.body.user_address;
    const {user_name, user_phone, user_email, user_password, user_address} = req.body;

    console.log(user_name, user_phone, user_email, user_password, user_address);

    const userInfo = new user({
        user_name,
        user_phone,
        user_email,
        user_password,
        user_address
    });
    userInfo.save((err) => {
        if(err){
            res.redirect('/error');
            console.log(err);
        }
        else{
            console.log("Data save successfully");
            res.redirect('/success');
        }
    });
});


//ROUTE TO SHOW SUCCESS MSG(REGISTRATION) FOR USER
router.get('/success', (req, res)=> {
    res.render('msg/successMSG');
});


//ROUTE TO SHOW ERROR MSG(REGISTRATION) FOR USER
router.get('/error', (req, res)=> {
    res.render('msg/errorMSG');
});


//ROUTE TO SHOW LOGIN FORM
router.get('/userlogin',(req,res)=>{
    res.render('login');
});


//User login validation
router.post('/userlogin',async(req,res)=>{
    try{
            const email = req.body.email;
            const password = req.body.password;
            
            const userEmail = await user.findOne({user_email:email})

            if(userEmail.user_password === password){
                res.redirect('/userhomepage');
            }
            else{
                res.redirect('/uservalidation');
            }
        } catch(error){
            res.redirect('/uservalidation');
    }
});


//ROUTE TO SHOW INVALID MSG FOR USER
router.get('/uservalidation', (req, res)=> {
    res.render('msg/userValidation');
});


//ROUTE TO SHOW USER HOMEPAGE(after userlogin)
router.get('/userhomepage',(req,res)=>{
    res.render('userhomepage');
});






//**** ADMIN part ****/

//ROUTE TO SHOW ADMIN LOGIN
router.get('/adminlogin',(req,res)=>{
    res.render('admin/adminLogin');
});

//check admin login validation
router.post('/adminlogin',async(req,res)=>{
    try{
            const admin_name = req.body.admin_name;
            const password = req.body.password;
            
            const userEmail = await admin.findOne({admin_name:admin_name})

            if(userEmail.admin_password === password){
                res.redirect('/userdata');
            }
            else{
                res.redirect('/invalidAdmin');
            }
        } catch(error){
            res.redirect('/invalidAdmin');
    }
});


//ROUTE TO SHOW INVALID MSG FOR ADMIN
router.get('/invalidAdmin', (req, res)=> {
    res.render('msg/adminValidation');
});



//ROUTE TO SHOW USER DATA
router.get('/userdata',(req,res)=>{
    user.find((err, docs) => {
        if(!err){
            res.render('admin/userData', {users: docs});
        }
        else{
            console.log("Error 404 " + err)
        }
    });

});

//ROUTE TO SHOW USER DATA FOR UPDATE
router.get('/editInfo/:id',(req,res)=>{
    console.log(req.params.id);
    user.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs) => {
        if(err){
            console.log("Data can't edit because of some error");
        }
        else{
            res.render('admin/editInfo', {user: docs});
        }
    });
});


//ROUTE TO UPDATE DATA AND SUBMIT
router.post('/editInfo/:id',(req,res)=>{
    console.log(req.params.id);
    user.findByIdAndUpdate({_id: req.params.id}, req.body, (err, docs) => {
        if(err){
            console.log("Data can't update because of some error");
        }
        else{
            res.redirect('/updatemsg');
        }
    });
});


//ROUTE TO SHOW UPDATE CONFIRMATION MSG FOR ADMIN
router.get('/updatemsg', (req, res)=> {
    res.render('msg/updateMSG');
});


//ROUTE TO DELETE USER DATA
router.get('/delete/:id',(req,res)=>{
    console.log(req.params.id);
    user.findByIdAndDelete({_id: req.params.id}, (err, docs) => {
        if(err){
            console.log("Data can't deleted because of some error");
        }
        else{
            console.log("Delete successfully");
            res.redirect('/userdata');
        }
    });
});



//SEARCH user their data
router.post('/search',async(req,res)=>{
    try{
            const name = req.body.name;           
            const userName = await user.findOne({user_name:name});
            res.send(userName);

            // if(userName.user_name === name){
            //     res.send(userName);    
            // }
            // else{
            //     console.log("User not found");
            // }
        } catch(error){
            console.log("Invalid Username" + error);
    }
});






//**** Patient Schedule Part ****/

//ROUTE TO SHOW USER DATA and Set the patient schedule
router.get('/schedule/:id',(req,res)=>{
    console.log(req.params.id);
    user.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs) => {
        if(err){
            console.log("Data can't edit because of some error");
        }
        else{
            res.render('patientSchedule', {user: docs});
        }
    });
});


//ROUTE TO COLLECT PATIENT SCHEDULE DATA FROM SCHEDULE FORM TO DATABASE
router.post('/add', (req, res) => {
    const {user_name, doctor_name, hospital_name, doctor_contact, date, time} = req.body;

    const patientScheduleInfo = new schedule({
        user_name, 
        doctor_name, 
        hospital_name, 
        doctor_contact, 
        date, 
        time
    });
    patientScheduleInfo.save((err) => {
        if(err){
            res.redirect('/error');
            console.log(err);
        }
        else{
            console.log("Data save successfully");
            res.redirect('/schedule');
        }
    });
});


//ROUTE TO SHOW SCHEDULE INFORMATION
router.get('/schedule',(req,res)=>{
    schedule.find((err, docs) => {
        if(!err){
            res.render('scheduleInfo', {patientschedules: docs});
        }
        else{
            console.log("Error 404 " + err)
        }
    });
});
module.exports = router;