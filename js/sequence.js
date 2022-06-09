let linkPattern = `<br><a href="#" type="button" class="text-black" data-bs-toggle="modal" data-bs-target="#additionalResearch">Ввести данные эндоскопического исследования</a>`;

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
    let advicePattern = $(`<div class="alert alert-info d-inline-block me-1" role="alert" id="text">DDD</div>`)
    return {
        context: this,
        step1: {
            run: function () {
                advicePattern.clone()
                    .html('ЭГДС')
                    .append(linkPattern)
                    .appendTo($('#adviceLine'))
                $('#question').html('Источник найден?')
                console.log("STAGE 1")
            },
            yes: () => result(1),
            no: () => sequence.step2,
            research: true,
        },
        step2: {
            run: function () {
                advicePattern
                    .clone()
                    .html('Колоноскопия')
                    .append(linkPattern)
                    .appendTo($('#adviceLine'))
                $('#question').html('Источник найден?')
                console.log("STAGE 2")
            },
            yes: () => result(3),
            no: () => sequence.step3,
            research: true,
        },
        step3: {
            run: function () {
                $('#question').html('Кровотечение продолжается?')
                console.log("STAGE 3")
            },
            yes: () => sequence.step4,
            no: () => sequence.step5,
            research: false,
        },
        step4: {
            run: function () {
                advicePattern.clone()
                    .html('КТ-ангиография и/или Инструментально-ассистированная энтероскопия и/или Сцинтиграфия и/или Хирургическое вмешательство')
                    .append(linkPattern)
                    .appendTo($('#adviceLine'))
                $('#question').html('Источник найден?')
                console.log("STAGE 4")
            },
            yes: () => result(2),
            no: () => sequence.step5,
            research: true,
        },
        step5: {
            run: function () {
                advicePattern.clone().html('Rg с пассажем бария или КТЭ или МРЭ').appendTo($('#adviceLine'))
                $('#question').html('Имеется стриктура?')
                console.log("STAGE 5")
            },
            yes: () => sequence.step6,
            no: () => sequence.step7,
            research: false,
        },
        step6: {
            run: function () {
                advicePattern.clone()
                    .html('Инструментально-ассистированная энтероскопия и/или Хирургическое вмешательство')
                    .append(linkPattern)
                    .appendTo($('#adviceLine'))
                console.log("STAGE 6")
                result(2)
            },
            yes: () => null,
            no: () => null,
            research: true,
        },
        step7: {
            run: function () {
                advicePattern.clone()
                    .html('ВКЭ')
                    .append(linkPattern)
                    .appendTo($('#adviceLine'));
                $('#question').html('источник найден?')
                console.log("STAGE 7")
            },
            yes: () => sequence.step8,
            no: () => result(0),
            research: true,
        },
        step8: {
            run: function () {
                // TODO: Никто не знает что тут должно быть
                console.log("STAGE 8")
            },
            yes: () => result(0),
            no: () => sequence.step6,
            research: false,
        },
    };
}

