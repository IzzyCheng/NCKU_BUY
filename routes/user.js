var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyA0oMJI1iyh7nP4h0rr45K6ssQeMU5GBxQ",
    authDomain: "webproject-39a34.firebaseapp.com",
    databaseURL: "https://webproject-39a34.firebaseio.com",
    projectId: "webproject-39a34",
    storageBucket: "webproject-39a34.appspot.com",
    messagingSenderId: "796232426113"
  };
  firebase.initializeApp(config);

var db = firebase.database();

var User = function () {};

User.prototype.createAccount = function createAccount(username,userpass,callback) {
  console.log(username)
  firebase.auth().createUserWithEmailAndPassword(username, userpass).then(function(){
    var client = firebase.auth().currentUser;
    client.sendEmailVerification().then(function() {
      console.log("驗證信寄出");
    }, function(error) {
      console.error("驗證信錯誤");
    });
    callback(client.uid,'good')
  }).catch(function(error){
    var errorMsg = error.message;
    console.log(errorMsg);
    callback(errorMsg,'bad');
  });
};

User.prototype.checkAccount = function checkAccount(username,userpass,callback){
  firebase.auth().signInWithEmailAndPassword(username,userpass).then(function(){
    var client = firebase.auth().currentUser;
    var flag = client.emailVerified;
    console.log(flag);
    if(flag==false){
      callback('no','bad')
    }else {
      callback('no','good');
    }
  }).catch(function(error) {

    callback('no','error');
  });
};

module.exports = new User();
