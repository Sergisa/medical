let linkPattern = `<a href="#" type="button" class="text-black float-end" data-bs-toggle="modal" data-bs-target="#additionalResearch">Ввести данные эндоскопического исследования</a>`;
let advicePattern = $(`<div class="alert alert-info d-block mb-0 mt-1" role="alert" id="text">EMPTY</div>`)

function adviceResearch(researchName, needDataModal, additionalInfo) {
    advicePattern.clone()
        .html(`<div class="lead d-inline me-2">${researchName}</div>`)
        .append(needDataModal ? linkPattern : null)
        .append(additionalInfo ? `<div class="d-block text-dark"><i class='bi bi-info-lg'></i>${additionalInfo}</div>` : null)
        .appendTo($('#adviceLine'))
}

function showQuestion(question) {
    $('#question').html(question)
}

function getJoinedReasons(reasons, delim) {
    return reasons.map(function (reasonCode) {
        return reasonsList[reasonCode]
    }).join(delim ?? ', ')
}

function result(localizationIndex) {
    $('#questionBlock').toggleClass('d-inline d-none')
    console.log("Localization in fact :", localizationIndex)
    if (localizationIndex === 0) { // терапия
        $('.postConclusion').html(`<div class="alert alert-info my-2" role="alert">
            Консервативная терапия/наблюдение
            <div class='d-block text-dark'>
            <i class='bi bi-info-lg'></i>при рецидиве кровотечения из ЖКТ рекомендуется возвратиться к началу алгоритма</div></div>`
        ).parent().toggleClass('d-none d-block')
    } else if (localizationIndex === -1) {//не установлено
        $('.postConclusion').html(`<div class="alert alert-info my-2" role="alert">
            Локализация источника ЖКК не установлена
            <div class='d-block text-dark'>
            <i class='bi bi-info-lg'></i>рекомендуется возвратиться к началу алгоритма</div></div>`)
            .parent().toggleClass('d-none d-block')
    } else {
        conclusion = conclusionBuilder(conclusion)
            .setLocalization(localizationIndex)
            .andResolveReason(collectData(), localizationIndex)
        $('.postConclusion').html(
            conclusion
                .getTag()
                .clone()
                .append(() => {
                    if (localizationIndex === 1) {
                        if (conclusion.risk >= 0 && conclusion.risk <= 2) return ', с <b>низким</b> риском рецидива';
                        else if (conclusion.risk >= 3 && conclusion.risk <= 7) return ', с <b>высоким</b> риском рецидива';
                    }
                })
                .append(`, источником которого послужили : <b>${getJoinedReasons(conclusion.reason, " или ")}</b>`)
                .toggleClass('alert-info alert-primary')
        ).parent().toggleClass('d-none d-block')
    }
    showInstructions(
        $('#bleedContinue-checkbox').is(':checked'),
        $('#repeat-checkbox').is(':checked'),
        conclusion.risk
    )
    $('.postConclusion').after(`<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#instructionModal">Открыть рекомендации</button>`)
    $.moveBottom()
}

