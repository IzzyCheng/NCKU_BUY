var firebase;
$(function(){
  var $name = $('#name'),
      $price = $('#price'),
      $amount = $('#amount'),
      $itemInfo = $('#itemInfo'),
      $hashtag = $('#hashtag');

  var config = {
    apiKey: "AIzaSyD6Y6EJbgU_LgzJg9IQpFot0aXueJ7WlCU",
    databaseURL: "https://webproject-8293b.firebaseio.com/",
    storageBucket: "webproject-8293b.appspot.com",
    messagingSenderId: "422995971926"
  };
  firebase.initializeApp(config);
  var database = firebase.database().ref();
  var storageRef = firebase.storage().ref();
  
  function getRadioBoxValue(RadioName) {
    var obj = document.getElementsByName(RadioName);
    for (var i=0; i<obj.length; i++)
      if (obj[i].checked)
        return obj[i].value;
    return "undefined";
  }

  function getCheckBoxValue(CheckBoxName) {
    var obj = document.getElementsByName(CheckBoxName);
    var selected = [];
    for (var i=0; i<obj.length; i++)
      if (obj[i].checked)
        selected.push(obj[i].value);
    return selected;
  }

  var filelist;
  var uploadFileInput = document.getElementById("upload_img");
  uploadFileInput.addEventListener("change", function(){
    filelist = this.files;
    var upload_area = document.getElementById("upload_area");
    var img = document.createElement("img");
    var reader = new FileReader();
    reader.readAsDataURL(filelist[0]);
    reader.onload = function() { img.src = this.result;}
    img.style.width = "100%";
    upload_area.appendChild(img);
    var uploadTask = storageRef.child('images/'+filelist[0].name).put(filelist[0]);
  },false);

  var submit = document.getElementById("submit");
  submit.addEventListener("click", function() {
    var postData = {
      name:$('#name').val(),
      price:$('#price').val(),
      amount:$('#amount').val(),
      itemInfo:$('#itemInfo').val(),
      category:getRadioBoxValue("category"),
      hashtag:$('#hashtag').val(),
      location:getCheckBoxValue("location"),
      filename:filelist[0].name
    };
    database.push(postData);
  }, false);
});