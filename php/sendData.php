<?php
header('Content-Type: application/json');
include("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
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
    $query = "INSERT INTO info (`name`,`sex`,`college`,`dorm`,`grade`,`phone`,`first`,`second`,`adjust`,`intro`,`firstD`,`secondD`,`position`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = $mysqli->stmt_init();
    if(!$stmt->prepare($query)){
        $error = 2;
    }else{
        $stmt->bind_param("sssssssssssss",$name,$sex,$college,$dorm,$grade,$phone,$first,$second,$adjust,$intro,$firstD,$secondD,$position);
        $stmt->execute();
        $stmt->close();
        $error = 0;
    }
}
$result = ["error"=>$error];
echo json_encode($result);