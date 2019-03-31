var winHeight = $(window).height();
$("#background").height(winHeight);

window.onresize = function() {
  if (
    !(
      document.activeElement.tagName == "INPUT" ||
      document.activeElement.tagName == "TEXTAREA"
    )
  ) {
    var winHeight = $(window).height();
    $("#background").height(winHeight);
  }
};
var nameC;
var phoneC;
$("#body").hide();
var DisabledC = "false";
function Change() {
  if (DisabledC == "false") {
    var name = document.getElementById("nameC").value;
    var phone = document.getElementById("phoneC").value;
    if (name == "" || phone == "") {
      document.getElementById("msg").innerText = "信息没填完整";
    } else {
      nameC = name;
      phoneC = phone;
      var data = new FormData();
      data.append("name", name);
      data.append("phone", phone);

      fetch(phpChange, {
        body: data,
        method: "POST"
      })
        .then(Respone => Respone.json())
        .then(res => {
          if (res.error != 0) {
            document.getElementById("msg").innerText = res.errmsg;
          } else {
            if (res.num == 0) {
              document.getElementById("msg").innerText = res.errmsg;
            } else {
              DisabledC = "true";
              $("#body").show();

              $("#nameText").val(res.name);

              if (res.sex == "男") {
                document.getElementsByName("Sex")[0].checked = "checked";
              } else {
                document.getElementsByName("Sex")[1].checked = "checked";
              }

              $("#dormText").val(res.dorm);

              $("#phoneText").val(res.phone);

              var count1 = $("#collegeSelect option").length;
              for (var i = 0; i < count1; i++) {
                if (
                  $("#collegeSelect ").get(0).options[i].text == res.college
                ) {
                  $("#collegeSelect ").get(0).options[i].selected = true;
                  break;
                }
              }

              if (res.grade == "大一") {
                document.getElementsByName("Grade")[0].checked = "checked";
              } else {
                document.getElementsByName("Grade")[1].checked = "checked";
              }

              var count2 = $("#firstSelect option").length;
              for (var i = 0; i < count2; i++) {
                if ($("#firstSelect ").get(0).options[i].text == res.first) {
                  $("#firstSelect ").get(0).options[i].selected = true;
                  break;
                }
              }
              if (res.second != "") {
                var count3 = $("#secondSelect option").length;
                for (var i = 0; i < count3; i++) {
                  if (
                    $("#secondSelect ").get(0).options[i].text == res.second
                  ) {
                    $("#secondSelect ").get(0).options[i].selected = true;
                    break;
                  }
                }
              }

              if (res.adjust == "是") {
                document.getElementsByName("Adjust")[0].checked = "checked";
              } else {
                document.getElementsByName("Adjust")[1].checked = "checked";
              }
              $("#introText").val(res.intro);
            }
          }
        });
    }
  }
}

var collegeSelect = document.getElementById("collegeSelect");
var ban = document.getElementsByClassName("ban");
var firstSelect = document.getElementById("firstSelect");
var secondSelect = document.getElementById("secondSelect");
var sub = document.getElementById("sub");
var Error = document.getElementById("error");
var position;

//返回首页
function Back() {
  window.location.href = htmlStart;
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
      firstSelect.options[1].style = "display:none";
      firstSelect.options[2].style = "display:none";
      firstSelect.options[3].style = "display:inline";
      firstSelect.options[21].style = "display:inline";
      secondSelect.options[1].style = "display:none";
      secondSelect.options[2].style = "display:none";
      secondSelect.options[3].style = "display:inline";
      secondSelect.options[21].style = "display:inline";
      position = "北校";
    }
  } else {
    for (i; i < 2; i++) {
      ban[i].disabled = false;
      firstSelect.options[1].style = "display:inline";
      firstSelect.options[2].style = "display:inline";
      firstSelect.options[3].style = "display:none";
      firstSelect.options[21].style = "display:none";
      secondSelect.options[1].style = "display:inline";
      secondSelect.options[2].style = "display:inline";
      secondSelect.options[3].style = "display:none";
      secondSelect.options[21].style = "display:none";
      position = "南校";
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

//手机号验证
var phoneReg = /^1[0-9]{10}$/;
//宿舍验证
var dormReg = /^C([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i;

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

    var Adjust = Checked("Adjust");

    var Intro = document.getElementById("introText").value;

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
    } else if (!phoneReg.test(Phone)) {
      document.getElementById("error").innerText = "手机号填写错误";
    } else if (!dormReg.test(Dorm)) {
      document.getElementById("error").innerText = "宿舍填写错误";
    } else {
      //禁用按钮
      Disabled = "true";

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
      data.append("nameC", nameC);
      data.append("phoneC", phoneC);
      fetch(phpUpdate, {
        body: data,
        method: "POST"
      })
        .then(Respone => Respone.json())
        .then(res => {
          if (res.error == 0) {
            window.location.href = htmlCsuccess;
          } else {
            document.getElementById("error").innerText = res.errmsg;
            Disabled = "false";
          }
        });
    }
  }
}
