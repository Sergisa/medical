<?php
include 'database.php';
function pdoSet($values): string
{
    $set = [];
    foreach ($values as $key => $value) {
        if ($value == 'true') $value = 1;
        if ($value == "") $value = 'null';
        if (gettype($value) == 'string') $value = "'$value'";
        $set [] = "`$key`=$value";
    }
    return "SET " . implode(',', $set);

//    return "(" . implode(',', array_keys($values)) . ") VALUES (" . implode(',', array_values($values)) . ")";
}

$data = array_merge($_POST['data'], $_POST['conclusion']);
$sql = "INSERT INTO patient " . pdoSet($data);

echo "SQL" . $sql;
$stm = getConnection()->prepare($sql);
$stm->execute();


