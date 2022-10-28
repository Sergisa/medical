<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Алгоритм ведения пациентов</title>
    <link href="dist/css/output.min.css" rel="stylesheet">
    <link rel="stylesheet" href="dist/css/bs-icons.min.css">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        #question {
            color: var(--bs-indigo);
            font-weight: bold;
            background-color: #CFD8DC !important;
        }

        .ASAClass div {
            font-family: "Times New Roman", serif;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-12 my-auto">
            <h1 class="text-danger fw-bold text-center">
                Алгоритм ведения пациентов с подозрением на желудочно-кишечное кровотечение с элементами поддержки
                принятия клинических решений
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <a href="download.php" target="_self" class="btn btn-primary btn-sm float-end">Скачать все данные</a>
        </div>
    </div>
    <form action="" class="p-3 needs-validation mt-3" id="aprioriForm" name="signsForm" novalidate>
        <div class="row">
            @include('input',["item"=>$mainForm["identifier"], "col"=>"lg-6"])
            @include('input',["item"=>$mainForm["IIC"], "col"=>"lg-6"])
        </div>
        <div class="col-auto">
            <textarea type="text" class="form-control" id="description" placeholder="Описание" rows="4"></textarea>
            <label class="form-check-label" for="description"></label>
        </div>
        Пол *
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="gender" id="male" value="female" required>
            <label class="form-check-label" for="male">Мужской</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="gender" id="female" value="male">
            <label class="form-check-label" for="female">Женский</label>
        </div>
        <div class="row mt-1">
            @include('input',["item"=>$mainForm['age'], "required"=>true])
        </div>
        @include('checkbox',["item"=>$mainForm['paleSkin']])
        @include('checkbox',["item"=>$mainForm['stickySweat']])
        <div class="row">
            @include('input',["item"=>$mainForm['bloodArterialPressure'], "required"=>true])
            @include('input',["item"=>$mainForm['pulse'], "required"=>true])
        </div>
        <div class="row">
            <div class="col-md-6">
                @include('checkbox',["item"=>$mainForm['collaptoidState']])
                @include('checkbox',["item"=>$mainForm['lossConsciousness']])
                @include('checkbox',["item"=>$mainForm['coffeeVomit']])
                @include('checkbox',["item"=>$mainForm['bloodVomit']])
                @include('checkbox',["item"=>$mainForm['melena']])
                @include('checkbox',["item"=>$mainForm['hematohesia']])
                @include('checkbox',["item"=>$mainForm['blackFeces']])
            </div>
            <div class="col-md-6">
                @include('checkbox',["item"=>$mainForm['gastrointestinalUcler']])
                @include('checkbox',["item"=>$mainForm['anamnesisGastrointestinalUpperBleeding']])
                @include('checkbox',["item"=>$mainForm['anamnesisGastrointestinalUndefinedBleeding']])
                @include('checkbox',["item"=>$mainForm['additionalIllness']])
            </div>
        </div>
        <div class="row">
            @include('input',["item"=>$mainForm['hematocrit'], "required"=>true])
            @include('input',["item"=>$mainForm['hemoglobin'], "required"=>true])
            @include('input',["item"=>$mainForm['erythrocytes'], "required"=>true])
        </div>
        <div class="row">
            <div class="col-12">
                @include('checkbox',["item"=>$mainForm['hiddenBleeding']])
            </div>
        </div>
        <div class="row riskFactors">
            <p class="fw-bold my-2">
                Факторы риска (сопутствующие заболевания)
            </p>
            <hr class="mb-3">
            <div class="col-md-12">
                @include('checkbox',['item'=>$mainForm['chronicHeartFailure']])
                @include('checkbox',['item'=>$mainForm['cardiacIschemia']])
                @include('checkbox',['item'=>$mainForm['kidneyFailure']])
                @include('checkbox',['item'=>$mainForm['liverFailure']])
                @include('checkbox',['item'=>$mainForm['metastaticCancer']])
                @include('checkbox',['item'=>$mainForm['pathologicalChanges']])
                @include('checkbox',['item'=>$mainForm['aorticProsthesis']])
                @include('checkbox',['item'=>$mainForm['heartDefects']])
                @include('checkbox',['item'=>$mainForm['heartValvesProsthesis']])
            </div>
        </div>
        <div class="row ASAClass">
            <p class="fw-bold my-2">
                Физический статус пациента по классификации ASA
            </p>
            <hr class="mb-3">
            <div class="col-md-4">
                @include('radioButton',['item'=>$mainForm['ASA1'], "group"=>"ASA"])
                @include('radioButton',['item'=>$mainForm['ASA2'], "group"=>"ASA"])
                @include('radioButton',['item'=>$mainForm['ASA3'], "group"=>"ASA"])
            </div>
            <div class="col-md-4">
                @include('radioButton',['item'=>$mainForm['ASA4'], "group"=>"ASA"])
                @include('radioButton',['item'=>$mainForm['ASA5'], "group"=>"ASA"])
            </div>
            <div class="col-md-4">
                @include('radioButton',['item'=>$mainForm['ASA6'], "group"=>"ASA"])
                @include('checkbox',['item'=>$mainForm['E']])
            </div>
        </div>
        <div class="control-bottom d-flex align-items-end justify-content-end">
            <button type="reset" class="btn btn-outline-dark me-2">Очистить</button>
            <button type="submit" class="btn btn-primary text-break" id="preConclusion">
                Предварительное заключение
            </button>
        </div>
        <div class="preConclusion">
            <div></div>
        </div>
    </form>
    <div class="row">
        <div class="col-md-12">
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="border border-2 rounded p-3 mt-3 d-none" id="helpSequence">
                Рекомендация
                <div class="d-block">
                    <div class="col-12 mt-2" id="adviceLine"></div>
                    <div id="questionBlock" class="d-inline-flex justify-content-end w-100 mt-2">
                        <div id="question" class="d-inline-flex question badge bg-light fs-6"></div>
                        <button id="yes" class="btn btn-sm btn-secondary me-1">Да</button>
                        <button id="no" class="btn btn-sm btn-secondary me-1">Нет</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="border border-2 rounded shadow p-3 mt-3 d-none">
                Эндоскопческое заключение
                <div class="postConclusion"></div>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-secondary me-auto float-end d-none" id="saveFinalData">Сохранить</button>
    <i class="status-label bi fs-2 float-end me-auto d-none text-success bi-check-lg" id="good"></i>
    <i class="status-label bi fs-2 float-end me-auto d-none text-danger bi-x-lg" id="error"></i>
</div>

@include('researchModal');
@include('instructionModal');


</body>
<script src="dist/js/popper.min.js"></script>
<script src="dist/js/bootstrap.min.js"></script>
<script src="dist/js/jquery3.6.0.min.js"></script>
<script src="dist/js/bundle.min.js"></script>
<script>
    const modalAdditionalResearch = new bootstrap.Modal('#additionalResearch');
    const instructionModal = new bootstrap.Modal('#instructionModal');
    let sequenceStage, conclusion, sequence;

    function makeConclusion() {
        let conclusion = conclusionBuilder()
            .andBloodLossHardnessLevel(collectData())
            .andExplicit(collectData())
            .predictLocalization(collectData())
            .andResolveReason(collectData())
            .andResolveRocalRiskLevel(collectData())
            .andResolveHardness(collectData())
        $('.preConclusion div').html("Предварительное заключение").append(conclusion.getTag().clone())
        window.conclusion = conclusion;
        return conclusion;
    }


    $('#yes').click(function () {
        shiftSequence(1)
    })
    $('#no').click(function () {
        shiftSequence(2)
    })

    function startHelpSequence() {
        $('#helpSequence').removeClass('d-none')
        $('#adviceLine').empty()
        if (conclusion.explicit) {
            if (conclusion.hard) {
                sequenceStage = collectData().hematohesia ? sequence.step3 : sequence.step4;
                adviceResearch('Начало интенсивной терапии/реанимационных мероприятий', false)
            } else {
                sequenceStage = sequence.step4
            }
        } else {
            sequenceStage = sequence.step4;
        }
        if (sequenceStage) sequenceStage.run()
    }

    function shiftSequence(answer) {
        if (answer === 1) {//yes
            if (collectData().hasResearchData() || !sequenceStage.needsResearchData) {
                console.log("Данные исследования не нужны")
                sequenceStage = sequenceStage.yes();
                $.moveBottom()

                if (sequenceStage) sequenceStage.run();
            } else if (sequenceStage.needsResearchData && !collectData().hasResearchData()) {
                alert("Введите данные исследования")
            }
        } else if (answer === 2) { //no
            sequenceStage = sequenceStage.no();
            if (sequenceStage) sequenceStage.run();
        }
    }

    function saveData() {
        $('.status-label').addClass('d-none')
        console.log("before send", conclusion);
        conclusion.reason = getJoinedReasons(conclusion.reason, ",");
        $.post("http://sergisa.smrtp.ru/medical/save.php", {
            conclusion: conclusion.getConclusion(),
            data: collectData()
        }).done(function (data) {
            console.log(data);
            $('#good').removeClass('d-none')
        }).fail(function () {
            $('#error').removeClass('d-none')
        })
    }

    function showInstructions(continuousBleed, hasRepeat, riskLevel) {
        console.log("SHOWING instructions")
        if (conclusion.reason !== 4) {
            $('#repeat-checkbox').parent().hide();
        }
        $('#instructions > div').hide();
        $(`#instructionModal #${conclusion.reason.join(' ,#')}`).show();
        $('#instructionModal .bleed, #instructionModal .no-bleed, .has-repeat, .high-repeat-risk, .low-repeat-risk').hide();
        if (continuousBleed) {
            $('#instructionModal .bleed').show();
        } else {
            $('#instructionModal .no-bleed').show();
        }
        if (hasRepeat) {
            $('#instructionModal .has-repeat').show();
        }
        if (conclusion.risk >= 0 && conclusion.risk <= 2) {
            $('#instructionModal .low-repeat-risk').show();
        } else if (conclusion.risk >= 3 && conclusion.risk <= 7) {
            $('#instructionModal .high-repeat-risk').show();
        }
        $('#instructions').show()
    }

    document.getElementById('additionalResearchSave').addEventListener('click', function () {
        conclusion = makeConclusion();
        modalAdditionalResearch.hide();
    });
    document.getElementById('saveFinalData').addEventListener('click', function () {
        saveData();
    });
    document.getElementById('aprioriForm').addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
        $('#helpSequence').addClass('d-none')
        if (this.checkValidity()) {
            conclusion = makeConclusion();
            sequence = getSequence(conclusion, collectData())
            startHelpSequence();
            $.moveBottom()
            $('#saveFinalData').removeClass('d-none')
        }
        return false;
    })
    document.getElementById('aprioriForm').addEventListener('reset', function () {
        $('form.was-validated').removeClass('was-validated')
    })
    $('#bleedContinue-checkbox, #repeat-checkbox').on('change', function () {
        console.log('Changed', $(this).is(':checked'))
        showInstructions(
            $('#bleedContinue-checkbox').is(':checked'),
            $('#repeat-checkbox').is(':checked'),
        )
    })

</script>

</html>
