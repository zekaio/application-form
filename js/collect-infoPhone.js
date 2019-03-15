window.onload = function() {
  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;
  document.getElementById("background").style.height = height + "px";
  document.getElementById("background").style.width = width + "px";
  window.twoHeight =
    parseInt(document.getElementById("two").clientHeight || o.offsetHeight) +
    50;
  var MarginTop = (parseInt(height) - parseInt(window.twoHeight)) / 2;
  if (MarginTop > 0) {
    document.getElementById("body").style.marginTop = MarginTop + "px";
  }
  document.getElementById("body").style.height = window.twoHeight + "px";
  document.getElementById("body").style.width = 0.8 * width + "px";
  document.getElementById("fuck").style.height = window.twoHeight + "px";
  document.getElementById("one").style.height = window.twoHeight + "px";
  document.getElementById("one").style.width = 0.8 * width + "px";
  document.getElementById("two").style.height = window.twoHeight + "px";
  document.getElementById("two").style.width = 0.8 * width + "px";
};
window.onresize = function() {
  if (document.activeElement.tagName != "TEXTAREA") {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    document.getElementById("background").style.height = height + "px";
    document.getElementById("background").style.width = width + "px";
    document.getElementById("body").style.height = window.twoHeight + "px";
    document.getElementById("body").style.width = 0.8 * width + "px";
    document.getElementById("fuck").style.height = window.twoHeight + "px";
    document.getElementById("one").style.height = window.twoHeight + "px";
    document.getElementById("one").style.width = 0.8 * width + "px";
    document.getElementById("two").style.height = window.twoHeight + "px";
    document.getElementById("two").style.width = 0.8 * width + "px";
  }
};
var one = document.getElementById("one");
var two = document.getElementById("two");
function Next() {
  if (document.activeElement.tagName != "TEXTAREA") {
    document.getElementById("fuck").style.marginTop = -window.twoHeight + "px";
  }
}
function Last() {
  if (document.activeElement.tagName != "TEXTAREA") {
    document.getElementById("fuck").style.marginTop = 0 + "px";
  }
}

var Sex = "undefined";
var Grade = "undefined";
var Adjust = "undefined";
function Boy() {
  if (Sex != "男") {
    document.getElementById("boy").src = "../img/checked.png";
    document.getElementById("girl").src = "../img/unchecked.png";
    Sex = "男";
  }
}
function Girl() {
  if (Sex != "女") {
    document.getElementById("girl").src = "../img/checked.png";
    document.getElementById("boy").src = "../img/unchecked.png";
    Sex = "女";
  }
}
function GradeOne() {
  if (Grade != "大一") {
    document.getElementById("gradeOne").src = "../img/checked.png";
    document.getElementById("gradeTwo").src = "../img/unchecked.png";
    Grade = "大一";
  }
}
function GradeTwo() {
  if (Grade != "大二") {
    document.getElementById("gradeTwo").src = "../img/checked.png";
    document.getElementById("gradeOne").src = "../img/unchecked.png";
    Grade = "大二";
  }
}
function Yes() {
  if (Adjust != "是") {
    document.getElementById("Yes").src = "../img/checked.png";
    document.getElementById("No").src = "../img/unchecked.png";
    Adjust = "是";
  }
}
function No() {
  if (Adjust != "否") {
    document.getElementById("No").src = "../img/checked.png";
    document.getElementById("Yes").src = "../img/unchecked.png";
    Adjust = "否";
  }
}

var collegeSelect = document.getElementById("collegeSelect");
var ban = document.getElementsByClassName("ban");
var firstSelect = document.getElementById("firstSelect");
var secondSelect = document.getElementById("secondSelect");
var chanpin = document.getElementById("chanpin");
var sub = document.getElementById("sub");
var Error = document.getElementById("error");

//返回首页
function back() {
  window.location.href = "start-page.html";
}

//根据选择学院决定显示南北校技术部
function Select() {
  var op = collegeSelect.value;
  if (parseInt(op) == 0) {
    ban[0].disabled = true;
    ban[1].disabled = true;
  } else if (parseInt(op) > 0 && parseInt(op) <= 17) {
    ban[0].disabled = false;
    ban[1].disabled = false;
    chanpin.style.display = "inline";
  } else {
    ban[0].disabled = false;
    ban[1].disabled = false;
    chanpin.style.display = "none";
  }
}

var Disabled = "false";
//提交
function Submit() {
  if (Disabled == "false") {
    var Name = document.getElementById("nameText").value;

    var ColSel = document.getElementById("collegeSelect");
    var ColIndex = ColSel.selectedIndex;
    var College = ColSel.options[ColIndex].text;

    var Dorm = document.getElementById("dormText").value;

    var Phone = document.getElementById("phoneText").value;

    var FirSel = document.getElementById("firstSelect");
    var FirIndex = FirSel.selectedIndex;
    var First = FirSel.options[FirIndex].text;

    var SecSel = document.getElementById("secondSelect");
    var SecIndex = SecSel.selectedIndex;
    var Second = SecSel.options[SecIndex].text;

    var Intro = document.getElementById("introText").value;
    if (Second == "请选择你想去的部门（选填）") {
      Second = "";
    }

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
      var data = new FormData();
      data.append("name", Name);
      data.append("sex", Sex);
      data.append("college", College);
      data.append("dorm", Dorm);
      data.append("grade", Grade);
      data.append("phone", Phone);
      data.append("first", First);
      data.append("second", Second);
      data.append("adjust", Adjust);
      data.append("intro", Intro);

      fetch("../php/sendData.php", {
        body: data,
        method: "POST"
      })
        .then(Respone => Respone.json())
        .then(res => {
          if (res.error == 0) {
            // window.location.href="success_page.html";
            document.getElementById("error").innerText = "报名成功";
          } else {
            document.getElementById("error").innerText = "报名出错，请稍后再试";
            sub.disabled = false;
          }
        });
    }
  }
}
