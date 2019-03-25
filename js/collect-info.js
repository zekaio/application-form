var winHeight = $(window).height();
$("#background").height(winHeight);

var collegeSelect = document.getElementById("collegeSelect");
var ban = document.getElementsByClassName("ban");
var firstSelect = document.getElementById("firstSelect");
var secondSelect = document.getElementById("secondSelect");
var sub = document.getElementById("sub");
var Error = document.getElementById("error");
var chanpin = document.getElementsByClassName("chanpin");
var daima = document.getElementsByClassName("daima");
var sheji = document.getElementsByClassName("sheji");
var beijishu = document.getElementsByClassName("beijishu");
var position;

//返回首页
function back() {
  window.location.href = "start-page.html";
}

//根据选择学院决定显示南北校技术部
function Select() {
  $("#firstSelect").val("0");
  $("#secondSelect").val("0");
  var i = 0;
  var op = collegeSelect.value;
  if (parseInt(op) == 0) {
    for (i; i < 2; i++) {
      ban[i].disabled = true;
    }
  } else if (parseInt(op) > 0 && parseInt(op) <= 17) {
    for (i; i < 2; i++) {
      ban[i].disabled = false;
      chanpin[i].style.display = "inline";
      beijishu[i].style.display = "inline";
      daima[i].style.display = "none";
      sheji[i].style.display = "none";
      position = "北校";
    }
  } else {
    for (i; i < 2; i++) {
      ban[i].disabled = false;
      chanpin[i].style.display = "none";
      beijishu[i].style.display = "none";
      daima[i].style.display = "inline";
      sheji[i].style.display = "inline";
      position = "南校";
    }
  }
}

//获取选中单选框的值
function Checked(name) {
  var radios = document.getElementsByName(name);
  for (var i = 0; i < radios.length; ++i) {
    if (radios[i].checked) {
      return radios[i].value;
    }
    if (i == radios.length - 1) {
      return "undefined";
    }
  }
}

//截取部门
function Cut(string) {
  var arr = string.split("-");
  if (!arr[1]) {
    arr[1] = "";
  }
  return arr;
}

var Disabled = "false";
//提交
function Submit() {
  if (Disabled == "false") {
    document.getElementById("error").innerText = "";
    var Name = document.getElementById("nameText").value;

    var Sex = Checked("Sex");

    var ColSel = document.getElementById("collegeSelect");
    var ColIndex = ColSel.selectedIndex;
    var College = ColSel.options[ColIndex].text;

    var Grade = Checked("Grade");

    var Dorm = document.getElementById("dormText").value;

    var Phone = document.getElementById("phoneText").value;

    var FirSel = document.getElementById("firstSelect");
    var FirIndex = FirSel.selectedIndex;
    var First = FirSel.options[FirIndex].text;

    var SecSel = document.getElementById("secondSelect");
    var SecIndex = SecSel.selectedIndex;
    var Second = SecSel.options[SecIndex].text;

    var Intro = document.getElementById("introText").value;

    var Adjust = Checked("Adjust");
    //检验手机号是否是1开头
    var check = parseInt(Phone / 10000000000);
    if (
      Name == "" ||
      Sex == "undefined" ||
      College == "请选择你的学院" ||
      Dorm == "" ||
      Grade == "undefined" ||
      Phone == "" ||
      First == "请选择你想去的部门" ||
      Adjust == "undefined"
    ) {
      document.getElementById("error").innerText = "信息没填完整";
    } else if (check != 1) {
      document.getElementById("error").innerText = "手机号填写错误";
    } else {
      Disabled = "true";

      //判断是否已经提交信息
      var check = true;
      var checkData = new FormData();
      checkData.append("name", Name);
      checkData.append("phone", Phone);

      fetch("../php/check.php", {
        body: checkData,
        method: "POST"
      })
        .then(Response => Response.json())
        .then(res => {
          if (res.error == 1) {
            document.getElementById("error").innerText = "报名出错，请稍后再试";
          } else {
            if (res.msg == "true") {
              document.getElementById("error").innerText = "你已经报名过了";
              check = false;
              Disabled = "false";
            }
          }
        });

      if (check) {
        if (Second == "请选择你想去的部门（选填）") {
          Second = "";
          var SecondD = "";
          var SecondG = "";
        } else {
          var a = Cut(Second);
          var SecondD = a[0];
          var SecondG = a[1];
        }
        var b = Cut(First);
        var FirstD = b[0];
        var FirstG = b[1];

        var data = new FormData();
        data.append("name", Name);
        data.append("sex", Sex);
        data.append("college", College);
        data.append("dorm", Dorm);
        data.append("grade", Grade);
        data.append("phone", Phone);
        data.append("first", First);
        data.append("firstD", FirstD);
        data.append("second", Second);
        data.append("secondD", SecondD);
        data.append("adjust", Adjust);
        data.append("intro", Intro);
        data.append("position", position);
        fetch("../php/sendData.php", {
          body: data,
          method: "POST"
        })
          .then(Respone => Respone.json())
          .then(res => {
            if (res.error == 0) {
              window.location.href = "success.html";
            } else {
              document.getElementById("error").innerText =
                "报名出错，请稍后再试";
              sub.disabled = false;
            }
          });
      }
    }
  }
}
