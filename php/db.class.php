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

    public function checkPhone($phone){
        return preg_match('/^1[0-9]{10}$/',$phone);
    }

    public function checkDorm($dorm){
        return preg_match('/^C([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i',$dorm);
    }
}