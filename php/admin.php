<?php
header('Content-Type: application/json');
include("db.class.php");
error_reporting(0);
$db = new db();
$conn = $db->ConnCheck();
if(!$conn){
    $error = 1;
    $errmsg = "数据库连接失败";
    $result=["error"=>$error,"errmsg"=>$errmsg];
}else{
    $error = 0;
    $mysqli = $db->Conn();
    $choose = $_POST['choose'];
    $data = $_POST['data'];
    $position = $_POST['position'];
    $group = $_POST['group'];
    $arr = array();$array = array();
    $t = 0;$i = 0;$sec = 0;$fir = 0;
    switch($choose){
        case "all":
            $sql = "SELECT * FROM info";
            $res = $db->Query($sql);
            break;
        case "bumen":
        if($group == ""){
            if($position == ""){
                $query = "SELECT * FROM info WHERE `firstD`=?";
                $stmt = $mysqli->stmt_init();
                $stmt->prepare($query);
                $stmt->bind_param("s",$data);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_array(MYSQLI_NUM)){
                    $array[$i] = $row;
                    $i = $i+1;
                }
                $stmt->close();
                $num = sizeof($array);
                $fir = $num;//第一志愿是的人数

                $query = "SELECT * FROM info WHERE `secondD`=? AND `firstD`!=?";
                $stmt = $mysqli->stmt_init();
                $stmt->prepare($query);
                $stmt->bind_param("ss",$data,$data);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_array(MYSQLI_NUM)){
                    $array[$num] = $row;
                    $num = $num+1;//总人数
                    $sec = $sec+1;//只有第二志愿是的人数
                }
                $stmt->close();
            }else{
                //分南北校技术部
                $query = "SELECT * FROM info WHERE `firstD`=? AND `position`=?";
                $stmt = $mysqli->stmt_init();
                $stmt->prepare($query);
                $stmt->bind_param("ss",$data,$position);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_array(MYSQLI_NUM)){
                    $array[$i] = $row;
                    $i = $i+1;
                }
                $stmt->close();
                $num = sizeof($array);
                $fir = $num;

                $query = "SELECT * FROM info WHERE `firstD`!=? AND `secondD`=? AND `position`=?";
                $stmt = $mysqli->stmt_init();
                $stmt->prepare($query);
                $stmt->bind_param("sss",$data,$data,$position);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_array(MYSQLI_NUM)){
                    $array[$num] = $row;
                    $num = $num+1;
                    $sec = $sec+1;
                }
                $stmt->close();
            }
        }else{
            if($position == ""){
                $query = "SELECT * FROM info WHERE `firstD`=? AND `firstG`=?";
                $stmt = $mysqli->stmt_init();
                $stmt->prepare($query);
                $stmt->bind_param("ss",$data,$group);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_array(MYSQLI_NUM)){
                    $array[$i] = $row;
                    $i = $i+1;
                }
                $stmt->close();
                $num = sizeof($array);
                $fir = $num;//第一志愿是的人数

                $query = "SELECT * FROM info WHERE `secondD`=? AND `firstD`!=?  AND `secondG`=?" ;
                $stmt = $mysqli->stmt_init();
                $stmt->prepare($query);
                $stmt->bind_param("sss",$data,$data,$group);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_array(MYSQLI_NUM)){
                    $array[$num] = $row;
                    $num = $num+1;//总人数
                    $sec = $sec+1;//只有第二志愿是的人数
                }
                $stmt->close();
            }else{
                //分南北校技术部
                $query = "SELECT * FROM info WHERE `firstD`=? AND `position`=?  AND `firstG`=?";
                $stmt = $mysqli->stmt_init();
                $stmt->prepare($query);
                $stmt->bind_param("sss",$data,$position,$group);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_array(MYSQLI_NUM)){
                    $array[$i] = $row;
                    $i = $i+1;
                }
                $stmt->close();
                $num = sizeof($array);
                $fir = $num;

                $query = "SELECT * FROM info WHERE `firstD`!=? AND `secondD`=? AND `position`=?  AND `secondG`=?";
                $stmt = $mysqli->stmt_init();
                $stmt->prepare($query);
                $stmt->bind_param("ssss",$data,$data,$position,$group);
                $stmt->execute();
                $result = $stmt->get_result();
                while ($row = $result->fetch_array(MYSQLI_NUM)){
                    $array[$num] = $row;
                    $num = $num+1;
                    $sec = $sec+1;
                }
                $stmt->close();
            }
            }
            break;
        case "name":
            $query = "SELECT * FROM info WHERE `name`=?";
            $stmt = $mysqli->stmt_init();
            $stmt->prepare($query);
            $stmt->bind_param("s",$data);
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_array(MYSQLI_NUM)){
                $array[$i] = $row;
                $i = $i+1;
            }
            $stmt->close();
            break;
        case "phone":
            $query = "SELECT * FROM info WHERE `phone`=?";
            $stmt = $mysqli->stmt_init();
            $stmt->prepare($query);
            $stmt->bind_param("s",$data);
            $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_array(MYSQLI_NUM)){
                $array[$i] = $row;
                $i = $i+1;
            }
            $stmt->close();
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
                "adjust" => $row['adjust'],
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
                "adjust" => $array[$n][9],
                "intro" =>$array[$n][10],
                ];
        }
    }
    $Num = count($arr);
    $result = ["num"=>$Num,"error"=>$error,"arr"=>$arr,"fir"=>$fir,"sec"=>$sec];
}
echo json_encode($result);
