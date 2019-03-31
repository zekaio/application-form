fetch(phpCol, {
  method: "POST"
})
  .then(Respone => Respone.json())
  .then(res => {
    if (res.error != 0) {
      alert(res.errmsg);
      window.location.reload();
    } else {
      var col = document.getElementById("collegeSelect");
      for (i = 0; i < res.num; i++) {
        col.options.add(new Option(res.arr[i], i + 1));
      }
    }
  });

fetch(phpDepart, {
  method: "POST"
})
  .then(Respone => Respone.json())
  .then(res => {
    if (res.error != 0) {
      alert(res.errmsg);
      window.location.reload();
    } else {
      var fir = document.getElementById("firstSelect");
      var sec = document.getElementById("secondSelect");
      for (i = 0; i < res.num; i++) {
        fir.options.add(new Option(res.arr[i], i + 1));
        sec.options.add(new Option(res.arr[i], i + 1));
      }
    }
  });
