var nowId = 1;
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


//手指滑动
function(event){
    　　//当屏幕有多个touch或者页面被缩放过，就不执行move操作
    　　if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
    　　var touch = event.targetTouches[0];
    　　endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
    　　isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0; //isScrolling为1时，表示纵向滑动，0为横向滑动
    　　if(isScrolling === 0){
    　　　　event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
    　　　　this.slider.className = 'cnt';
    　　　　this.slider.style.left = -this.index*600 + endPos.x + 'px';
    　　}
    },