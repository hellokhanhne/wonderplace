const account = require('../controllers/models/account');
let session = require('express-session');
const jwt = require('jsonwebtoken');
class loginController {
    //get
    index(req,res) {
        res.render('others/login');
    }

    // post 
    checkLogin(req,res,next) {
       const email = req.body.email;
       const password = req.body.password;
         
       account.findOne({email : new RegExp(`^${email}$`, 'i') , password : password
    })
       .then(account => {
         
           if(account != null) {
            var token =  jwt.sign({
                email : account.email
            },'mk');
            req.session.token = token;
            req.session.name = account.lastName;
               res.json({
               
                   link : '/index.html'
               })
           }
           else {
               const falseLogin = 'false';
               res.json(falseLogin);
           } 
       })
       .catch(next)
    }
}

module.exports =  new loginController;