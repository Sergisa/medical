let testButton = $('<button></button>', {
    class: "test btn btn-info",
    id: 'testButton',
    text: 'T',
    type: 'button'
}).css({
    position: 'absolute',
    color: '#2c3e50',
    fontWeight: 'bolder',
    top: '8px',
    right: '8px'
});
testButton.appendTo(location.host !== "sergisa.smrtp.ru" ? $('#aprioriForm').css('position', 'relative') : null).click(fillTestData)
$(document).keypress(function (event) {
    if (event.originalEvent.key === 'T' && event.originalEvent.shiftKey) {
        testButton.appendTo($('#aprioriForm').css('position', 'relative')).click(fillTestData)
    }
});

let testDataPack = [{
    erythrocytes: 5.4,
    hemoglobin: 124,
    pulse: 50,
    hematocrit: 34,
    age: 36,
    bloodArterialPressure: 120,
    coffeeVomit: true,
    bloodVomit: true,
    male: true,
}, {
    erythrocytes: 5.4,
    hemoglobin: 124,
    pulse: 50,
    hematocrit: 34,
    age: 36,
    bloodArterialPressure: 120,
    lossConsciousness: true,
    anamnesisGastrointestinalUndefinedBleeding: true,
    male: true,
}]

function fillTestData() {
    /*$('#aprioriForm').get(0).reset();
    $('#erythrocytes').val(5.4);
    $('#hemoglobin').val(124);
    $('#pulse').val(50);
    $('#hematocrit').val(34);
    $('#age').val(36);
    $('#bloodArterialPressure').val(120);
    $('#lossConsciousness').get(0).checked = true;
    $('#anamnesisGastrointestinalUndefinedBleeding').get(0).checked = true;
    $('input#male').get(0).checked = true;*/

    /*for(const sign in testDataPack[Math.floor(Math.random() * testDataPack.length)]){

    }*/

    $('#aprioriForm').get(0).reset();
    $('#erythrocytes').val(5.4);
    $('#hemoglobin').val(124);
    $('#pulse').val(50);
    $('#hematocrit').val(34);
    $('#age').val(36);
    $('#bloodArterialPressure').val(120);
    $('#coffeeVomit').get(0).checked = true;
    $('#bloodVomit').get(0).checked = true;
    $('input#male').get(0).checked = true;
}
