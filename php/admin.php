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
$choose = $_POST['choose'];
$data = $_POST['data'];
$arr = array();$array = array();
$t = 0;$i = 0;
switch($choose){
    case "all":
        $sql = "SELECT * FROM info";
        $res = $db->Query($sql);
        break;
    case "bumen":
        $query = "SELECT * FROM info WHERE `first`=? OR `second`=?";
        $stmt = $mysqli->stmt_init();
        if(!$stmt->prepare($query)){
            $error = 2;
        }else{
            $stmt->bind_param("ss",$data,$data);
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_array(MYSQLI_NUM)){
                $array[$i] = $row;
                $i = $i+1;
            }
        $stmt->close();
        }
        break;
    case "name":
        $query = "SELECT * FROM info WHERE `name`=?";
        $stmt = $mysqli->stmt_init();
        if(!$stmt->prepare($query)){
            $error = 2;
        }else{
            $stmt->bind_param("s",$data);
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_array(MYSQLI_NUM)){
                $array[$i] = $row;
                $i = $i+1;
            }
        $stmt->close();
        }
        break;
    case "phone":
        $query = "SELECT * FROM info WHERE `phone`=?";
        $stmt = $mysqli->stmt_init();
        if(!$stmt->prepare($query)){
            $error = 2;
        }else{
            $stmt->bind_param("s",$data);
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_array(MYSQLI_NUM)){
                $array[$i] = $row;
                $i = $i+1;
            }
        $stmt->close();
        }
        break;
}
if($choose == "all"){
    while($row = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        $arr[$t] = [
            "id" => $row['id'],
            "name" => $row['name'],
            "sex" => $row['sex'],
            "college" => $row['college'],
            "dorm" => $row['dorm'],
            "grade" => $row['grade'],
            "phone" => $row['phone'],
            "first" => $row['first'],
            "second" => $row['second'],
            "intro" => $row['intro'],
        ];
        $t = $t + 1;
    }
}else{
    $num = count($array);
    for($n=0;$n<$num;$n++){
        $arr[$n] = [
            "id" => $array[$n][0],
            "name" => $array[$n][1],
            "sex" => $array[$n][2],
            "college" => $array[$n][3],
            "dorm" =>$array[$n][4],
            "grade" => $array[$n][5],
            "phone" => $array[$n][6],
            "first" => $array[$n][7],
            "second" => $array[$n][8],
            "intro" =>$array[$n][9],
            ];
    }
}
$Num = count($arr);
$result = ["num"=>$Num,"error"=>$error,"arr"=>$arr];
echo json_encode($result);}
