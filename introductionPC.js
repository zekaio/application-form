var show = document.getElementsByClassName("show");
var nowId = show[0].id;
function left(){
    if(nowId == 1){
        var firstTip = document.getElementsByClassName("firstTip");
        firstTip[0].style.display = "inline";
        setTimeout("document.getElementsByClassName('firstTip')[0].style.display = 'none'",1500);
    }else{
        document.getElementById(nowId).style.display = "none";
        nowId = parseInt(nowId)-1;
        document.getElementById(nowId).style.display = "inline";
    }
}
function right(){
    if(nowId == 11){
        var lastTip = document.getElementsByClassName("lastTip");
        lastTip[0].style.display = "inline";
        setTimeout("document.getElementsByClassName('lastTip')[0].style.display = 'none'",1500);
    }else{
        document.getElementById(nowId).style.display = "none";
        nowId = parseInt(nowId)+1;
        document.getElementById(nowId).style.display = "inline";
    }
}

