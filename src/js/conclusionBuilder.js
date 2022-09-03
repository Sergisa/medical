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
    1: "Геморрой неуточненный",
    2: "Дивертикулярная болезнь",
    3: "Эрозивно-язвенные поражения тонкой/толстой кишки", // если средний нижний отдел
    4: "Эрозивно-язвенные поражения верхних отделов ЖКТ", // если верхний отдел
    5: "Ангиоэктазии/телеангиоэктазии/венозные мальформации",
    6: "Целиакия",
    7: "Свищ между крупным сосудом и просветом ЖКТ",
    8: "Синдром Меллори-Вейса",
    9: "Опухолевые заболевания ЖКТ",
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
    console.log(this);
    if (signs.v45 || signs.v46) {
        return 1
    } else if (signs.v36 || signs.v38) {
        return 2;
    } else if (signs.v32 || signs.v34 || signs.v36 || signs.v41 || signs.v42 || signs.v43 || signs.v44) {
        return 3;
    } else if (signs.v32 || signs.v34 || signs.v35 || signs.v39 || signs.v43 || signs.v44) {
        return 4;
    } else if (signs.v39 || signs.v40 || signs.v45) {
        return 5;
    } else if (signs.v33 || signs.v42) {
        return 6;
    } else if (signs.v47) {
        return 7;
    } else if (signs.v48) {
        return 8;
    } else {
        return 9;
    }
}

function riskResolver(signs) {
    let levelCount = 0;
    //Возраст
    if (signs.age >= 60 && signs.age <= 79) {
        levelCount += 1;
    } else if (signs.age >= 80) {
        levelCount += 2;
    }
    //ШОК
    if (signs.bloodArterialPressure >= 100) {
        levelCount += signs.pulse > 100 ? 1 : 0;
    } else if (signs.bloodArterialPressure < 100 && signs.pulse >= 100) {
        levelCount += 2;
    }

    //сопутствующие заболевания
    if (signs.chronicHeartFailure || signs.cardiacIschemia) levelCount += 2;
    if (signs.kidneyFailure || signs.liverFailure || signs.metastaticCancer) levelCount += 3

    //Диагноз
    if (bleedReasonResolver(signs) === 8) levelCount += 0
    //else if(bleedReasonResolver(signs) === )  Злокачественные новообразования желудочно-кишечного тракта
    else levelCount += 1

    //Признаки кровотечения
    if (signs.v49) levelCount += 2;

    return levelCount;
}

function conclusionBuilder(conclusion) {
    return {
        risk: conclusion === undefined ? null : conclusion.risk,
        explicit: conclusion === undefined ? null : conclusion.explicit,
        bloodLossHardness: conclusion === undefined ? 0 : conclusion.bloodLossHardness,
        hard: conclusion === undefined ? null : conclusion.hard,
        localization: conclusion === undefined ? 0 : conclusion.localization,
        reason: conclusion === undefined ? 0 : conclusion.reason,
        andExplicit(indexes) {
            console.log('Определяю явность')
            if (indexes.bloodVomit || indexes.coffeeVomit || indexes.melena || indexes.hematohesia || indexes.blackFeces) {
                console.log('EXPLICIT')
                this.explicit = true;
            }
            if (!(indexes.bloodVomit || indexes.coffeeVomit || indexes.melena || indexes.hematohesia || indexes.blackFeces)) {
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
        andResolveHardness(signs) {
            if ((signs.age > 60) +
                (signs.pulse > 100) +
                (signs.bloodArterialPressure < 100) +
                (signs.hemoglobin < 100) +
                signs.coffeeVomit +
                signs.melena +
                signs.lossConsciousness +
                signs.additionalIllness >= 4) {
                this.hard = true;
            }
            return this;
        },
        andResolveRocalRiskLevel(signs) {
            this.risk = riskResolver(signs);
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
            this.reason = bleedReasonResolver.call(this, signs)
            return this;
        },
        getConclusion() {
            let that = this;
            return {
                explicit: that.explicit,
                bloodLossHardness: that.bloodLossHardness,
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
                        return this.bloodLossHardness ? `, <b>${hardness[this.bloodLossHardness]}</b> степени тяжести, ` : '.'
                    } else if (this.bloodLossHardness === 3) {
                        return this.bloodLossHardness ? `, <b>${hardness[this.bloodLossHardness]}</b> степени, ` : '.'
                    }
                }).append(() => {
                    if (this.localization === 1) {
                        if (this.risk >= 0 && this.risk <= 2) return 'с <b>минимальным</b> риском рецедива';
                        else if (this.risk >= 3 && this.risk <= 7) return 'с <b>высоким</b> риском рецедива';
                    }
                    //else (this.risk > 0 && this.risk < 2) ? 'низким' : 'высоким';
                })
        }
    }
}

if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = {bleedReasonResolver, localizationResolver}
}
