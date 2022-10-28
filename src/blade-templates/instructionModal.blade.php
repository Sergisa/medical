<div class="modal fade" id="instructionModal" tabindex="-1" aria-labelledby="Окно инструкций" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    Последовательность выбора действий в лечебной тактике ведения пациентов с ЖКК
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">
                <p class="fs-6">
                    Выберите пожалуйста опции, в связи с которыми, будет настроен список рекомендаций
                </p>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="bleedContinue-checkbox" value="option1">
                    <label class="form-check-label" for="bleedContinue-checkbox">Кровотечение продолжается</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="repeat-checkbox" value="option1">
                    <label class="form-check-label" for="repeat-checkbox">Зафиксирован рецидив</label>
                </div>
                <hr>
                <div id="instructions">
                    @foreach($tactics as $key=>$value)
                        <div id="{{$key}}">
                            @include('recomendation', ['tactic'=> $value])
                        </div>
                    @endforeach
                </div>
                <button type="button" class="btn btn-primary float-end" data-bs-dismiss="modal"
                        id="instructionModal__close">
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</div>
