require('../arrayExtension')
const builder = require('../conclusionBuilder')
const test = require('@jest/globals').test
const expect = require('@jest/globals').expect

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
test("Геморрой не может быть ни в каком кроме верхнего отдела {v39, v40, v43, v46} -> [1, 3, 4, 5]", () => {
    //reason: 1, 3, 4, 5
    //loc.:1 -> 4, 5
    expect(builder.bleedReasonResolver({
        age: 76,
        pressure: 120.3,
        pulse: 80,
        hematocrit: 16.8,
        erythrocytes: 1.67,
        hemoglobin: 50.6,
        gender: 'female',
        melena: true,
        ASA3: true,
        v39: true,
        v40: true,
        v43: true,
        v46: true
    }, 1).sort()).toEqual([4, 5].sort())
})
test("Эрозивно-язвенные поражения тонкой/толстой кишки не может быть нигде кроме среднего/нижнего отдела {v39, v40, v43, v46} -> [1, 3, 4, 5]", () => {
    //reason: 1, 3, 4, 5
    //loc.:2
    expect(builder.bleedReasonResolver({
        age: 76,
        pressure: 120.3,
        pulse: 80,
        hematocrit: 16.8,
        erythrocytes: 1.67,
        hemoglobin: 50.6,
        gender: 'female',
        melena: true,
        ASA3: true,
        v39: true,
        v40: true,
        v43: true,
        v46: true
    }, 2).sort()).toEqual([3, 5].sort())
})
test("Эрозивно-язвенные поражения верхних отделов ЖКТ не может быть нигде кроме верхнего отдела {v39, v40, v43, v46} -> [1, 3, 4, 5]", () => {
    //reason: 1, 3, 4, 5
    //loc.:1 -> 1, 3, 5
    expect(builder.bleedReasonResolver({
        age: 76,
        pressure: 120.3,
        pulse: 80,
        hematocrit: 16.8,
        erythrocytes: 1.67,
        hemoglobin: 50.6,
        gender: 'female',
        melena: true,
        ASA3: true,
        v39: true,
        v40: true,
        v43: true,
        v46: true
    }, 3).sort()).toEqual([1, 3, 5].sort())
})
test("Синдром Меллори-Вейса не может быть ни в каком кроме верхнего отдела {v39, v40, v43, v46, v48} -> [1, 3, 4, 5, 8]", () => {
    //reason: 1, 3, 4, 5, 8
    //loc.:1 -> 4, 5, 8
    expect(builder.bleedReasonResolver({
        age: 76,
        pressure: 120.3,
        pulse: 80,
        hematocrit: 16.8,
        erythrocytes: 1.67,
        hemoglobin: 50.6,
        gender: 'female',
        melena: true,
        ASA3: true,
        v39: true,
        v40: true,
        v43: true,
        v46: true,
        v48: true
    }, 1).sort()).toEqual([4, 5, 8].sort())
})
test("Набор причин должен быть отсортирован по частоте", () => {
    // reason full 1,2,  3,3,3,3,3,3,  4,4,4,4,  5,5,  6,8,  9,9,9,9
    // reason Sorted 3, 9, 4, 5, 2, 6, 1, 8
    expect(builder.bleedReasonResolver({
        v32: true,
        v34: true,
        v36: true,
        v39: true,
        v40: true,
        v41: true,
        v42: true,
        v43: true,
        v46: true,
        v48: true
    })).toEqual([3, 9, 4, 5, 8, 6, 2, 1])
})
test("Набор причин должен быть отсортирован по частоте и локализация должна быть учтена", () => {
    // reason full 1,2,  3,3,3,3,3,3,  4,4,4,4,  5,5,  6,8,  9,9,9,9
    // reason Sorted 3, 9, 4, 5, 2, 6, 1, 8
    const signsObject = {
        v32: true,
        v34: true,
        v36: true,
        v39: true,
        v40: true,
        v41: true,
        v42: true,
        v43: true,
        v46: true,
        v48: true
    }
    // must exclude 1 3
    expect(builder.bleedReasonResolver(signsObject, 1)).toEqual([9, 4, 5, 8, 6, 2])
    // must exclude 1 4 8
    expect(builder.bleedReasonResolver(signsObject, 2)).toEqual([3, 9, 5, 6, 2])
    // must exclude 4 8
    expect(builder.bleedReasonResolver(signsObject, 3)).toEqual([3, 9, 5, 6, 2, 1])
})
