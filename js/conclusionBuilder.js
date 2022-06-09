let coefficientsForUP = {
    freeCoefficient: 2.834,
    hemoglobin: -0.017,
    male: 0,
    female: -1.295,
    hematohesia: -4.554,
    anamnesisGastrointestinalUpperBleeding: 4.240,
    anamnesisGastrointestinalUndefinedBleeding: -18.167,
    melena: -1.279,
    coffeeVomit: 3.777,
    bloodVomit: 2.458
}
let coefficientsForMIDDLE = {
    freeCoefficient: 3.717,
    hemoglobin: -0.017,
    male: 0,
    female: -1.300,
    hematohesia: -3.810,
    anamnesisGastrointestinalUpperBleeding: 2.197,
    anamnesisGastrointestinalUndefinedBleeding: 3.918,
    melena: -2.560,
    coffeeVomit: -18.471,
    bloodVomit: -1.265
}
let hardness = {
    1: "легкой",
    2: "средней",
    3: "тяжёлой"
}
let localizationDefinition = {
    1: "верхних",
    2: "средних",
    3: "нижних"
}

let reasonsList = {
    1: "варикозное расширение вен ЖКТ",
    2: "дивертикулы ЖКТ",
    3: "эрозивно-язвенные поражения тонкой/толстой кишки",
    4: "эрозивно-язвенные поражения верхних отделов ЖКТ",
    5: "сосудистые мальформации ЖКТ",
    6: "целиакия",
    7: "опухолевые заболевания ЖКТ",
}

function solveFor(coefficients, signs) {
    return Math.exp(-(
        coefficients.freeCoefficient +
        (coefficients.hemoglobin * signs.hemoglobin) +
        (signs.gender === 'female' ? coefficients.female : coefficients.male) +
        (signs.hematohesia ? coefficients.hematohesia : 0) +
        (signs.anamnesisGastrointestinalUpperBleeding ? coefficients.anamnesisGastrointestinalUpperBleeding : 0) +
        (signs.anamnesisGastrointestinalUndefinedBleeding ? coefficients.anamnesisGastrointestinalUndefinedBleeding : 0) +
        (signs.melena ? coefficients.melena : 0) +
        (signs.coffeeVomit ? coefficients.coffeeVomit : 0) +
        (signs.bloodVomit ? coefficients.bloodVomit : 0)
    ));
}

function localizationResolver(signs) {
    let upProbability = solveFor(coefficientsForUP, signs)
    let middleProbability = solveFor(coefficientsForMIDDLE, signs)
    upProbability = (1 / (1 + upProbability));
    middleProbability = (1 / (1 + middleProbability));
    let downProbability = 1 - (upProbability + middleProbability)
    const localizations = [1, 2, 3];
    return {
        upProbability,
        middleProbability,
        downProbability,
        result: localizations[[upProbability, middleProbability, downProbability].maxIndex()]
    }
}

function bleedReasonResolver(signs) {
    if (signs.v34 || signs.v35) {
        return 1
    } else if (signs.v25 || signs.v27) {
        return 2;
    } else if (signs.v21 || signs.v23 || signs.v25 || signs.v30 || signs.v31 || signs.v32 || signs.v33) {
        return 3;
    } else if (signs.v21 || signs.v23 || signs.v24 || signs.v28 || signs.v32 || signs.v33) {
        return 4;
    } else if (signs.v28 || signs.v29 || signs.v34) {
        return 5
    } else if (signs.v22 || signs.v31) {
        return 6;
    } else {
        return 7;
    }
}

