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
    // echo $name;
    // echo $sex;
    // echo $college;
    // echo $dorm;
    // echo $grade;
    // echo $phone;
    // echo $first;
    // echo $second;
    // echo $intro;
//     $sql = "INSERT INTO `info` (`name`,`sex`) VALUES ('kaikai','kaikai')";
//     // $db->Query($sql);
//     // $mysqli->query($sql);


//     $stmt = $mysqli->prepare("INSERT INTO info (`name`, `sex`, `college`) VALUES (?, ?, ?)");
//     $stmt->bind_param("sss",$name,$sex,$cllege);
 
// // 设置参数并执行

// $stmt->execute();
// $stmt->close();
// $error = 0;
// }

    $query = "INSERT INTO info (`name`,`sex`,`college`,`dorm`,`grade`,`phone`,`first`,`second`,`adjust`,`intro`) VALUES (?,?,?,?,?,?,?,?,?,?)";
    $stmt = $mysqli->stmt_init();
    if(!$stmt->prepare($query)){
        $error = 2;
    }else{
        $stmt->bind_param("ssssssssss",$name,$sex,$college,$dorm,$grade,$phone,$first,$second,$adjust,$intro);
        $stmt->execute();
        $stmt->close();
        $error = 0;

    }
}
$result = ["error"=>$error];
echo json_encode($result);