function result(index) {
    $('#questionBlock').toggleClass('d-inline d-none')
    console.log(index)
    conclusion.localization = index;
    console.log("RESULT:", conclusion)

    $('.postConclusion').html(
        conclusionBuilder(conclusion)
            .andResolveReason(collectData())
            .getTag()
            .clone()
            .append(`, источником которого послужили : <b>${reasonsList[conclusion.reason]}</b>`)
            .toggleClass('alert-info alert-primary')
    )
    $('.postConclusion').parent().toggleClass('d-none d-block')
    $("html, body").animate({scrollTop: $(document).height()}, 1000);

}

function getSequence(conclusion) {
    let advicePattern = $(`<div class="alert alert-info d-inline-flex me-1" role="alert" id="text">DDD</div>`)
    return {
        context: this,
        step1: {
            run: function () {
                advicePattern.clone().html('ЭГДС').appendTo($('#adviceLine'))
                $('#question').html('Источник найден?')
                console.log("STAGE 1")
            },
            yes: () => result(1),
            no: () => sequence.step2,
            conclusion,
        },
        step2: {
            run: function () {
                advicePattern.clone().html('Колоноскопия').appendTo($('#adviceLine'))
                $('#question').html('Источник найден?')
                console.log("STAGE 2")
            },
            yes: () => result(3),
            no: () => sequence.step3,
            conclusion,
        },
        step3: {
            run: function () {
                /*if(!conclusion.explicit){
                    sequence.step5.run()
                    return
                }*/
                $('#question').html('Кровотечение продолжается?')
                console.log("STAGE 3")
            },
            yes: () => sequence.step4,
            no: () => sequence.step5,
            conclusion,
        },
        step4: {
            run: function () {
                /*if(!conclusion.explicit){
                    sequence.step5.run()
                    return
                }*/
                advicePattern.clone()
                    .html('КТ-ангиография и/или Инструментально-ассистированная энтероскопия и/или Сцинтиграфия и/или Хирургическое вмешательство')
                    .appendTo($('#adviceLine'))
                $('#question').html('Источник найден?')
                console.log("STAGE 4")
            },
            yes: () => result(2),
            no: () => sequence.step5,
            conclusion,
        },
        step5: {
            run: function () {
                advicePattern.clone().html('Rg с пассажем бария или КТЭ или МРЭ').appendTo($('#adviceLine'))
                $('#question').html('Имеется стриктура?')
                console.log("STAGE 5")
            },
            yes: () => sequence.step6,
            no: () => sequence.step7,
            conclusion,
        },
        step6: {
            run: function () {
                advicePattern.clone()
                    .html('Инструментально-ассистированная энтероскопия и/или Хирургическое вмешательство')
                    .appendTo($('#adviceLine'))
                console.log("STAGE 6")
                result(2)
            },
            yes: () => null,
            no: () => sequence.step2,
            conclusion,
        },
        step7: {
            run: function () {
                advicePattern.clone()
                    .html('ВКЭ')
                    .appendTo($('#adviceLine'));
                $('#question').html('источник найден?')
                console.log("STAGE 7")
            },
            yes: () => sequence.step8,
            no: () => result('Консервативное наблюдение'),
            conclusion,
        },
        step8: {
            run: function () {
                /*advicePattern.clone()
                    .html('ВКЭ').appendTo($('#adviceLine'));*/
                /*$('#question').html('источник найден?')*/
                console.log("STAGE 8")
            },
            yes: () => result('Консервативное наблюдение'),
            no: () => sequence.step6,
            conclusion,
        },
    };
}

