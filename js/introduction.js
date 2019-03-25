var winHeight = $(window).height();
$("#background").height(winHeight);

function Skip() {
  window.location.href = "collect-info.html";
}
function Back() {
  window.location.href = "start-page.html";
}

var height = window.getComputedStyle(document.getElementById("long")).height;
var p = document.getElementsByTagName("p");
//强行让文字居中（
for(i = 0;i<p.length;i++){
  var Height = window.getComputedStyle(p[i]).height;
  var num = (parseInt(height)- parseInt(Height))/2;
  p[i].style.paddingTop = num + "px";
  p[i].style.height = parseInt(height) - num +"px";
}