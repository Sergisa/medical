(() => {
    'use strict'

    function checkDecimalValidity(field, event) {
        if (!/^\d+([,.]+\d+)+$/.test(field.value)) {
            console.error("Неверное значение")
            field.setCustomValidity("Введите десятичное значение")
            event.preventDefault()
            event.stopPropagation()
            return false
        } else {
            console.log("Нет ошибки")
            field.setCustomValidity("");
        }
    }

    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            const field = form.querySelector('.expectingDecimal');
            if (field) {
                field.addEventListener('input', function (event) {
                    checkDecimalValidity(event.currentTarget, event)
                })
                checkDecimalValidity(field, event)
            }
            form.classList.add('was-validated')
        }, false)
    })
})()

function fillData(data) {
    $('#identifier').val(data.identifier)
    $('#IIC').val(data.IIC)
    $('#description').val(data.description)
    $('#age').val(data.age)
    $('#erythrocytes').val(data.erythrocytes)
    $('#hemoglobin').val(data.hemoglobin)
    $('#pulse').val(data.pulse)
    $('#hematocrit').val(data.hematocrit)
    $('#bloodArterialPressure').val(data.bloodArterialPressure)
    $(`input[name="gender"]#${data.gender}`).attr('checked', true)
    $('#coffeeVomit').attr('checked', data.coffeeVomit === 1)
    $('#melena').attr('checked', data.melena === 1)
    $('#lossConsciousness').attr('checked', data.lossConsciousness === 1)
    $('#chronicHeartFailure').attr('checked', data.chronicHeartFailure === 1)
    $('#cardiacIschemia').attr('checked', data.cardiacIschemia === 1)
    $('#kidneyFailure').attr('checked', data.kidneyFailure === 1)
    $('#liverFailure').attr('checked', data.liverFailure === 1)
    $('#metastaticCancer').attr('checked', data.metastaticCancer === 1)
    $('#pathologicalChanges').attr('checked', data.pathologicalChanges === 1)
    $('#aorticProsthesis').attr('checked', data.aorticProsthesis === 1)
    $('#heartDefects').attr('checked', data.heartDefects === 1)
    $('#heartValvesProsthesis').attr('checked', data.heartValvesProsthesis === 1)
    $('#additionalIllness').attr('checked', data.additionalIllness === 1)
    $('#bloodVomit').attr('checked', data.bloodVomit === 1)
    $('#hematohesia').attr('checked', data.hematohesia === 1)
    $('#blackFeces').attr('checked', data.blackFeces === 1)
    $('#collaptoidState').attr('checked', data.collaptoidState === 1)
    $('#gastrointestinalUcler').attr('checked', data.gastrointestinalUcler === 1)
    $('#paleSkin').attr('checked', data.paleSkin === 1)
    $('#hiddenBleeding').attr('checked', data.hiddenBleeding === 1)
    $('#stickySweat').attr('checked', data.stickySweat === 1)
    $('#anamnesisGastrointestinalUpperBleeding').attr('checked', data.anamnesisGastrointestinalUpperBleeding === 1)
    $('#anamnesisGastrointestinalUndefinedBleeding').attr('checked', data.anamnesisGastrointestinalUndefinedBleeding === 1)
    $('#sign32').attr('checked', data.v32 === 1)
    $('#sign33').attr('checked', data.v33 === 1)
    $('#sign34').attr('checked', data.v34 === 1)
    $('#sign35').attr('checked', data.v35 === 1)
    $('#sign36').attr('checked', data.v36 === 1)
    $('#sign37').attr('checked', data.v37 === 1)
    $('#sign38').attr('checked', data.v38 === 1)
    $('#sign39').attr('checked', data.v39 === 1)
    $('#sign40').attr('checked', data.v40 === 1)
    $('#sign41').attr('checked', data.v41 === 1)
    $('#sign42').attr('checked', data.v42 === 1)
    $('#sign43').attr('checked', data.v43 === 1)
    $('#sign44').attr('checked', data.v44 === 1)
    $('#sign45').attr('checked', data.v45 === 1)
    $('#sign46').attr('checked', data.v46 === 1)
    $('#sign47').attr('checked', data.v47 === 1)
    $('#sign48').attr('checked', data.v48 === 1)
    $('#sign49').attr('checked', data.v49 === 1)
    $('#ASA1').attr('checked', data.ASA1 === 1)
    $('#ASA2').attr('checked', data.ASA2 === 1)
    $('#ASA3').attr('checked', data.ASA3 === 1)
    $('#ASA4').attr('checked', data.ASA4 === 1)
    $('#ASA5').attr('checked', data.ASA5 === 1)
    $('#ASA6').attr('checked', data.ASA6 === 1)
    $('#E').attr('checked', data.E === 1)
}

