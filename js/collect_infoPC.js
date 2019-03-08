//返回首页
function back(){
    window.location.href="start-pagePC.html";
}
//选择学院
var school=document.getElementById("3");
school.onclick=function(event){
    var pop=document.getElementById("03");
    pop.style.display="block";
    var event=event||window.event;
    if(event&&event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble=true;
    }
}
//第一志愿
var first=document.getElementById("7");
first.onclick=function(event){
    var pop=document.getElementById("07");
    pop.style.display="block";
    var event=event||window.event;
    if(event&&event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble=true;
    }
}
//第二志愿
var second=document.getElementById("8");
second.onclick=function(event){
    var pop=document.getElementById("08");
    pop.style.display="block";
    var event=event||window.event;
    if(event&&event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble=true;
    }
}
//点击空白处隐藏
document.onclick=function(event){
    var event=event||window.event;
    var box=event.target.parentNode;
    if(box.id!="03"){
        if (event.target.id!="03"){
            school.value=$("input[name='xueyuan']:checked").next("span").text();
            var out=document.getElementById("03");
            out.style.display="none";
        }
    }
    if(box.id!="07"){
        if (event.target.id!="07"){
            first.value=$("input[name='bumen1']:checked").next("span").text();
            var out=document.getElementById("07");
            out.style.display="none";
        }
    }
    if(box.id!="08"){
        if (event.target.id!="08"){
            second.value=$("input[name='bumen2']:checked").next("span").text();
            var out=document.getElementById("08");
            out.style.display="none";
        }
    }
}
//宿舍格式提示消失
var dorm=document.getElementById("5");
dorm.onfocus=function(){
    this.value = this.value == '如C1-101' ? '' : this.value;
    
}
//手机格式验证
function check(){
    var phone=document.getElementById("6").value;
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
        document.getElementById("errmsg").innerHTML="手机号码有误w";
        return false;
    }
     else {return true;}
}
//自我介绍
var intro=document.getElementById("9");
intro.onfocus = function () {
    this.value = this.value == '介绍一下你自己…' ? '' : this.value;
    this.className="word";
    this.onkeyup();
}
intro.onkeyup = function () {
    var val = this.value;
    var len = val.length;
    var els = this.parentNode.children;
    var tot = els[2];
    if (len<=150)
     {tot.innerHTML = len + '/150';}
        else {tot.innerHTML = '150/150';}
    this.value=val.substring(0,151);
}
//提交
function submit(){
    var name=$("#1").val();
    var sex=$("input[name='sex']:checked").next("span").text();
    var school=$("#3").val();
    var year=$("input[name='year']:checked").next("span").text();
    var dorm=$("#5").val();
    var phone=$("#6").val();
    var first=$("#7").val();
    var second=$("#8").val();
    var intro=$("#9").val();
    if (name==""||sex==""||school==""||year==""||dorm==""||phone==""||first==""||second=="") {
        document.getElementById("errmsg").innerHTML="没填完整哦~";
    } 
        else{
            if (check()) {window.location.href="success_page.html";}
        }
/*
   $.ajax({
        type:"POST",
        url:"sendData.php",
        dataType:"JSON",
        data:{
        //  "username":name,
        //  "password":pwd,
        },
        //php $_POST["username"]
        success:function(data){
        //
        }
    }) 
*/
}


