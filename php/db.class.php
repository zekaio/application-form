<?php
class db
{
    private $localhost = "";
    private $username = "";
    private $password = "";
    private $database = "application-form";

    public function ConnCheck(){
        $db = new mysqli($this->localhost,$this->username,$this->password,$this->database);
        if($db->connect_error){
            $db->set_charset("utf8mb4");
            return false;
        }else{
        return true;
        $db->close();
        }
    }

    public function Conn(){
        $db = new mysqli($this->localhost,$this->username,$this->password,$this->database);
        $db->set_charset("utf8mb4");
        return $db;
    }

    public function Query($sql){
        $db = new mysqli($this->localhost,$this->username,$this->password,$this->database);
        $db->set_charset("utf8mb4");
        $result = $db->query($sql);
        $db->close();
        return $result;
    }
    //检验手机号
    public function checkPhone($phone){
        return preg_match('/^1[0-9]{10}$/',$phone);
    }
    //检验宿舍
    public function checkDorm($dorm){
        return preg_match('/^C([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i',$dorm);
    }
    //检验自我介绍长度
    public function checkIntro($intro){
        if(strlen($intro)>50){
            return true;
        }else{
            return false;
        }
    }
    //检验学院
    public function checkCollege($college){
        $db = new mysqli($this->localhost,$this->username,$this->password,$this->database);
        $sql = "SELECT `college` FROM `college`";
        $res = $db->query($sql);
        $arr = $res->fetch_all();
        $num = sizeof($arr);
        $check = true;
        for($i = 0;$i<$num;$i++){
            if($college == $arr[$i][0]){
                $check = false;
            }
        }
        return $check;
    }
    //检验志愿
    public function checkWill($will){
        $db = new mysqli($this->localhost,$this->username,$this->password,$this->database);
        $sql = "SELECT `depart` FROM `depart`";
        $res = $db->query($sql);
        $arr = $res->fetch_all();
        $num = sizeof($arr);
        $check = true;
        for($i = 0;$i<$num;$i++){
            if($college == $arr[$i][0]){
                $check = false;
            }
        }
        return $check;
    }
}