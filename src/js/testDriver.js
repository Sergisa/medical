function fillTestData() {
    $('#aprioriForm').get(0).reset();
    $('#erythrocytes').val(5.4);
    $('#hemoglobin').val(124);
    $('#pulse').val(50);
    $('#hematocrit').val(34);
    $('#age').val(36);
    $('#bloodArterialPressure').val(120);
    $('#lossConsciousness').get(0).checked = true;
    $('#anamnesisGastrointestinalUndefinedBleeding').get(0).checked = true;
    $('input#male').get(0).checked = true;
}
