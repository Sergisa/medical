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
            field.addEventListener('input', function (event) {
                checkDecimalValidity(event.currentTarget, event)
            })
            checkDecimalValidity(field, event)
            form.classList.add('was-validated')
        }, false)
    })
})()

function collectData() {
    return {
        identifier: $('#identifier').val(),
        erythrocytes: parseFloat($('#erythrocytes').val().replaceAll(',', '.')),
        hemoglobin: parseFloat($('#hemoglobin').val()),
        pulse: parseFloat($('#pulse').val()),
        hematocrit: parseFloat($('#hematocrit').val()),

        age: parseFloat($('#age').val()),
        coffeeVomit: $('#coffeeVomit').is(':checked'),
        melena: $('#melena').is(':checked'),
        lossConsciousness: $('#lossConsciousness').is(':checked'),
        bloodArterialPressure: parseFloat($('#bloodArterialPressure').val()),

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
        hemoglobinFalls: this.hemoglobin < 100,
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

function collectFinalData() {
    return {
        r1: $('#r1').is(':checked'),
        r2: $('#r2').is(':checked'),
        r3: $('#r3').is(':checked'),
        r4: $('#r4').is(':checked'),
        hasData: function () {
            return this.r1 || this.r2 || this.r3 || this.r4;
        },
        hasChecked: function () {
            return this.hasData();
        }
    }
}
