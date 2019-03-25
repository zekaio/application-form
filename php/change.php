<?php
header('Content-Type: application/json');
include("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
    $res = ["error"=>$error];
}else{
$error = 0;
$mysqli = $db->Conn();
$phone = $_POST['phone'];
$name = $_POST['name'];
$array = array();
$i = 0;
$query = "SELECT * FROM info WHERE `phone`=? AND `name`=?";
$stmt = $mysqli->stmt_init();
if(!$stmt->prepare($query)){
    $error = 1;
    $res = ["error"=>$error];
}else{
    $stmt->bind_param("ss",$phone,$name);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_array(MYSQLI_NUM)){
        $array[$i] = $row;
        $i = $i+1;
    }
$num = sizeof($array);

if($num == 0){
    $res = ["num"=>$num,"error"=>$error];
}else{
    $res = [
        "num"=>$num,
        "name"=>$array[0][1],
        "sex" => $array[0][2],
        "college" => $array[0][3],
        "dorm" =>$array[0][4],
        "grade" => $array[0][5],
        "phone" => $array[0][6],
        "first" => $array[0][7],
        "second" => $array[0][8],
        "adjust" => $array[0][9],
        "intro" =>$array[0][10],
        "error"=>$error,
    ];
}
}}


echo json_encode($res);