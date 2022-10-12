<!DOCTYPE html>
<?php
header('Content-Type: text/html; charset=utf-8');
//error_reporting(E_ERROR | E_PARSE);
$database = new PDO('mysql:dbname=medical;host=sergisa.ru', 'user15912_sergey', 'isakovs');
$patient = (object)[
    "identifier" => null,
    "erythrocytes" => null,
    "hemoglobin" => null,
    "pulse" => null,
    "hematocrit" => null,
    "age" => null,
    "coffeeVomit" => null,
    "melena" => null,
    "lossConsciousness" => null,
    "bloodArterialPressure" => null,
    "chronicHeartFailure" => null,
    "cardiacIschemia" => null,
    "kidneyFailure" => null,
    "liverFailure" => null,
    "metastaticCancer" => null,
    "pathologicalChanges" => null,
    "aorticProsthesis" => null,
    "heartDefects" => null,
    "heartValvesProsthesis" => null,
    "additionalIllness" => null,
    "bloodVomit" => null,
    "hematohesia" => null,
    "blackFeces" => null,
    "collaptoidState" => null,
    "gastrointestinalUcler" => null,
    "paleSkin" => null,
    "hiddenBleeding" => null,
    "stickySweat" => null,
    "gender" => null,
    "anamnesisGastrointestinalUpperBleeding" => null,
    "anamnesisGastrointestinalUndefinedBleeding" => null,
    "v32" => null,
    "v33" => null,
    "v34" => null,
    "v35" => null,
    "v36" => null,
    "v37" => null,
    "v38" => null,
    "v39" => null,
    "v40" => null,
    "v41" => null,
    "v42" => null,
    "v43" => null,
    "v44" => null,
    "v45" => null,
    "v46" => null,
    "v47" => null,
    "v48" => null,
    "v49" => null,
    "ASA1" => null,
    "ASA2" => null,
    "ASA3" => null,
    "ASA4" => null,
    "ASA5" => null,
    "ASA6" => null,
    "E" => null,
];
if (array_key_exists('id', $_GET)) {
    $id = $_GET['id'];
    $patient = $database->query("SELECT * FROM patient WHERE ID = $id", PDO::FETCH_OBJ)->fetch();
}
?>
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
    <form action="" class="p-3 needs-validation" id="aprioriForm" name="signsForm" novalidate>
        <div class="row">
            <div class="col-6">
                <input type="text" class="form-control" id="identifier" placeholder="Идентификатор"
                       value="<?= $patient->identifier ?? null ?>">
                <label class="form-check-label" for="identifier"></label>
            </div>
            <div class="col-6">
                <input type="text" class="form-control" id="IIC" placeholder="Код МКБ"
                       value="<?= $patient->IIC ?? null ?>">
                <label class="form-check-label" for="IIC"></label>
            </div>
        </div>
        <div class="col-auto">
            <textarea type="text" class="form-control" id="description" placeholder="Описание"
                      rows="4"><?= $patient->description ?? null ?></textarea>
            <label class="form-check-label" for="description"></label>
        </div>
        Пол *
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="gender" id="male"
                   value="female" <?= $patient->gender == 'male' ? "checked" : "" ?> required>
            <label class="form-check-label" for="male">Мужской</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="gender" id="female"
                   value="male" <?= $patient->gender == 'female' ? "checked" : "" ?>>
            <label class="form-check-label" for="female">Женский</label>
        </div>
        <div class="row mt-1">
            <div class="col-auto">
                <input type="text" class="form-control" id="age" min="0" step="1" value="<?= $patient->age ?? null ?>"
                       required>
                <div class="invalid-feedback">
                    Необходимо ввести возраст.
                </div>
                <label for="age" class="form-label">Возраст, лет *</label>
            </div>

        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
                   id="paleSkin" <?= (!is_null($patient) && $patient->paleSkin) ? "checked" : "" ?>>
            <label class="form-check-label" for="paleSkin">Бледность кожных покровов</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
                   id="stickySweat" <?= (!is_null($patient) && $patient->stickySweat) ? "checked" : "" ?>>
            <label class="form-check-label" for="stickySweat">Холодный липкий пот</label>
        </div>
        <div class="row">
            <div class="col-auto">
                <input class="form-control" type="text" id="bloodArterialPressure"
                       value="<?= $patient->bloodArterialPressure ?? null ?>" required>
                <div class="invalid-feedback">
                    Необходимо ввести значение.
                </div>
                <label class="form-label" for="bloodArterialPressure">АД сист., мм.рт.ст. *</label>
            </div>
            <div class="col-auto">
                <input class="form-control" type="text" id="pulse" value="<?= $patient->pulse ?? null ?>" required>
                <div class="invalid-feedback">
                    Необходимо ввести значение.
                </div>
                <label class="form-label" for="pulse">Пульс, уд/мин *</label>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox"
                           id="collaptoidState" <?= (!is_null($patient) && $patient->collaptoidState) ? "checked" : "" ?>>
                    <label class="form-check-label" for="collaptoidState">Коллаптоидное состояние</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="lossConsciousness" <?= (!is_null($patient) && $patient->lossConsciousness) ? "checked" : "" ?>>
                    <label class="form-check-label" for="lossConsciousness">Потеря сознания</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="coffeeVomit" <?= (!is_null($patient) && $patient->coffeeVomit) ? "checked" : "" ?>>
                    <label class="form-check-label" for="coffeeVomit">Рвота содержимым по типу «кофейной гущи»</label>
                </div>
                <div class="form-check" title="Рвота кровью">
                    <input class="form-check-input" type="checkbox"
                           id="bloodVomit" <?= (!is_null($patient) && $patient->bloodVomit) ? "checked" : "" ?>>
                    <label class="form-check-label" for="bloodVomit">Гематемезис</label>
                    <div class="form-text">Рвота кровью</div>
                </div>
                <div class="form-check" title="Черный дегтеобразный стул">
                    <input class="form-check-input" type="checkbox"
                           id="melena" <?= (!is_null($patient) && $patient->melena) ? "checked" : "" ?>>
                    <label class="form-check-label" for="melena">Мелена</label>
                    <div class="form-text">Черный дегтеобразный стул</div>
                </div>
                <div class="form-check" title="Кровь в стуле">
                    <input class="form-check-input" type="checkbox"
                           id="hematohesia" <?= (!is_null($patient) && $patient->hematohesia) ? "checked" : "" ?>>
                    <label class="form-check-label" for="hematohesia">Гематохезия</label>
                    <div class="form-text">Кровь в стуле</div>
                </div>
                <div class="form-check" title="Кровь в стуле">
                    <input class="form-check-input" type="checkbox"
                           id="blackFeces" <?= (!is_null($patient) && $patient->blackFeces) ? "checked" : "" ?>>
                    <label class="form-check-label" for="blackFeces">
                        Черный оформленный кал при пальцевом исследовании прямой кишки
                    </label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="gastrointestinalUcler" <?= (!is_null($patient) && $patient->gastrointestinalUcler) ? "checked" : "" ?>>
                    <label class="form-check-label" for="gastrointestinalUcler">Язвы в ЖКТ в анамнезе</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="anamnesisGastrointestinalUpperBleeding" <?= (!is_null($patient) && $patient->anamnesisGastrointestinalUpperBleeding) ? "checked" : "" ?>>
                    <label class="form-check-label" for="anamnesisGastrointestinalUpperBleeding">
                        ЖКК в анамнезе в верхнем отделе ЖКТ</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="anamnesisGastrointestinalUndefinedBleeding" <?= (!is_null($patient) && $patient->anamnesisGastrointestinalUndefinedBleeding) ? "checked" : "" ?>>
                    <label class="form-check-label" for="anamnesisGastrointestinalUndefinedBleeding">
                        ЖКК в анамнезе в неустановленном отделе ЖКТ
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="additionalIllness" <?= (!is_null($patient) && $patient->additionalIllness) ? "checked" : "" ?>>
                    <label class="form-check-label" for="additionalIllness">
                        Сопутствующие заболевания в стадии суб- и декомпенсации, требующие неотложных лечебных
                        мероприятий или непосредственно угрожающие жизни больного
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-auto">
                <input class="form-control" type="text" id="hematocrit" value="<?= $patient->hematocrit ?? null ?>"
                       required>
                <div class="invalid-feedback">
                    Необходимо ввести значение.
                </div>
                <label class="form-label" for="hematocrit">Гематокрит, % *</label>
            </div>
            <div class="col-auto">
                <input class="form-control" type="text" id="hemoglobin" value="<?= $patient->hemoglobin ?? null ?>"
                       required>
                <div class="invalid-feedback">
                    Необходимо ввести значение.
                </div>
                <label class="form-label" for="hemoglobin">Гемоглобин, г/л *</label>
            </div>
            <div class="col-auto">
                <input class="form-control" type="text" id="erythrocytes" value="<?= $patient->erythrocytes ?? null ?>"
                       required>
                <div class="invalid-feedback">
                    Необходимо ввести значение.
                </div>
                <label class="form-label" for="erythrocytes">Эритроциты, 10^12/л *</label>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="hiddenBleeding" <?= (!is_null($patient) && $patient->hiddenBleeding) ? "checked" : "" ?>>
                    <label class="form-check-label" for="hiddenBleeding">
                        Тест на скрытую кровь в кале "+"
                    </label>
                </div>
            </div>
        </div>
        <div class="row riskFactors">
            <p class="fw-bold my-2">
                Факторы риска (сопутствующие заболевания)
            </p>
            <hr class="mb-3">
            <div class="col-md-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="chronicHeartFailure" <?= (!is_null($patient) && $patient->chronicHeartFailure) ? "checked" : "" ?>>
                    <label class="form-check-label" for="chronicHeartFailure">
                        Хроническая сердечная недостаточность в анамнезе
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="cardiacIschemia" <?= (!is_null($patient) && $patient->cardiacIschemia) ? "checked" : "" ?>>
                    <label class="form-check-label" for="cardiacIschemia">Ишемическая болезнь сердца в анамнезе</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="kidneyFailure" <?= (!is_null($patient) && $patient->kidneyFailure) ? "checked" : "" ?>>
                    <label class="form-check-label" for="kidneyFailure">Почечная недостаточность в анамнезе</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="liverFailure" <?= (!is_null($patient) && $patient->liverFailure) ? "checked" : "" ?>>
                    <label class="form-check-label" for="liverFailure">Печеночная недостаточность в анамнезе</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="metastaticCancer" <?= (!is_null($patient) && $patient->metastaticCancer) ? "checked" : "" ?>>
                    <label class="form-check-label" for="metastaticCancer">Метастатический рак в анамнезе</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="pathologicalChanges" <?= (!is_null($patient) && $patient->pathologicalChanges) ? "checked" : "" ?>>
                    <label class="form-check-label" for="pathologicalChanges">
                        Патологические изменения панкреато-билиарной зоны в анамнезе или при объективном обследовании
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="aorticProsthesis" <?= (!is_null($patient) && $patient->aorticProsthesis) ? "checked" : "" ?>>
                    <label class="form-check-label" for="aorticProsthesis">
                        Протезирование аорты по поводу аневризмы в анамнезе
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="heartDefects" <?= (!is_null($patient) && $patient->heartDefects) ? "checked" : "" ?>>
                    <label class="form-check-label" for="heartDefects">Пороки развития сердца в анамнезе</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="heartValvesProsthesis" <?= (!is_null($patient) && $patient->heartValvesProsthesis) ? "checked" : "" ?>>
                    <label class="form-check-label" for="heartValvesProsthesis">
                        Протезирование сердечных клапанов в анамнезе
                    </label>
                </div>
            </div>
        </div>
        <div class="row ASAClass">
            <p class="fw-bold my-2">
                Физический статус пациента по классификации ASA
            </p>
            <hr class="mb-3">
            <div class="col-md-4">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="ASA1" value="ASA1"
                           name="ASA" <?= (!is_null($patient) && $patient->ASA1) ? "checked" : "" ?> required>
                    <label class="form-check-label" for="ASA1">ASA I</label>
                    <div class="form-text">Здоровый пациент</div>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="ASA2" value="ASA2"
                           name="ASA" <?= (!is_null($patient) && $patient->ASA2) ? "checked" : "" ?> required>
                    <label class="form-check-label" for="ASA2">ASA II</label>
                    <div class="form-text">Пациент с легким системным заболеванием</div>

                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="ASA3" value="ASA3"
                           name="ASA" <?= (!is_null($patient) && $patient->ASA3) ? "checked" : "" ?> required>
                    <label class="form-check-label" for="ASA3">ASA III</label>
                    <div class="form-text">Пациент с тяжелым системным заболеванием</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="ASA4" value="ASA4"
                           name="ASA" <?= (!is_null($patient) && $patient->ASA4) ? "checked" : "" ?> required>
                    <label class="form-check-label" for="ASA4">ASA IV</label>
                    <div class="form-text">
                        Пациент с тяжелым системным заболеванием, которое представляет собой постоянную угрозу для жизни
                    </div>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="ASA5" value="ASA5"
                           name="ASA" <?= (!is_null($patient) && $patient->ASA5) ? "checked" : "" ?> required>
                    <label class="form-check-label" for="ASA5">ASA V</label>
                    <div class="form-text">Умирающий пациент. Операция по жизненным показаниям.</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="ASA6" value="ASA6"
                           name="ASA" <?= (!is_null($patient) && $patient->ASA6) ? "checked" : "" ?> required>
                    <label class="form-check-label" for="ASA6">ASA VI</label>
                    <div class="form-text">Констатирована смерть мозга</div>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="E" value=""
                           name="E" <?= (!is_null($patient) && $patient->E) ? "checked" : "" ?>>
                    <label class="form-check-label" for="E">E</label>
                    <div class="form-text">Неотложность хирургического вмешательства</div>
                </div>
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
                    <div id="questionBlock" class="d-flex justify-content-end mt-2">
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

