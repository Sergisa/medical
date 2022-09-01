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