function conclusionBuilder(conclusion) {
    return {
        explicit: conclusion === undefined ? null : conclusion.explicit,
        bloodLossHardness: conclusion === undefined ? 0 : conclusion.bloodLossHardness,
        DRICNecessity: conclusion === undefined ? 0 : conclusion.DRICNecessity,
        localization: conclusion === undefined ? 0 : conclusion.localization,
        reason: conclusion === undefined ? 0 : conclusion.reason,
        andExplicit(indexes) {
            console.log('Определяю явность')
            if (indexes.bloodVomit || indexes.coffeeVomit || indexes.melena || indexes.hematohesia) {
                console.log('EXPLICIT')
                this.explicit = true;
            }
            if (
                (indexes.collaptoidState && indexes.gastrointestinalUcler && indexes.stickySweat) ||
                (indexes.paleSkin && indexes.gastrointestinalUcler && indexes.hemoglobinFalls) ||
                (indexes.hiddenBleeding)
            ) {
                console.log('NOT EXPLICIT')
                this.explicit = false;
            }
            return this;
        },
        andBloodLossHardnessLevel(bloodSigns) {
            console.log("Определяю тяжесть кровопотери по данным: ", bloodSigns)
            if (
                (bloodSigns.erythrocytes > 3.5) +
                (bloodSigns.pulse <= 80) +
                (bloodSigns.bloodArterialPressure > 110) +
                (bloodSigns.hematocrit > 30) >= 2 &&
                (bloodSigns.hemoglobin > 100)
            ) {
                this.bloodLossHardness = 1
            } else if (
                (bloodSigns.erythrocytes >= 2.5 && bloodSigns.erythrocytes <= 3.5) +
                (bloodSigns.pulse >= 80 && bloodSigns.pulse <= 100) +
                (bloodSigns.bloodArterialPressure >= 90 && bloodSigns.bloodArterialPressure <= 110) +
                (bloodSigns.hematocrit >= 25 && bloodSigns.hematocrit <= 30) >= 2 &&
                (bloodSigns.hemoglobin >= 83 && bloodSigns.hemoglobin <= 100)
            ) {
                this.bloodLossHardness = 2
            } else if (
                (bloodSigns.erythrocytes < 2.5) +
                (bloodSigns.pulse > 100) +
                (bloodSigns.bloodArterialPressure < 90) +
                (bloodSigns.hematocrit < 25) >= 2 &&
                (bloodSigns.hemoglobin < 83)
            ) {
                this.bloodLossHardness = 3
            }
            return this;
        },
        andDRICNecessity(signs) {
            if ((signs.age > 60) +
                (signs.pulse > 100) +
                (signs.bloodArterialPressure < 100) +
                (signs.hemoglobin < 100) +
                signs.coffeeVomit +
                signs.melena +
                signs.lossConsciousness +
                signs.additionalIllness >= 4) {
                this.DRICNecessity = 3
            }
            return this;
        },
        predictLocalization(signs) {
            this.localization = localizationResolver(signs).result
            return this;
        },
        setLocalization(localization) {
            this.localization = localization;
            return this;
        },
        andResolveReason(signs) {
            console.log('Определяю причины', signs)
            this.reason = bleedReasonResolver(signs)
            return this;
        },
        getConclusion() {
            let that = this;
            return {
                explicit: that.explicit,
                bloodLossHardness: that.bloodLossHardness,
                DRICNecessity: that.DRICNecessity,
                localizationPredict: that.localization,
                reason: that.reason,
            }
        },
        getTag() {
            return $(`<div class="alert alert-info my-2" role="alert">ЖКК <b>${this.explicit ? 'явное' : 'скрытое'}</b></div>`)
                .append(() => {
                    return this.localization ? `, локализованное в <b>${localizationDefinition[this.localization]}</b> отделах ЖКТ` : '.'
                }).append(() => {
                    if ((this.bloodLossHardness === 1) || (this.bloodLossHardness === 2)) {
                        return this.bloodLossHardness ? `, <b>${hardness[this.bloodLossHardness]}</b> степени тяжести` : '.'
                    } else if (this.bloodLossHardness === 3) {
                        return this.bloodLossHardness ? `, <b>${hardness[this.bloodLossHardness]}</b> степени` : '.'
                    }
                })
        }
    }
}

if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = {bleedReasonResolver, localizationResolver}
}
