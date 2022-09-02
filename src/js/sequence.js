let linkPattern = `<br><a href="#" type="button" class="text-black" data-bs-toggle="modal" data-bs-target="#additionalResearch">Ввести данные эндоскопического исследования</a>`;
let advicePattern = $(`<div class="alert alert-info d-block me-1" role="alert" id="text">EMPTY</div>`)

function adviceResearch(researchName, needDataModal) {
    advicePattern.clone()
        .html(researchName)
        .append(needDataModal ? linkPattern : null)
        .appendTo($('#adviceLine'))
}

function info(message) {
    console.info(`%c ${message} `, 'color:#2ECC71; background-color:#2C3E50; font-size:14px; font-weight: bolder')
}

function showQuestion(question) {
    $('#question').html(question)
}

function result(localizationIndex) {
    $('#questionBlock').toggleClass('d-inline d-none')
    console.log("RESULT:", conclusion)
    if (localizationIndex === 0) { // терапия
        $('.postConclusion').html(
            $(`<div class="alert alert-info my-2" role="alert">Консервативная терапия/наблюдение</div>`)
        ).parent().toggleClass('d-none d-block')
    } else {
        $('.postConclusion').html(
            conclusionBuilder(conclusion)
                .setLocalization(localizationIndex)
                .andResolveReason(collectData())
                .getTag()
                .clone()
                .append(`, источником которого послужили : <b>${reasonsList[conclusion.reason]}</b>`)
                .toggleClass('alert-info alert-primary')
        ).parent().toggleClass('d-none d-block')
    }
    $.moveBottom()
}

function getSequence() {
    return {
        step1: {
            run: function () {
                showQuestion('ЖКК тяжелое?')
                info("STAGE 1")
            },
            yes: () => sequence.step2,
            no: () => sequence.step4,
            needsResearchData: false,
        },
        step2: {
            run: function () {
                adviceResearch('Начало интенсивной терапии/реанимационных мероприятий', false)
                showQuestion('Присутствует гематохезия?')
                info("STAGE 2")
            },
            yes: () => sequence.step3,
            no: () => sequence.step4,
            needsResearchData: false,
        },
        step3: {
            run: function () {
                adviceResearch('КТ-ангиография', true)
                showQuestion('Источник найден?')
                info("STAGE 3")
            },
            yes: () => sequence.step5,
            no: () => sequence.step4,
            needsResearchData: true,
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
                adviceResearch('Колоноскопия', true)
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
                info("STAGE 8")
            },
            yes: () => result(2),
            no: () => sequence.step10,
            needsResearchData: false,
        },
        step10: {
            run: function () {
                showQuestion('В нижнем отделе?');
                info("STAGE 8")
            },
            yes: () => result(3),
            no: () => sequence.step11,
            needsResearchData: false,
        },
        step11: {
            run: function () {
                modalReasonsList.show();
                info("STAGE 8")
            },
            yes: () => result(1),
            no: () => result(0),
            needsResearchData: false,
        },
        step12: {
            run: function () {
                modalReasonsList.show();
                info("STAGE 8")
            },
            yes: () => result(0),
            no: () => sequence.step6,
            needsResearchData: false,
        },
        step13: {
            run: function () {
                //⚫⚪
                adviceResearch('МР-энтерография • КТ-энтерография', true)
                info("STAGE 8")
            },
            yes: () => result(0),
            no: () => sequence.step6,
            needsResearchData: false,
        }
    };
}

