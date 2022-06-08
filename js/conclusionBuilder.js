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

function localizationResolver(signs) {
    let upProbability = Math.exp(-(
        coefficientsForUP.freeCoefficient +
        (coefficientsForUP.hemoglobin * signs.hemoglobin) +
        (signs.gender === 'female' ? coefficientsForUP.female : coefficientsForUP.male) +
        (signs.hematohesia ? coefficientsForUP.hematohesia : 0) +
        (signs.anamnesisGastrointestinalUpperBleeding ? coefficientsForUP.anamnesisGastrointestinalUpperBleeding : 0) +
        (signs.anamnesisGastrointestinalUndefinedBleeding ? coefficientsForUP.anamnesisGastrointestinalUndefinedBleeding : 0) +
        (signs.melena ? coefficientsForUP.melena : 0) +
        (signs.coffeeVomit ? coefficientsForUP.coffeeVomit : 0) +
        (signs.bloodVomit ? coefficientsForUP.bloodVomit : 0)
    ));
    let middleProbability = Math.exp(-(
        coefficientsForMIDDLE.freeCoefficient +
        (coefficientsForMIDDLE.hemoglobin * signs.hemoglobin) +
        (signs.gender === 'female' ? coefficientsForMIDDLE.female : coefficientsForMIDDLE.male) +
        (signs.hematohesia ? coefficientsForMIDDLE.hematohesia : 0) +
        (signs.anamnesisGastrointestinalUpperBleeding ? coefficientsForMIDDLE.anamnesisGastrointestinalUpperBleeding : 0) +
        (signs.anamnesisGastrointestinalUndefinedBleeding ? coefficientsForMIDDLE.anamnesisGastrointestinalUndefinedBleeding : 0) +
        (signs.melena ? coefficientsForMIDDLE.melena : 0) +
        (signs.coffeeVomit ? coefficientsForMIDDLE.coffeeVomit : 0) +
        (signs.bloodVomit ? coefficientsForMIDDLE.bloodVomit : 0)
    ));
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
        return "варикозное расширение вен ЖКТ"
    } else if (signs.v25 || signs.v27) {
        return "дивертикулы ЖКТ";
    } else if (signs.v21 || signs.v23 || signs.v25 || signs.v30 || signs.v31 || signs.v32 || signs.v33) {
        return "эрозивно-язвенные поражения тонкой/толстой кишки";
    } else if (signs.v21 || signs.v23 || signs.v24 || signs.v28 || signs.v32 || signs.v33) {
        return "эрозивно-язвенные поражения верхних отделов ЖКТ";
    } else if (signs.v28 || signs.v29 || signs.v34) {
        return "сосудистые мальформации ЖКТ"
    } else if (signs.v22 || signs.v31) {
        return "целиакия";
    } else {
        return "опухолевые заболевания ЖКТ";
    }
}

function conclusionBuilder(conclusion) {
    return {
        explicit: conclusion === undefined ? null : conclusion.explicit,
        bloodLossHardness: conclusion === undefined ? '' : conclusion.bloodLossHardness,
        bleedHardness: conclusion === undefined ? '' : conclusion.bleedHardness,
        localization: conclusion === undefined ? '' : conclusion.localization,
        reason: conclusion === undefined ? '' : conclusion.reason,
        andExplicit(indexes) {
            console.log('Определяю явность')
            if (indexes.bloodVomit || indexes.coffeeVomit || indexes.melena || indexes.hematohesia) {
                console.log('EXPLICIT')
                this.explicit = true;
            }
            if (indexes.collaptoidState && indexes.gastrointestinalUcler && indexes.stickySweat) {
                console.log('NOT EXPLICIT')
                this.explicit = false;
            }
            if (indexes.paleSkin && indexes.gastrointestinalUcler && indexes.hemoglobinFalls) {
                console.log('NOT EXPLICIT')
                this.explicit = false;
            }
            if (indexes.hiddenBleeding) {
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
                (bloodSigns.bloodPressure > 110) +
                (bloodSigns.hematocrit > 30) >= 2 &&
                (bloodSigns.hemoglobin > 100)
            ) {
                this.bloodLossHardness = 1
            } else if (
                (bloodSigns.erythrocytes >= 2.5 && bloodSigns.erythrocytes <= 3.5) +
                (bloodSigns.pulse >= 80 && bloodSigns.pulse <= 100) +
                (bloodSigns.bloodPressure >= 90 && bloodSigns.bloodPressure <= 110) +
                (bloodSigns.hematocrit >= 25 && bloodSigns.hematocrit <= 30) >= 2 &&
                (bloodSigns.hemoglobin >= 83 && bloodSigns.hemoglobin <= 100)
            ) {
                this.bloodLossHardness = 2
            } else if (
                (bloodSigns.erythrocytes < 2.5) +
                (bloodSigns.pulse > 100) +
                (bloodSigns.bloodPressure < 90) +
                (bloodSigns.hematocrit < 25) >= 2 &&
                (bloodSigns.hemoglobin < 83)
            ) {
                this.bloodLossHardness = 3
            }
            return this;
        },
        andDRICNecessity(signs) {
            let signsCount = (signs.age > 60) +
                (signs.pulse > 100) +
                (signs.bloodArterialPressure < 100) +
                (signs.hemoglobin < 100) +
                signs.coffeeVomit +
                signs.melena +
                signs.lossConsciousness +
                signs.additionalIllness
            if (signsCount >= 4) {
                this.bleedHardness = 3
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
            this.reason = bleedReasonResolver(signs)
            return this;
        },
        getConclusion() {
            let that = this;
            return {
                explicit: that.explicit,
                bloodLossHardness: that.bloodLossHardness,
                bleedHardness: that.bleedHardness,
                localizationPredict: that.localization,
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
                }).append(() => {
                    //return this.reason ? `, источником которого послужили : <b>${this.reason}</b>` : '.'
                })
        }
    }
}

if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = {bleedReasonResolver, localizationResolver}
}
