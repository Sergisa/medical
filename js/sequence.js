function result(text) {
    console.log(text)
}

function getSequence(conclusion) {
    const adviceLine = $('#adviceLine');
    let advicePattern = $(`<div class="alert alert-info d-inline-flex me-1" role="alert" id="text">DDD</div>`)
    /*let advicePattern = $(`<div class="stepBlock d-none">
        <div class="alert alert-info d-inline-flex me-1" role="alert" id="text">DDD</div>
        <i class="bi bi-arrow-right-square fs-4"></i></div>`)
*/
    return {
        context: this,
        step1: {
            run: function () {
                advicePattern.clone().html('ЭГДС').appendTo($('#adviceLine'))
                $('#question').html('Источник найден?')
                console.log("STAGE 1")
            },
            yes: () => result("Верхний отдел"),
            no: () =>  sequence.step2,
            conclusion,

        },
        step2: {
            run: function () {
                advicePattern.clone().html('Колоноскопия').appendTo($('#adviceLine'))
                $('#question').html('Источник найден?')
                console.log("STAGE 2")
            },
            yes: () => result("Нижний отдел"),
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
            yes: () => {
                return sequence.step4
            },
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
            yes: () => result('Средний отдел'),
            no: () =>  sequence.step5,
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
                $('#questionBlock').toggleClass('d-inline d-none')
                console.log("STAGE 6")
                result('Средний отдел')
                conclusion.localization = 'Средний отдел'
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

