<?php
$host = 'sergisa.ru';
$db = 'medical';
$user = 'user15912_sergey';
$pass = 'isakovs';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
$dbh = new PDO($dsn, $user, $pass, $opt);
echo json_encode($_POST);

function pdoSet($values)
{
    $set = [];
    foreach ($values as $key => $value) {
        if ($value == 'true') $value = 1;
        if ($value == "") $value = 'null';
        if(gettype($value)=='string') $value = "'$value'";
        $set []= "`$key`=$value";
    }
    return "SET ".implode(',', $set);

//    return "(" . implode(',', array_keys($values)) . ") VALUES (" . implode(',', array_values($values)) . ")";
}

$data = array_merge($_POST['data'], $_POST['conclusion']);
$sql = "INSERT INTO patient " . pdoSet($data);

echo "SQL" . $sql;
$stm = $dbh->prepare($sql);
$stm->execute();


