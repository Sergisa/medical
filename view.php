<?php
//error_reporting(E_ERROR | E_PARSE);
$database = new PDO('mysql:dbname=medical;host=sergisa.ru', 'user15912_sergey', 'isakovs');
$database->exec('SET CHARACTER SET UTF8');
if (array_key_exists('id', $_GET)) {
    $id = $_GET['id'];
    $patient = $database->query("SELECT * FROM patient WHERE ID = $id", PDO::FETCH_ASSOC)->fetch();
    echo json_encode($patient, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
