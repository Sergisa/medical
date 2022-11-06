<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$database = new PDO('mysql:dbname=medical;host=sergisa.ru', 'user15912_sergey', 'isakovs');
$database->exec('SET CHARACTER SET UTF8');
$patientsQuery = $database->query("SELECT * FROM patient");
if (
    (array_key_exists('dateEnd', $_GET) && !empty($_GET['dateEnd'])) &&
    (array_key_exists('dateStart', $_GET) && !empty($_GET['dateStart']))
) {
    $patientsQuery = $database
        ->prepare("SELECT * FROM patient WHERE time<str_to_date(:dateEnd, '%Y-%m-%d') AND time>str_to_date(:dateStart, '%Y-%m-%d')");
} else {
    $_GET = [];
}

$patientsQuery->execute($_GET);
$patients = $patientsQuery->fetchAll(PDO::FETCH_ASSOC);
$columns = array_keys($patients[0]);
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
array_walk($patients, function (&$item, $key) {
    if (!$item) {
        $item = 0;
    }
});
$sheet->fromArray(array_merge([$columns], $patients));
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="export_data.xlsx"');
try {
    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
} catch (\PhpOffice\PhpSpreadsheet\Writer\Exception $e) {
}

