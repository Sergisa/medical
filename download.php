<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$database = new PDO('mysql:dbname=medical;host=sergisa.ru', 'user15912_sergey', 'isakovs');
$patientsQuery = $database->query("SELECT * FROM patient");
$patients = $patientsQuery->fetchAll(PDO::FETCH_ASSOC);
$columns = array_keys($patients[0]);
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->fromArray(array_merge([$columns], $patients));
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="file.xlsx"');
try {
    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
} catch (\PhpOffice\PhpSpreadsheet\Writer\Exception $e) {
}
