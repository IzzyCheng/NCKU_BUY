    var correct = 0;
    function validateEmail(email) {
    var addr = document.getElementById("account");
    var at = addr.value.indexOf('@');
    var result = document.getElementById("mailnotify");
    var varify = addr.value.indexOf('@mail.ncku.edu.tw');

    if (at != 9){
        result.innerHTML = "請檢查您輸入的成大信箱格式：學號@mail.ncku.edu.tw";
        result.style.color = "red"
        correct=0;
    }
    else{
    if (varify == -1){
    result.innerHTML = "請檢查您輸入的成大信箱格式：學號@mail.ncku.edu.tw";
                result.style.color = "red"
                correct=0;
    }
        else{
        result.innerHTML = "";
        correct=1;
        }
    }
}

function Create(){
    var user = document.getElementById("account").value;
    var pass = document.getElementById("password").value;
    if(correct==1){
      $.ajax({
        type: 'POST',
        url: "/register",
        data: {
          txtUserName:user,
          txtUserPwd:pass
        },
        success: function(result){
          if(result=="good"){
            window.location = "/"
          }else{
            var result = document.getElementById("mailnotify");
            result.innerHTML = "此帳號已被註冊"
            result.style.color = "red"
          }
        },
        async:false
      });
    }
}

function Check(){
      var user = document.getElementById("account").value;
      var pass = document.getElementById("password").value;
      if(correct==1){
        $.ajax({
          type: 'POST',
          url: "/loginin",
          data: {
            txtUserName:user,
            txtUserPwd:pass
          },
          success: function(result){
            if(result=="good"){
              window.location = "/loginin"
            }else if(result=='bad'){
              var result = document.getElementById("mailnotify");
              result.innerHTML = "此帳號尚未被驗證"
              result.style.color = "red"
            }else{
              var result = document.getElementById("mailnotify");
              result.innerHTML = "帳號或密碼錯誤"
              result.style.color = "red"
            }
          },
          async:false
        });
      }
}
