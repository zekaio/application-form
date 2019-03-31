<?php
header('Content-Type: application/json');
include("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
    $result=["error"=>$error,"errmsg"=>"数据库连接失败"];
}else{
    $error = 0;
    $mysqli = $db->Conn();
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    if(!($db->checkPhone($phone))){
        $error = 1;
        $result=["error"=>$error,"errmsg"=>"手机号输入错误"];
    }else{
        $array = array();
        $i = 0;
        $query = "SELECT * FROM info WHERE `name`=? AND `phone`=?";
        $stmt = $mysqli->stmt_init();
        $stmt->prepare($query);
        $stmt->bind_param("ss",$name,$phone);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_array(MYSQLI_NUM)){
            $array[$i] = $row;
            $i = $i+1;
        }
        if(sizeof($array) == 0){
            $msg = "false";
            $errmsg = "";
        }else{
            $msg = "true";
            $errmsg = "你已经报名过了";
        }
        $result = ["error"=>$error,"msg"=>$msg,"errmsg"=>$errmsg];
    }
}
echo json_encode($result);