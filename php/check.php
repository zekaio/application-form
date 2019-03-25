<?php
header('Content-Type: application/json');
include("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
    $result=["error"=>$error];
}else{
$error = 0;
$mysqli = $db->Conn();
$name = $_POST['name'];
$phone = $_POST['phone'];
$array = array();
$i = 0;

$query = "SELECT * FROM info WHERE `name`=? AND `phone`=?";
$stmt = $mysqli->stmt_init();
if(!$stmt->prepare($query)){
    $error = 1;
    $result=["error"=>$error];
}else{
    $stmt->bind_param("ss",$name,$phone);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_array(MYSQLI_NUM)){
        $array[$i] = $row;
        $i = $i+1;
    }
    if(sizeof($array) == 0){
        $msg = "false";
    }else{
        $msg = "true";
    }
    $result = ["error"=>$error,"msg"=>$msg];
}
echo json_encode($result);