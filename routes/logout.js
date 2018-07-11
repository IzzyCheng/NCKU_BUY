var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(cookieParser('sessiontest'));
router.use(session({
 secret: 'sessiontest',//与cookieParser中的一致
 resave: true,
 saveUninitialized:true
}));

router.get('/',function(req,res,next){
  req.session.destroy();
  res.redirect('/loginin');
});

module.exports = router;