function collectData() {
    return {
        identifier: $('#identifier').val(),
        IIC: $('#IIC').val(),
        description: $('#description').val(),
        erythrocytes: parseFloat($('#erythrocytes').val().replaceAll(',', '.')),
        hemoglobin: parseFloat($('#hemoglobin').val().replaceAll(',', '.')),
        pulse: parseFloat($('#pulse').val().replaceAll(',', '.')),
        hematocrit: parseFloat($('#hematocrit').val().replaceAll(',', '.')),

        age: parseFloat($('#age').val()),
        coffeeVomit: $('#coffeeVomit').is(':checked'),
        melena: $('#melena').is(':checked'),
        lossConsciousness: $('#lossConsciousness').is(':checked'),
        bloodArterialPressure: parseFloat($('#bloodArterialPressure').val().replaceAll(',', '.')),

        chronicHeartFailure: $('#chronicHeartFailure').is(':checked'),
        cardiacIschemia: $('#cardiacIschemia').is(':checked'),
        kidneyFailure: $('#kidneyFailure').is(':checked'),
        liverFailure: $('#liverFailure').is(':checked'),
        metastaticCancer: $('#metastaticCancer').is(':checked'),
        pathologicalChanges: $('#pathologicalChanges').is(':checked'),
        aorticProsthesis: $('#aorticProsthesis').is(':checked'),
        heartDefects: $('#heartDefects').is(':checked'),
        heartValvesProsthesis: $('#heartValvesProsthesis').is(':checked'),
        additionalIllness: $('#additionalIllness').is(':checked'),

        bloodVomit: $('#bloodVomit').is(':checked'),
        hematohesia: $('#hematohesia').is(':checked'),
        blackFeces: $('#blackFeces').is(':checked'),
        collaptoidState: $('#collaptoidState').is(':checked'),
        gastrointestinalUcler: $('#gastrointestinalUcler').is(':checked'),
        paleSkin: $('#paleSkin').is(':checked'),
        hemoglobinFalls: parseFloat($('#hemoglobin').val().replaceAll(',', '.')) < 100,
        hiddenBleeding: $('#hiddenBleeding').is(':checked'),
        stickySweat: $('#stickySweat').is(':checked'),

        gender: $('input[name="gender"]:checked').attr('id'),
        anamnesisGastrointestinalUpperBleeding: $('#anamnesisGastrointestinalUpperBleeding').is(':checked'),
        anamnesisGastrointestinalUndefinedBleeding: $('#anamnesisGastrointestinalUndefinedBleeding').is(':checked'),

        v32: $('#sign32').is(':checked'),
        v33: $('#sign33').is(':checked'),
        v34: $('#sign34').is(':checked'),
        v35: $('#sign35').is(':checked'),
        v36: $('#sign36').is(':checked'),
        v37: $('#sign37').is(':checked'),
        v38: $('#sign38').is(':checked'),
        v39: $('#sign39').is(':checked'),
        v40: $('#sign40').is(':checked'),
        v41: $('#sign41').is(':checked'),
        v42: $('#sign42').is(':checked'),
        v43: $('#sign43').is(':checked'),
        v44: $('#sign44').is(':checked'),
        v45: $('#sign45').is(':checked'),
        v46: $('#sign46').is(':checked'),
        v47: $('#sign47').is(':checked'),
        v48: $('#sign48').is(':checked'),
        v49: $('#sign49').is(':checked'),

        ASA1: $('#ASA1').is(':checked'),
        ASA2: $('#ASA2').is(':checked'),
        ASA3: $('#ASA3').is(':checked'),
        ASA4: $('#ASA4').is(':checked'),
        ASA5: $('#ASA5').is(':checked'),
        ASA6: $('#ASA6').is(':checked'),
        E: $('#E').is(':checked'),
        hasResearchData: function () {
            return this.v32 ||
                this.v33 ||
                this.v34 ||
                this.v35 ||
                this.v36 ||
                this.v37 ||
                this.v38 ||
                this.v39 ||
                this.v40 ||
                this.v41 ||
                this.v42 ||
                this.v43 ||
                this.v44 ||
                this.v45 ||
                this.v46 ||
                this.v47 ||
                this.v48
        }
    }
}

if (typeof exports === 'object') {
    module.exports = {collectData}
}
