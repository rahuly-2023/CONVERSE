const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const bcrypt = require('bcrypt');



const registerLoad = async(req,res)=>{

    try{
        res.render('register');

    }catch(err){
        console.log(err.message);
    }
}

const register = async(req,res)=>{
    console.log(req.body);
    console.log(req.file);


    try{
        if (!req.file) {
            return res.status(400).send('Profile picture is required.');
        }
        

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: 'images/'+req.file.filename,
            password: passwordHash
        })

        await user.save();

        res.render('register', {message: 'Registration succeeded'});

    }catch(err){
        console.log("H");
        console.log(err.message);
    }
}

const loadLogin = async(req,res)=>{
    try{
        res.render('login');

    }catch(err){
        console.log(err.message);
    }
}

const login = async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        const userData = await User.findOne({email:email});
        if(userData){

            const passwordMatch = await bcrypt.compare(password, userData.password);
            if(passwordMatch){
                req.session.user = userData;            //all info of user from database get stored in session, every detail of user in db gets stored in session also now
                res.redirect('/dashboard');
            }
            else{
                res.render('login',{message: 'Invalid password'});
            }
        }
        else{
            res.render('login', {message: "Email and Password is incorrect"});
        }
    }catch(err){
        console.log(err.message);
    }
}

const logout = async(req,res)=>{
    try{
        req.session.destroy();
        res.redirect('/');
    }catch(err){
        console.log(err.message);
    }
}

const loadDashboard = async(req,res)=>{
    try{
        // console.log(req.session.user);
        var users = await User.find({_id: {$nin:[req.session.user._id]}});  //khudko chorke saare users nikaal lega db se

        res.render('dashboard', {user: req.session.user, users:users});     //passed users to the dashboard ejs file

    }catch(err){
        console.log(err.message);
    }
}

const saveChat = async(req,res)=>{
    try{

        var chat = new Chat({
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            message: req.body.message
        })

        var newChat = await chat.save();      //db me store krdo
        res.status(200).send({ success:true, msg:'Chat inserted successfully', data:newChat});
        
    }catch(err){
        res.status(400).send({ success:false, msg:err.message});
    }
}

const deleteChat = async(req,res)=>{
    try{
        await Chat.deleteOne({_id: req.body.id});
        res.status(200).send({success:true});

    }catch(err){
        res.status(400).send({ success:false, msg:err.message});
    }
}


module.exports = {
    registerLoad,
    register,
    loadLogin,
    logout,
    login,
    loadDashboard,
    saveChat,
    deleteChat
}