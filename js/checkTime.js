var theDate = new Date();
var month = 5; //结束月份
var date = 1; //结束日期
if (
  theDate.getFullYear() >= 2019 &&
  theDate.getMonth() >= month &&
  theDate.getDate() >= date
) {
  window.location.href = htmlDdl;
} else {
  fetch(phpCheckTime, {
    method: "POST"
  })
    .then(Response => Response.json())
    .then(res => {
      if (res.check == "true") {
        window.location.href = htmlDdl;
      }
    });
}
