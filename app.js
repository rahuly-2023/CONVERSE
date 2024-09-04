const path=require('path');

const express=require('express');
const app=express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'images', 'favicon.ico'));
});

require('dotenv').config();

var mongoose = require('mongoose');
const {db_password}=process.env;
const encodedPassword = encodeURIComponent(db_password);

const connectionString = `mongodb+srv://rahul2483yadav:${encodedPassword}@cluster0.3q3qi.mongodb.net/converse?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


  
const http=require('http').Server(app);

const userRoute = require('./routes/userRoute');
const User = require('./models/userModel');
const Chat = require('./models/chatModel');

app.use('/',userRoute);


const io = require('socket.io')(http);

var usp = io.of('/user-namespace')   //giving namespace (identifier)

usp.on('connection', async (socket)=>{        //if didn't given namespace, we have used io.on('connection)
    console.log("user connected");              //doesn't know whick user connected

    console.log(socket.handshake.auth.token)      //frontend se userid leke aa rha hai
    var userId = socket.handshake.auth.token;

    await User.findByIdAndUpdate({_id: userId}, { $set: { is_online: '1'}});


    //jab user aaye toh sabko broadcast krdo ki ye user online ho chuka hai
    socket.broadcast.emit('getOnlineUser', {user_id: userId});


    socket.on('disconnect', async()=>{
        console.log("User disconnected");

        var userId = socket.handshake.auth.token;
        await User.findByIdAndUpdate({_id: userId}, { $set: { is_online: '0'}});
        
        socket.broadcast.emit('getOfflineUser', {user_id: userId});     //broadcast if user if gone offline
    });

    //chatting implementation
    socket.on('newChat', (data)=>{
        socket.broadcast.emit('loadNewChat', data);
    })

    //load old chats
    socket.on('existsChat', async(data)=>{   //data is identifier
        var chats = await Chat.find({ $or: [                                                                  //using or because DB me in dono users ki jo jo chat ho wo sab leni hai chahe wo sender_id ne receiver_id ko bheji hai ya vice-versa
            {sender_id: data.sender_id, receiver_id: data.receiver_id},
            {sender_id: data.receiver_id, receiver_id: data.sender_id},
        ]});

        socket.emit('loadChats', {chats: chats, imgId: data.imgId});
    });



    //delete chats
    socket.on('chatDeleted',(data)=>{
        socket.broadcast.emit('chatMessageDeleted',data);
    })


});

const PORT=10000;
http.listen(PORT, function(){
    console.log(`localhost//${PORT}`);
});