<div class="modal fade" id="additionalResearch" tabindex="-1" aria-labelledby="Данные эндоскопического исследования"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Эндоскопические признаки
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <form action="" id="endoscopicResearch">
                <div class="modal-body">
                    @foreach($signs as $sign)
                        @include('sign', ['sign'=> $sign])
                    @endforeach
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn btn-outline-dark" id="clearAdditionalResearch">Очистить</button>
                    <button type="button" class="btn btn-primary" id="additionalResearchSave">Сохранить</button>
                </div>
            </form>
        </div>
    </div>
</div>
