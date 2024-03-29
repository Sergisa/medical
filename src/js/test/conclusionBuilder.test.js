require('../arrayExtension')
const builder = require('../conclusionBuilder')
const test = require('@jest/globals').test
const expect = require('@jest/globals').expect

test("Определение причины кровотечения", () => {
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true,
        v49: true,
    }).getConclusion().reason).toEqual([5, 4, 3, 1])
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true,
        v49: true,
    }).getConclusion().reason).toEqual([5, 4, 3, 1])
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true,
        v49: true,
    }).getConclusion().reason).toEqual([5, 4, 3, 1])
})
test("Определение тяжести кровотечения", () => {
    expect(builder.conclusionBuilder().andBloodLossHardnessLevel({
        erythrocytes: 3.41,
        hemoglobin: 98,
        pulse: 80,
        hematocrit: 32,
        age: 65,
        bloodArterialPressure: 110,
        gender: 'male',
    }).getConclusion().bloodLossHardness).toEqual(2)
    expect(builder.conclusionBuilder().andBloodLossHardnessLevel({
        erythrocytes: 5.8,
        hemoglobin: 163,
        pulse: 80,
        hematocrit: 53.1,
        age: 51,
        bloodArterialPressure: 120,
        gender: 'male',
    }).getConclusion().bloodLossHardness).toEqual(1)
    expect(builder.conclusionBuilder().andBloodLossHardnessLevel({
        erythrocytes: 2.22,
        hemoglobin: 54,
        pulse: 85,
        hematocrit: 20.8,
        age: 68,
        bloodArterialPressure: 100,
        gender: 'female',
    }).getConclusion().bloodLossHardness).toEqual(3)
})
test("Определение тяжести кровотечения должно быть пересчитано по Горбашко", () => {
    expect(builder.conclusionBuilder().andBloodLossHardnessLevel({
        gender: 'female',
        age: 49,
        bloodArterialPressure: 130,
        pulse: 80,
        hematocrit: 24.8,
        hemoglobin: 67,
        erythrocytes: 2.82,
        melena: true,
        pathologicalChanges: true,
        v32: true,
        v37: true
    }).getConclusion().bloodLossHardness).not.toEqual(0)
})
test("Определение локализации кровотечения", () => {
    expect(builder.conclusionBuilder().predictLocalization({
        hemoglobin: 122,
        gender: 'female',
        hematohesia: false,
        anamnesisGastrointestinalUpperBleeding: false,
        anamnesisGastrointestinalUndefinedBleeding: false,
        melena: false,
        coffeeVomit: false,
        bloodVomit: false,
    }).getConclusion().localization).toBe(2)
    expect(builder.conclusionBuilder().predictLocalization({
        hemoglobin: 141,
        gender: 'male',
        hematohesia: false,
        anamnesisGastrointestinalUpperBleeding: false,
        anamnesisGastrointestinalUndefinedBleeding: false,
        melena: false,
        coffeeVomit: false,
        bloodVomit: false,
    }).getConclusion().localization).toBe(2)
    expect(builder.conclusionBuilder().predictLocalization({
        hemoglobin: 130,
        gender: 'male',
        hematohesia: false,
        anamnesisGastrointestinalUpperBleeding: false,
        anamnesisGastrointestinalUndefinedBleeding: false,
        melena: false,
        coffeeVomit: false,
        bloodVomit: true,
    }).getConclusion().localization).toBe(1)
})
test("Геморрой не может быть ни в каком кроме верхнего отдела {v39, v40, v43, v46} -> [1, 3, 4, 5]", () => {
    //reason: 1, 3, 4, 5
    //loc.:1 -> 4, 5
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true
    }, 1).getConclusion().reason.sort()).toEqual([10, 4, 5].sort())
})
test("Эрозивно-язвенные поражения тонкой/толстой кишки не может быть нигде кроме среднего/нижнего отдела {v39, v40, v43, v46} -> [1, 3, 4, 5]", () => {
    //reason: 1, 3, 4, 5
    //loc.:2
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true
    }, 2).getConclusion().reason.sort()).toEqual([3, 5].sort())
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true
    }, 1).getConclusion().reason.sort()).toEqual([10, 4, 5].sort())
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true
    }, 3).getConclusion().reason.sort()).toEqual([1, 5].sort())

})
test("Эрозивно-язвенные поражения верхних отделов ЖКТ не может быть нигде кроме верхнего отдела {v34, v46} -> [1, 3, 4]", () => {
    expect(builder.conclusionBuilder().andResolveReason({
        v34: true,
        v46: true,
    }, 1).getConclusion().reason.sort()).toEqual([10, 4].sort())
    expect(builder.conclusionBuilder().andResolveReason({
        v34: true,
        v46: true,
    }, 2).getConclusion().reason.sort()).toEqual([3].sort())
    expect(builder.conclusionBuilder().andResolveReason({
        v34: true,
        v46: true,
    }, 3).getConclusion().reason.sort()).toEqual([1].sort())
})
test("Эрозивно-язвенные поражения верхних отделов ЖКТ не может быть нигде кроме верхнего отдела {v39, v40, v43, v46} -> [1, 3, 4, 5]", () => {
    //reason: 1, 3, 4, 5
    //loc.:1 -> 1, 3, 5
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true
    }, 3).getConclusion().reason.sort()).toEqual([1, 5].sort())
})
test("Синдром Меллори-Вейса не может быть ни в каком кроме верхнего отдела {v39, v40, v43, v46, v48} -> [1, 3, 4, 5, 8]", () => {
    //reason: 1, 3, 4, 5, 8
    //loc.:1 -> 4, 5, 8
    expect(builder.conclusionBuilder().andResolveReason({
        v39: true,
        v40: true,
        v43: true,
        v46: true,
        v48: true
    }, 1).getConclusion().reason.sort()).toEqual([10, 4, 5, 8].sort())
})
test("Набор причин должен быть отсортирован по частоте (сначала частые потом одиночные)", () => {
    // reason full 1,2,  3,3,3,3,3,3,  4,4,4,4,  5,5,  6,8,  9,9,9,9
    // reason Sorted 3, 9, 4, 5, 2, 6, 1, 8
    expect(builder.conclusionBuilder().andResolveReason({
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
    }).getConclusion().reason).toEqual([3, 9, 4, 5, 11, 8, 2, 1])
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
    expect(builder.conclusionBuilder().andResolveReason(signsObject, 1).getConclusion().reason).toEqual([9, 4, 5, 10, 8])
    // must exclude 1 4 8
    expect(builder.conclusionBuilder().andResolveReason(signsObject, 2).getConclusion().reason).toEqual([3, 9, 5, 2])
    // must exclude 4 8
    expect(builder.conclusionBuilder().andResolveReason(signsObject, 3).getConclusion().reason).toEqual([9, 5, 11, 1])
})
