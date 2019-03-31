<?php
header('Content-Type: application/json');
include("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
    $errmsg = "数据库连接失败";
}else{
    $error = 0;
    $mysqli = $db->Conn();
    $name = $_POST['name'];
    $sex = $_POST['sex'];
    $college = $_POST['college'];
    $dorm = $_POST['dorm'];
    $grade = $_POST['grade'];
    $phone = $_POST['phone'];
    $first = $_POST['first'];
    $second = $_POST['second'];
    $adjust = $_POST['adjust'];
    $intro = $_POST['intro'];
    $firstD = $_POST['firstD'];
    $secondD = $_POST['secondD'];
    $position = $_POST['position'];
    $nameC = $_POST['nameC'];
    $phoneC = $_POST['phoneC'];
    $firstG = $_POST['firstG'];
    $secondG = $_POST['secondG'];
    if(!($db->checkPhone($phone))){
        $error = 1;
        $errmsg = "手机号填写错误";
    }elseif(!($db->checkDorm($dorm))){
        $error = 1;
        $errmsg = "宿舍填写错误";
    }elseif($db->checkCollege($college)){
        $error = 1;
        $errmsg = "学院错误";
    }elseif($db->checkWill($first)||($second!=""&&checkWill($second))){
        $error = 1;
        $errmsg = "志愿错误";
    }else{
        $query = "UPDATE info SET `name`=?,`sex`=?,`college`=?,`dorm`=?,`grade`=?,`phone`=?,`first`=?,`second`=?,`adjust`=?,`intro`=?,`firstD`=?,`secondD`=?,`position`=?,`firstG`=?,`secondG`=? WHERE (`name`=? AND `phone`=?)";
        $stmt = $mysqli->stmt_init();
        $stmt->prepare($query);
        $stmt->bind_param("sssssssssssssssss",$name,$sex,$college,$dorm,$grade,$phone,$first,$second,$adjust,$intro,$firstD,$secondD,$position,$firstG,$secondG,$nameC,$phoneC);
        $stmt->execute();
        $stmt->close();
        $errmsg = "";
    }
}
$result = ["error"=>$error,"errmsg"=>$errmsg];
echo json_encode($result);