var bumen = document.getElementById("bumen");
var Name = document.getElementById("name");
var phone = document.getElementById("phone");
var select = document.getElementById("select");
var choose = "all";
function Select() {
  var op = select.value;
  switch (parseInt(op)) {
    case 1:
      bumen.style.display = "none";
      Name.style.display = "none";
      phone.style.display = "none";
      choose = "all";
      break;
    case 2:
      bumen.style.display = "inline";
      Name.style.display = "none";
      phone.style.display = "none";
      choose = "bumen";
      break;
    case 3:
      bumen.style.display = "none";
      Name.style.display = "inline";
      phone.style.display = "none";
      choose = "name";
      break;
    case 4:
      bumen.style.display = "none";
      Name.style.display = "none";
      phone.style.display = "inline";
      choose = "phone";
      break;
  }
}
function search() {
  var parent = document.getElementById("msg");
  parent.innerHTML="";
  var tr = document.getElementsByTagName("tr");
  var num = tr.length;
  if (parseInt(num) > 1) {
    for (i = 0; i < num - 1; i++) {
      var tab = tr[1].parentNode;
      tab.removeChild(tr[1]);
    }
  }
  var data = "all";
  switch (choose) {
    case "all":
      data = "all";
      break;

    case "bumen":
      var bsle = document.getElementById("bumen");
      var cho = parseInt(bsle.value);
      data = bsle[cho].innerText;
      break;

    case "name":
      data = document.getElementById("name").value;
      break;

    case "phone":
      data = document.getElementById("phone").value;
      break;
  }
  var fromdata = new FormData();
  fromdata.append("choose", choose);
  fromdata.append("data", data);
  fetch("/php/admin.php", {
    body: fromdata,
    method: "POST"
  })
    .then(Response => Response.json())
    .then(res => {
      if (res.error == 0) {
        if (res.result == "none") {
          var div = document.createElement("div");
          div.className = "none";
          div.innerText = "没有查到结果";
          parent.appendChild(div);
        } else {
          for (i = 0; i < res.arr.length; i++) {
            var tr = document.createElement("tr");
            parent.appendChild(tr);
            //姓名
            var name = document.createElement("td");
            name.innerText = res.arr[i].name;
            tr.appendChild(name);
            //性别
            var sex = document.createElement("td");
            sex.innerText = res.arr[i].sex;
            tr.appendChild(sex);
            //学院
            var college = document.createElement("td");
            college.innerText = res.arr[i].college;
            tr.appendChild(college);
            //宿舍
            var dorm = document.createElement("td");
            dorm.innerText = res.arr[i].dorm;
            tr.appendChild(dorm);
            //年级
            var grade = document.createElement("td");
            grade.innerText = res.arr[i].grade;
            tr.appendChild(grade);
            //手机号
            var phone = document.createElement("td");
            phone.innerText = res.arr[i].phone;
            tr.appendChild(phone);
            //第一志愿
            var first = document.createElement("td");
            first.innerText = res.arr[i].first;
            tr.appendChild(first);
            //第二志愿
            var second = document.createElement("td");
            second.innerText = res.arr[i].second;
            tr.appendChild(second);
            //自我介绍
            var intro = document.createElement("td");
            intro.innerText = res.arr[i].intro;
            tr.appendChild(intro);
            //空一行
            var line_break = document.createElement("div");
            line_break.innerHTML = "</br></br></br>";
            tr.appendChild(line_break);
          }
        }
      }else if(res.error == 1){
        var div = document.createElement("div");
        div.className = "none";
        div.innerText = "数据库连接错误";
        parent.appendChild(div);
      }else{
        var div = document.createElement("div");
        div.className = "none";
        div.innerText = "应该不会出现这个错误";
        parent.appendChild(div);
      }
    });
}