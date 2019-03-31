<?php
header('Content-Type: application/json');
$time = '2019-05-01 00:00:00';//截止时间
if(date("Y-m-d H:i:s")>$time){
    echo json_encode(["check"=>"true"]);
}else{
    echo json_encode(["check"=>"false"]);
}
