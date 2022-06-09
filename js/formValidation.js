(() => {
    'use strict'

    function checkDecimalValidity(field, event) {
        if (!/^\d+[,.]+\d+$/.test(field.value)) {
            console.error("Неверное значение ")
            field.setCustomValidity("Введите десятичное значение")
            event.preventDefault()
            event.stopPropagation()
            return false
        } else {
            console.log("Нет ошибки EDIT")
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
        erythrocytes: parseFloat($('#erythrocytes').val().replaceAll(',', '.')),
        hemoglobin: parseFloat($('#hemoglobin').val()),
        pulse: parseFloat($('#pulse').val()),
        hematocrit: parseFloat($('#hematocrit').val()),

        age: parseFloat($('#age').val()),
        coffeeVomit: $('#coffeeVomit').is(':checked'),
        melena: $('#melena').is(':checked'),
        lossConsciousness: $('#lossConsciousness').is(':checked'),
        bloodArterialPressure: parseFloat($('#bloodArterialPressure').val()),
        additionalIllness: $('#additionalIllness').is(':checked'),

        bloodVomit: $('#bloodVomit').is(':checked'),
        hematohesia: $('#hematohesia').is(':checked'),
        collaptoidState: $('#collaptoidState').is(':checked'),
        gastrointestinalUcler: $('#gastrointestinalUcler').is(':checked'),
        paleSkin: $('#paleSkin').is(':checked'),
        hemoglobinFalls: this.hemoglobin < 100,
        hiddenBleeding: $('#hiddenBleeding').is(':checked'),
        stickySweat: $('#stickySweat').is(':checked'),

        gender: $('input[name="gender"]:checked').attr('id'),
        anamnesisGastrointestinalUpperBleeding: $('#anamnesisGastrointestinalUpperBleeding').is(':checked'),
        anamnesisGastrointestinalUndefinedBleeding: $('#anamnesisGastrointestinalUndefinedBleeding').is(':checked'),

        v21: $('#sign21').is(':checked'),
        v22: $('#sign22').is(':checked'),
        v23: $('#sign23').is(':checked'),
        v24: $('#sign24').is(':checked'),
        v25: $('#sign25').is(':checked'),
        v26: $('#sign26').is(':checked'),
        v27: $('#sign27').is(':checked'),
        v28: $('#sign28').is(':checked'),
        v29: $('#sign29').is(':checked'),
        v30: $('#sign30').is(':checked'),
        v31: $('#sign31').is(':checked'),
        v32: $('#sign32').is(':checked'),
        v33: $('#sign33').is(':checked'),
        v34: $('#sign34').is(':checked'),
        v35: $('#sign35').is(':checked'),
        hasResearchData: function () {
            return this.v21 ||
                this.v22 ||
                this.v23 ||
                this.v24 ||
                this.v25 ||
                this.v26 ||
                this.v27 ||
                this.v28 ||
                this.v29 ||
                this.v30 ||
                this.v31 ||
                this.v32 ||
                this.v33 ||
                this.v34 ||
                this.v35
        }
    }
}
