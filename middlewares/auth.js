const isLogin = async(req,res,next)=>{
    try{

        if(req.session.user){   //agar user ka session created hai toh loggedIn hai
            // do nothing, next chal jayega is case me
        }
        else{
            res.redirect('/')
        }
        next();
    }catch(err){
        console.log(err.message);
    }
}


//checks if logout or not
const isLogout = async(req,res,next)=>{
    try{

        if(req.session.user){   //agar user ka session created hai toh loggedIn hai
            res.redirect('/dashboard')  //agar login hai toh dashboard pe redirect
        }
        
        next();
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {
    isLogin,
    isLogout
}