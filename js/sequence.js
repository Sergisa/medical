function getSequence(conclusion) {
    const adviceLine = $('#adviceLine');
    let advicePattern = $(`<div class="stepBlock d-none" id="step1">
        <div class="alert alert-info d-inline-flex" role="alert"></div>
        <i class="bi bi-arrow-right-square fs-4"></i></div>`)
    let sequence = {
        context: this,
        step1: function () {
            let context = this;
            $('#step1').toggleClass('d-none d-inline')
            return {
                yes: () => context.step2(),
                no: () => context.step3(),
                question: 'Источник найден?',
                conclusion,
                context
            }
        },
        step2: function () {
            let context = this;
            $('#step2').toggleClass('d-none d-inline')
            return {
                yes: () => context.step1(),
                no: () => context.step2(),
                question: 'Источник найден?',
                conclusion,
                context
            }
        },
        step3: function () {
            let context = this;
            $('#step3').toggleClass('d-none d-inline')
            return {
                yes: () => context.step1(),
                no: () => context.step2(),
                question: 'Кровотечение продолжается?',
                conclusion,
                context
            }
        },
        step4: function () {
            let context = this;
            $('#step4').toggleClass('d-none d-inline')
            return {
                yes: () => {
                    context.step5()
                    return "step5"
                },
                no: () => {
                    context.step6()
                    return "step6"
                },
                question: 'Источник найден?',
                conclusion,
                context
            }
        },
        step5: function () {
            let context = this;
            $('#step5').toggleClass('d-none d-inline')
            return {
                yes: () => context.step1(),
                no: () => context.step2(),
                question: 'Имеется стриктура?',
                conclusion,
                context
            }
        },
        step6: function () {
            let context = this;
            $('#step6').toggleClass('d-none d-inline')
            return {
                yes: () => context.step1(),
                no: () => context.step2(),
                question: 'источник найден?',
                conclusion,
                context
            }
        },
        step7: function () {
            let context = this;
            $('#step7').toggleClass('d-none d-inline')
            return {
                yes: () => context.step1(),
                no: () => context.step2(),
                question: 'Источник найден?',
                conclusion,
                context
            }
        },
        step8: function () {
            let context = this;
            $('#step8').toggleClass('d-none d-inline')
            return {
                yes: () => context.step1(),
                no: () => context.step2(),
                question: 'Источник найден?',
                conclusion,
                context
            }
        },
    };
    /*if (conclusion.explicit) {
        sequence = Object.keys(sequence).filter(key => key !== 'step1' || key !== 'step4')
            .reduce((obj, key) => {
                obj[key] = sequence[key];
                return obj;
            }, {});
    }*/
    return sequence;
}