function getSequence(conclusion, signs) {
    return {
        step1: {
            run: function () {
                info("STAGE 1")
            },
            yes: () => sequence.step2,
            no: () => sequence.step4,
            needsResearchData: false,
        },
        step2: {
            run: function () {
                info("STAGE 2")
            },
            yes: () => sequence.step3,
            no: () => sequence.step4,
            needsResearchData: false,
        },
        step3: {
            run: function () {
                adviceResearch(
                    'КТ-ангиография',
                    false,
                    "Европейские рекомендации 2021 г. по диагностике и лечению явного кровотечения из нижних отделов ЖКТ гласят, что пациентам с нестабильной гемодинамикой и подозрением на продолжающееся кровотечение необходимо пройти компьютерную томографическую ангиографию перед эндоскопическим или рентгенологическим лечением, чтобы определить место кровотечения."
                )
                showQuestion('Источник найден?')
                info("STAGE 3")
            },
            yes: () => sequence.step5,
            no: () => sequence.step4,
            needsResearchData: false,
        },
        step4: {
            run: function () {
                adviceResearch('Эзофагогастродуоденоскопия', true)
                showQuestion('Источник найден?')
                info("STAGE 4")
            },
            yes: () => sequence.step5,
            no: () => sequence.step6,
            needsResearchData: true,
        },
        step5: {
            run: function () {
                showQuestion('В верхнем отделе?')
                info("STAGE 5")
            },
            yes: () => result(1),
            no: () => sequence.step9,
            needsResearchData: false,
        },
        step6: {
            run: function () {
                adviceResearch(
                    'Колоноскопия',
                    true,
                    "Если в анамнезе или при объективном обследовании выявлены патологические изменения панкреато-билиарной зоны, то рекомендуется исключить гемобилию и спленопанкреатическую фистулу (\"hemosuccus pancreaticus\")"
                )
                info("STAGE 6")
                showQuestion('Источник найден?')
            },
            yes: () => sequence.step8,
            no: () => conclusion.explicit ? sequence.step7 : sequence.step13,
            needsResearchData: true,
        },
        step7: {
            run: function () {
                showQuestion('Кровотечение продолжается клинически?')
                info("STAGE 7")
            },
            yes: () => sequence.step12,
            no: () => sequence.step13,
            needsResearchData: false,
        },
        step8: {
            run: function () {
                showQuestion('В нижнем отделе?');
                info("STAGE 8")
            },
            yes: () => result(3),
            no: () => sequence.step9,
            needsResearchData: false,
        },
        step9: {
            run: function () {
                showQuestion('В среднем отделе?');
                info("STAGE 9")
            },
            yes: () => result(2),
            no: () => sequence.step10,
            needsResearchData: false,
        },
        step10: {
            run: function () {
                showQuestion('В нижнем отделе?');
                info("STAGE 10")
            },
            yes: () => result(3),
            no: () => sequence.step11,
            needsResearchData: false,
        },
        step11: {
            run: function () {
                showQuestion('В верхнем отделе?');
                info("STAGE 11")
            },
            yes: () => result(1),
            no: () => result(-1),
            needsResearchData: false,
        },
        step12: {
            run: function () {
                adviceResearch('КТ-ангиография и/или Инструментально-ассистированная энтероскопия • Ангиография • Диагностическая лапароскопия/лапаротомия • Сцинтиграфия',
                    true,
                    signs.aorticProsthesis || signs.heartDefects || signs.heartValvesProsthesis ? "Нельзя исключить ЖКК из фистулы или ангиоэктазии" : undefined)
                showQuestion('В среднем отделе?');
                info("STAGE 12")
            },
            yes: () => result(2),
            no: () => sequence.step10,
            needsResearchData: false,
        },
        step13: {
            run: function () {
                //⚫⚪
                adviceResearch(
                    'МР-энтерография • КТ-энтерография',
                    false,
                    "Рекомендуется провести видеокапсульную эндоскопию, предварительно исключив клинико-инструментальные признаки нарушения пассажа содержимого по кишке")
                showQuestion('Проведена видеокапсульная эндоскопия?');
                info("STAGE 13")
            },
            yes: () => sequence.step14,
            no: () => sequence.step17,
            needsResearchData: false,
        },
        step14: {
            run: function () {
                showQuestion('Источник найден?');
                info("STAGE 14")
            },
            yes: () => sequence.step15,
            no: () => sequence.step16,
            needsResearchData: false,
        },
        step15: {
            run: function () {
                showQuestion('Достоверно (без сомнений)?');
                info("STAGE 15")
            },
            yes: () => sequence.step9,
            no: () => sequence.step17,
            needsResearchData: false,
        },
        step16: {
            run: function () {
                showQuestion('Гемодинамика стабильна?');
                info("STAGE 16")
            },
            yes: () => result(0),
            no: () => sequence.step17,
            needsResearchData: false,
        },
        step17: {
            run: function () {
                if (!conclusion.explicit) {
                    adviceResearch('Инструментально-ассистированная энтероскопия', true)
                } else if (conclusion.explicit && !conclusion.hard) {
                    adviceResearch('Инструментально-ассистированная энтероскопия; диагностическая лапароскопия/лапаротомия, в том числе с интраоперационной энтероскопией', true)
                } else if (conclusion.explicit && conclusion.hard) {
                    if (signs.ASA1 || signs.ASA2 || signs.ASA3) adviceResearch('Инструментально-ассистированная энтероскопия', true)
                    if (signs.ASA4) adviceResearch('Операция отчаяния только при рецедиве кровотечения', true)
                }
                showQuestion('В среднем отделе?');
                info("STAGE 17")
            },
            yes: () => result(2),
            no: () => sequence.step10,
            needsResearchData: false,
        }
    };
}

