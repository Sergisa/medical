require('../arrayExtension')
const builder = require('../conclusionBuilder')

test("Опеделение причины кровотечения", () => {
    expect(builder.bleedReasonResolver({
        v21: true,
        v22: false,
        v23: false,
        v24: false,
        v25: false,
        v26: false,
        v27: false,
        v28: false,
        v29: false,
        v30: false,
        v31: false,
        v32: true,
        v33: true,
        v34: false,
        v35: false,
    })).toBe('эрозивно-язвенные поражения тонкой/толстой кишки')
    expect(builder.bleedReasonResolver({
        v21: true,
        v22: true,
        v23: true,
        v24: false,
        v25: false,
        v26: false,
        v27: true,
        v28: false,
        v29: false,
        v30: true,
        v31: true,
        v32: true,
        v33: true,
        v34: false,
        v35: false,
    })).toBe('дивертикулы ЖКТ')
    expect(builder.bleedReasonResolver({
        v21: false,
        v22: false,
        v23: false,
        v24: false,
        v25: false,
        v26: false,
        v27: false,
        v28: false,
        v29: false,
        v30: false,
        v31: false,
        v32: false,
        v33: false,
        v34: false,
        v35: false,
    })).toBe('опухолевые заболевания ЖКТ')
    expect(builder.bleedReasonResolver({
        v21: false,
        v22: false,
        v23: false,
        v24: false,
        v25: false,
        v26: true,
        v27: false,
        v28: true,
        v29: false,
        v30: false,
        v31: false,
        v32: false,
        v33: false,
        v34: false,
        v35: false,
    })).toBe('эрозивно-язвенные поражения верхних отделов ЖКТ')
    expect(builder.bleedReasonResolver({
        v21: true,
        v22: true,
        v23: true,
        v24: true,
        v25: true,
        v26: true,
        v27: false,
        v28: true,
        v29: true,
        v30: true,
        v31: true,
        v32: true,
        v33: true,
        v34: true,
        v35: false,
    })).toBe('варикозное расширение вен ЖКТ')
})
test("Опеделение локализации кровотечения", () => {
    expect(builder.localizationResolver({
        hemoglobin: 122,
        gender: 'female',
        hematohesia: false,
        anamnesisGastrointestinalUpperBleeding: false,
        anamnesisGastrointestinalUndefinedBleeding: false,
        melena: false,
        coffeeVomit: false,
        bloodVomit: false,
    }).result).toBe('средних')

    expect(builder.localizationResolver({
        hemoglobin: 141,
        gender: 'male',
        hematohesia: false,
        anamnesisGastrointestinalUpperBleeding: false,
        anamnesisGastrointestinalUndefinedBleeding: false,
        melena: false,
        coffeeVomit: false,
        bloodVomit: false,
    }).result).toBe('средних')

    expect(builder.localizationResolver({
        hemoglobin: 130,
        gender: 'male',
        hematohesia: false,
        anamnesisGastrointestinalUpperBleeding: false,
        anamnesisGastrointestinalUndefinedBleeding: false,
        melena: false,
        coffeeVomit: false,
        bloodVomit: true,
    }).result).toBe('верхних')
})
