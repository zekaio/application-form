<?php
header('Content-Type: application/json');
include("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
    $errmsg = "数据库连接失败";
    $result = ["error"=>$error,"errmsg"=>$errmsg];
}else{
    $error = 0;
    $sql = "SELECT `college` FROM `college`";
    $res = $db->query($sql);
    $arr = $res->fetch_all();
    $num = sizeof($arr);
    $array = array();
    for($i = 0;$i<$num;$i++){
        $array[$i] = $arr[$i][0];
    }
    $result=["error"=>$error,"num"=>$num,"arr"=>$array];
}
echo json_encode($result);