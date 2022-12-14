let linkPattern = `<a href="#" type="button" class="text-black" data-bs-toggle="modal" data-bs-target="#additionalResearch">Ввести данные эндоскопического исследования</a>`;
let advicePattern = $(`<div class="adviceBlock alert alert-info align-items-baseline justify-content-between flex-wrap d-flex mb-0 mt-2" role="alert" id="text">EMPTY</div>`)
let questionBlock = $(`<div class="questionBlock justify-content-end w-100 mt-2">
     <div class="question d-inline-flex question badge bg-light fs-6"></div>
     <button id="yes" class="btn btn-sm btn-secondary me-1">Да</button>
     <button id="no" class="btn btn-sm btn-secondary me-1">Нет</button>
     <button id="back" class="btn btn-sm btn-secondary me-1">Назад</button>
</div>`)

function adviceResearch(researchName, needDataModal, additionalInfo) {
    advicePattern.clone()
        .html(`<div class="lead d-inline me-2">${researchName}</div>`)
        .append(needDataModal ? linkPattern : null)
        .append(additionalInfo ? `<div class="d-block text-dark"><i class='bi bi-info-lg'></i>${additionalInfo}</div>` : null)
        .appendTo($('#adviceLine'))
}

function showQuestion(question) {
    questionBlock.clone().appendTo($('#adviceLine')).find('.question').html(question)
}

function logStage(num) {
    info(`STAGE ${num}`)
    globalHistory.push(num)
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
                        if (conclusion.risk >= 0 && conclusion.risk <= 2) return ', с <b>низким</b> риском рецидива по шкале Рокалла';
                        else if (conclusion.risk >= 3 && conclusion.risk <= 7) return ', с <b>высоким</b> риском рецидива по шкале Рокалла';
                    }
                })
                .append(`, источником которого послужили : <b>${getJoinedReasons(conclusion.reason, " или ")}</b>`)
                .toggleClass('alert-info alert-primary')
        ).parent().toggleClass('d-none d-block')
    }
    showInstructions()
    $('.postConclusion').after(`<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#instructionModal">Рекомендации по остановке/профилактике ЖКК</button>`)
    $.moveBottom()
}

function getSequence(conclusion, signs) {
    return {
        step1: {
            run: function () {
                logStage("1")
            },
            yes: () => sequence.step2,
            no: () => sequence.step4,
            needsResearchData: false,
        },
        step2: {
            run: function () {
                logStage("2")
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
                logStage("3")
            },
            yes: () => sequence.step5,
            no: () => sequence.step4,
            needsResearchData: false,
        },
        step4: {
            run: function () {
                adviceResearch('Эзофагогастродуоденоскопия', true)
                showQuestion('Источник найден?')
                logStage("4")
            },
            yes: () => sequence.step5,
            no: () => sequence.step6,
            needsResearchData: true,
        },
        step5: {
            run: function () {
                showQuestion('В верхнем отделе?')
                logStage("5")
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
                logStage("6")
                showQuestion('Источник найден?')
            },
            yes: () => sequence.step8,
            no: () => conclusion.explicit ? sequence.step7 : sequence.step13,
            needsResearchData: true,
        },
        step7: {
            run: function () {
                showQuestion('Кровотечение продолжается клинически?')
                logStage("7")
            },
            yes: () => sequence.step12,
            no: () => sequence.step13,
            needsResearchData: false,
        },
        step8: {
            run: function () {
                showQuestion('В нижнем отделе?');
                logStage("8")
            },
            yes: () => result(3),
            no: () => sequence.step9,
            needsResearchData: false,
        },
        step9: {
            run: function () {
                showQuestion('В среднем отделе?');
                logStage("9")
            },
            yes: () => result(2),
            no: () => sequence.step10,
            needsResearchData: false,
        },
        step10: {
            run: function () {
                showQuestion('В нижнем отделе?');
                logStage("10")
            },
            yes: () => result(3),
            no: () => sequence.step11,
            needsResearchData: false,
        },
        step11: {
            run: function () {
                showQuestion('В верхнем отделе?');
                logStage("11")
            },
            yes: () => result(1),
            no: () => result(-1),
            needsResearchData: false,
        },
        step12: {
            run: function () {
                adviceResearch('КТ-ангиография и/или Инструментально-ассистированная энтероскопия, Ангиография, Диагностическая лапароскопия/лапаротомия, Сцинтиграфия',
                    true,
                    signs.aorticProsthesis || signs.heartDefects || signs.heartValvesProsthesis ? "Нельзя исключить ЖКК из фистулы или ангиоэктазии" : undefined)
                showQuestion('В среднем отделе?');
                logStage("12")
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
                logStage("13")
            },
            yes: () => sequence.step14,
            no: () => sequence.step17,
            needsResearchData: false,
        },
        step14: {
            run: function () {
                showQuestion('Источник найден?');
                logStage("14")
            },
            yes: () => sequence.step15,
            no: () => sequence.step16,
            needsResearchData: false,
        },
        step15: {
            run: function () {
                showQuestion('Требуется продолжение диагностического поиска?');
                logStage("15")
            },
            yes: () => sequence.step9,
            no: () => sequence.step17,
            needsResearchData: false,
        },
        step16: {
            run: function () {
                showQuestion('Гемодинамика стабильна?');
                logStage("16")
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
                    adviceResearch('Инструментально-ассистированная энтероскопия<br> диагностическая лапароскопия/лапаротомия, в том числе с интраоперационной энтероскопией', true)
                } else if (conclusion.explicit && conclusion.hard) {
                    if (signs.ASA1 || signs.ASA2 || signs.ASA3) adviceResearch('Инструментально-ассистированная энтероскопия', true)
                    if (signs.ASA4) adviceResearch('Операция отчаяния только при рецидиве кровотечения', true)
                }
                showQuestion('В среднем отделе?');
                logStage("17")
            },
            yes: () => result(2),
            no: () => sequence.step10,
            needsResearchData: false,
        }
    };
}

