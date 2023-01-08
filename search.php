<?php
//error_reporting(E_ERROR | E_PARSE);
$database = new PDO('mysql:dbname=medical;host=sergisa.ru', 'user15912_sergey', 'isakovs');
$database->exec('SET CHARACTER SET UTF8');
if (array_key_exists('keyword', $_GET)) {
    $keyword = $_GET['keyword'];
    $patient = $database->query("SELECT * FROM patient WHERE identifier LIKE '%$keyword%' OR description LIKE '%$keyword%'", PDO::FETCH_ASSOC)->fetchAll();
    echo json_encode($patient, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}