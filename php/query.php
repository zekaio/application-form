<?php
header('Content-Type: application/json');
include_once("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
    $res = ["error"=>$error,"errmsg"=>"数据库连接出错"];
}else{
    $error = 0;
    $mysqli = $db->Conn();
    $phone = $_POST['phone'];
    if(!($db->checkPhone($phone))){
        $error = 1;
        $res = ["error"=>$error,"errmsg"=>"手机号填写错误"];
    }else{
        $name = $_POST['name'];
        $array = array();
        $i = 0;
        $query = "SELECT * FROM info WHERE `phone`=? AND `name`=?";
        $stmt = $mysqli->stmt_init();
        $stmt->prepare($query);
        $stmt->bind_param("ss",$phone,$name);
        $stmt->execute();
        $result = $stmt->get_result();
        $array = mysqli_fetch_all($result);
        $num = sizeof($array);
        
        if($num == 0){
            $res = ["num"=>$num,"error"=>'1',"errmsg"=>"未查到报名信息"];
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
                "error"=>$error
            ];
        }
}}
echo json_encode($res);