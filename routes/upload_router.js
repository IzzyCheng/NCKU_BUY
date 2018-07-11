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

/* GET upload pages. */
router.get('/', function(req, res, next) {
    res.render('upload.html');
});

router.post('/', function(req, res, next) {
});

module.exports = router;
