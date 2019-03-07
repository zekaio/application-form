<?php
class db
{
    public $localhost = "127.0.0.1";
    public $username = "root";
    public $password = "ZeKai2068";
    public $database = "application-form";

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
    public function Query($sql)
    {
        $db = new mysqli($this->localhost,$this->username,$this->password,$this->database);
        $db->set_charset("utf8mb4");
        $result = $db->query($sql);
        return $result;
        $db->close();
    }
}