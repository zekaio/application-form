<?php
header('Content-Type: application/json');
include("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
    $errmsg = "数据库连接出错";
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
    $firstG = $_POST['firstG'];
    $secondG = $_POST['secondG'];
    if(!($db->checkPhone($phone))){
        $error = 1;
        $errmsg = "手机号填写错误";
    }elseif(!($db->checkDorm($dorm))){
        $error = 1;
        $errmsg = "宿舍填写错误";
    }elseif($db->checkIntro($intro)){
        $error = 1;
        $errmsg = "个人介绍超过50字";
    }elseif($db->checkCollege($college)){
        $error = 1;
        $errmsg = "学院错误";
    }elseif($db->checkWill($first,$second)){
        $error = 1;
        $errmsg = "志愿错误";
    }else{
        $query = "INSERT INTO info (`name`,`sex`,`college`,`dorm`,`grade`,`phone`,`first`,`second`,`adjust`,`intro`,`firstD`,`secondD`,`position`,`firstG`,`secondG`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $stmt = $mysqli->stmt_init();
        $stmt->prepare($query);
        $stmt->bind_param("sssssssssssssss",$name,$sex,$college,$dorm,$grade,$phone,$first,$second,$adjust,$intro,$firstD,$secondD,$position,$firstG,$secondG);
        $stmt->execute();
        $stmt->close();
        $error = 0;
        $errmsg = "";
    }
}
$result = ["error"=>$error,"errmsg"=>$errmsg];
echo json_encode($result);