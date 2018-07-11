var express = require('express');
var router = express.Router();
var User = require('./user');
var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(cookieParser('sessiontest'));
router.use(session({
 secret: 'sessiontest',//与cookieParser中的一致
 resave: true,
 saveUninitialized:true
}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.remember=='true'){
    res.render('LoginSuccess.html');
  }else {
    res.render('weblogin/login.html');
  }
});

router.get('/home', function(req, res, next) {
  res.render('home.html');
});
router.get('/food', function(req, res, next) {
  res.render('food.html');
});
router.get('/cloth', function(req, res, next) {
  res.render('cloth.html');
});
router.get('/3C', function(req, res, next) {
  res.render('3C.html');
});
router.get('/pet', function(req, res, next) {
  res.render('pet.html');
});

router.post('/', function(req, res, next) {
  var username = req.body['txtUserName'];
  var password = req.body['txtUserPwd'];
  User.checkAccount(username,password,function(uid,result){
    if(result=='error')
      res.end('error');
    else if(result=='bad')
      res.end('bad');
    else {
      req.session.remember='true';
      res.end('good');
    }
  });
});

module.exports = router;
