const express = require('express');
const userRoute = express();

const bodyParser = require('body-parser');

const session = require('express-session');
const {SESSION_SECRET} = process.env;
userRoute.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}));

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended:true}));


userRoute.set('view engine','ejs');
userRoute.set('views','./views');

userRoute.use(express.static('public'));

const path = require('path');
const multer=require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Uploading');
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        const name = Date.now()+'-'+file.originalname;
        cb(null, name);
    }
});


const upload = multer({storage:storage});

const userController = require('../controller/userController');

const auth = require('../middlewares/auth');

userRoute.get('/register', auth.isLogout, userController.registerLoad);     //logout hai tabhi register kar paye
userRoute.post('/register', upload.single('image'),userController.register);    //get pe nhi gya toh post pe kya hi jayega, thus no checking of middleware

userRoute.get('/', auth.isLogout, userController.loadLogin);
userRoute.post('/', userController.login);
userRoute.get('/logout',auth.isLogin,  userController.logout);          //login hai tabhi logout kar paye

userRoute.get('/dashboard', auth.isLogin, userController.loadDashboard);    //login hai tabhi dashboard pe ja paye

userRoute.post('/save-chat', userController.saveChat);

userRoute.post('/delete-chat', userController.deleteChat);

userRoute.get('*', (req,res)=>{     //if no route match redirect to login page
    res.redirect('/')
})

module.exports = userRoute;