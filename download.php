<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->setCellValue('A1', 'Hello my Friend!');
$sheet->fromArray([
    "ID",
    "time",
    "identifier",
    "IIC",
    "description",
    "erythrocytes",
    "hemoglobin",
    "pulse",
    "hematocrit",
    "age",
    "coffeeVomit",
    "melena",
    "lossConsciousness",
    "bloodArterialPressure",
    "chronicHeartFailure",
    "cardiacIschemia",
    "kidneyFailure",
    "liverFailure",
    "metastaticCancer",
    "pathologicalChanges",
    "aorticProsthesis",
    "heartDefects",
    "heartValvesProsthesis",
    "additionalIllness",
    "bloodVomit",
    "hematohesia",
    "blackFeces",
    "collaptoidState",
    "gastrointestinalUcler",
    "paleSkin",
    "hemoglobinFalls",
    "hiddenBleeding",
    "stickySweat",
    "gender",
    "anamnesisGastrointestinalUpperBleeding",
    "anamnesisGastrointestinalUndefinedBleeding",
    "v32",
    "v33",
    "v34",
    "v35",
    "v36",
    "v37",
    "v38",
    "v39",
    "v40",
    "v41",
    "v42",
    "v43",
    "v44",
    "v45",
    "v46",
    "v47",
    "v48",
    "v49",
    "ASA1",
    "ASA2",
    "ASA3",
    "ASA4",
    "ASA5",
    "ASA6",
    "E",
    "explicit",
    "bloodLossHardness",
    "localization",
    "finalLocalization",
    "risk",
    "hasResearchData",
    "reason"
]);
$rowIterator = $sheet->getRowIterator(2);
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="file.xlsx"');
try {
    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
} catch (\PhpOffice\PhpSpreadsheet\Writer\Exception $e) {
}
