require('../arrayExtension')
const builder = require('../conclusionBuilder')

test("Опеделение причины кровотечения", () => {
    expect(builder.bleedReasonResolver({
        v32: false,
        v33: false,
        v34: false,
        v35: false,
        v36: false,
        v37: false,
        v38: false,
        v39: true,
        v40: true,
        v41: false,
        v42: false,
        v43: true,
        v44: false,
        v45: false,
        v46: true,
        v47: false,
        v48: false,
        v49: true,
    })).toEqual([5, 4, 3, 1])
    expect(builder.bleedReasonResolver({
        v39: true,
        v40: true,
        v43: true,
        v46: true,
        v49: true,
    })).toEqual([5, 4, 3, 1])
    expect(builder.bleedReasonResolver({
        v32: undefined,
        v33: undefined,
        v34: undefined,
        v35: undefined,
        v36: undefined,
        v37: undefined,
        v38: undefined,
        v39: true,
        v40: true,
        v41: undefined,
        v42: undefined,
        v43: true,
        v44: undefined,
        v45: undefined,
        v46: true,
        v47: undefined,
        v48: undefined,
        v49: true,
    })).toEqual([5, 4, 3, 1])
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
    }).result).toBe(2)

    expect(builder.localizationResolver({
        hemoglobin: 141,
        gender: 'male',
        hematohesia: false,
        anamnesisGastrointestinalUpperBleeding: false,
        anamnesisGastrointestinalUndefinedBleeding: false,
        melena: false,
        coffeeVomit: false,
        bloodVomit: false,
    }).result).toBe(2)

    expect(builder.localizationResolver({
        hemoglobin: 130,
        gender: 'male',
        hematohesia: false,
        anamnesisGastrointestinalUpperBleeding: false,
        anamnesisGastrointestinalUndefinedBleeding: false,
        melena: false,
        coffeeVomit: false,
        bloodVomit: true,
    }).result).toBe(1)
})
