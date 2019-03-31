function introduction() {
  window.location.href = htmlIntro;
}
function collectinfo() {
  window.location.href = htmlCollect;
}
function change() {
  window.location.href = htmlChange;
}

window.onload = function() {
  var height =
    document.documentElement.clientHeight ||
    document.documentElement.offsetHeight;
  var bodyHeight = parseInt(
    document.getElementById("body").clientHeight ||
      document.getElementById("body").offsetHeight
  );
  var num = (height - bodyHeight) / 2;
  if (num > 0) {
    document.getElementById("body").style.marginTop = num + "px";
  }
};
window.onresize = function() {
  var height =
    document.documentElement.clientHeight ||
    document.documentElement.offsetHeight;
  var bodyHeight = parseInt(
    document.getElementById("body").clientHeight ||
      document.getElementById("body").offsetHeight
  );
  var num = (height - bodyHeight) / 2;
  if (num > 0) {
    document.getElementById("body").style.marginTop = num + "px";
  }
};