<div class="modal fade" id="additionalResearch" tabindex="-1" aria-labelledby="additionalResearch" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Эндоскопические признаки
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" id="endoscopicResearch">
                <div class="modal-body">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign32" <?= (!is_null($patient) && $patient->v32) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign32">
                            Поверхностный дефект (эрозия) слизистой оболочки
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign33" <?= (!is_null($patient) && $patient->v33) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign33">
                            Локальная атрофия ворсинок тонкой кишки
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign34" <?= (!is_null($patient) && $patient->v34) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign34">
                            Локальные воспалительные изменения слизистой оболочки
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign35" <?= (!is_null($patient) && $patient->v35) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign35">Анастомоз ЖКТ</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign36" <?= (!is_null($patient) && $patient->v36) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign36">Задержка видеокапсулы</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign37" <?= (!is_null($patient) && $patient->v37) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign37">
                            Нерегулярность поверхности слизистой оболочки (подозрение на наличие опухоли)
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign38" <?= (!is_null($patient) && $patient->v38) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign38">Дивертикулы кишки</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign39" <?= (!is_null($patient) && $patient->v39) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign39">Посткоагуляционный струп</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign40" <?= (!is_null($patient) && $patient->v40) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign40">Сосудистые мальформации</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign41" <?= (!is_null($patient) && $patient->v41) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign41">Стриктура кишки</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign42" <?= (!is_null($patient) && $patient->v42) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign42">
                            Тотальная атрофия ворсинок тонкой кишки
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign43" <?= (!is_null($patient) && $patient->v43) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign43">
                            Тотальные воспалительные изменения слизистой оболочки
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign44" <?= (!is_null($patient) && $patient->v44) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign44">
                            Глубокий дефект (язва) слизистой оболочки
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign45" <?= (!is_null($patient) && $patient->v45) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign45">Кровотечение из геморроидального узла</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign46" <?= (!is_null($patient) && $patient->v46) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign46">Варикозно-расширенные вены</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign47" <?= (!is_null($patient) && $patient->v47) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign47">Кровотечение из фистулы</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign48" <?= (!is_null($patient) && $patient->v48) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign48">
                            Разрыв слизистой оболочки брюшного отдела пищевода и/или кардиального отдела желудка
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                               id="sign49" <?= (!is_null($patient) && $patient->v49) ? "checked" : "" ?>>
                        <label class="form-check-label" for="sign49">
                            Наличие крови, фиксированный тромб или сгусток, кровоточащий сосуд
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn btn-outline-dark" id="clearAdditionalResearch">Очитстить</button>
                    <button type="button" class="btn btn-primary" id="additionalResearchSave">Сохранить</button>
                </div>
            </form>
        </div>
    </div>
</div>

</body>
<script src="dist/js/popper.min.js"></script>
<script src="dist/js/bootstrap.min.js"></script>
<script src="dist/js/jquery3.6.0.min.js"></script>
<script src="dist/js/bundle.min.js"></script>
<script>
    const modalAdditionalResearch = new bootstrap.Modal('#additionalResearch');
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
        exportToCsv('patientData.csv', collectData())
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

</script>

</html>
