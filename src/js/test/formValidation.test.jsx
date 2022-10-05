global.$ = require('jquery')
const formValidation = require('../formValidation')
const test = require('@jest/globals').test
const expect = require('@jest/globals').expect

function prepareDOM(elements) {
    document.body.innerHTML = "";
    for (const element in elements) {
        const input = document.createElement('input');
        input.value = elements[element]
        input.id = element
        document.body.appendChild(input);
    }
}

test("Десятичные значения читаются (.)", () => {
    prepareDOM({
        erythrocytes: "11.2",
        hemoglobin: "12.2",
        pulse: "13.2",
        bloodArterialPressure: "14.2",
        hematocrit: "15.2"
    })
    expect(formValidation.collectData().erythrocytes).toBe(11.2)
    expect(formValidation.collectData().hemoglobin).toBe(12.2)
    expect(formValidation.collectData().pulse).toBe(13.2)
    expect(formValidation.collectData().bloodArterialPressure).toBe(14.2)
    expect(formValidation.collectData().hematocrit).toBe(15.2)
})
test("Десятичные значения читаются (,)", () => {
    prepareDOM({
        erythrocytes: "11,2",
        hemoglobin: "12,2",
        pulse: "13,2",
        bloodArterialPressure: "14,2",
        hematocrit: "15,2"
    })
    expect(formValidation.collectData().erythrocytes).toBe(11.2)
    expect(formValidation.collectData().hemoglobin).toBe(12.2)
    expect(formValidation.collectData().pulse).toBe(13.2)
    expect(formValidation.collectData().bloodArterialPressure).toBe(14.2)
    expect(formValidation.collectData().hematocrit).toBe(15.2)
})
test("Целочисленные значения считываются", () => {
    prepareDOM({
        erythrocytes: "11",
        hemoglobin: "12",
        pulse: "13",
        bloodArterialPressure: "14",
        hematocrit: "15"
    });
    expect(formValidation.collectData().erythrocytes).toBe(11)
    expect(formValidation.collectData().hemoglobin).toBe(12)
    expect(formValidation.collectData().pulse).toBe(13)
    expect(formValidation.collectData().bloodArterialPressure).toBe(14)
    expect(formValidation.collectData().hematocrit).toBe(15)
})
test("Hemoglobin falls", () => {
    prepareDOM({
        erythrocytes: "11",
        hemoglobin: "12",
        pulse: "13",
        bloodArterialPressure: "14",
        hematocrit: "15"
    });
    expect(formValidation.collectData().hemoglobinFalls).toBe(true);
    prepareDOM({
        erythrocytes: "11",
        hemoglobin: "102",
        pulse: "13",
        bloodArterialPressure: "14",
        hematocrit: "15"
    });
    expect(formValidation.collectData().hemoglobinFalls).toBe(false)
})