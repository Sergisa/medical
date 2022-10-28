<div class="form-check">
    <input class="form-check-input" type="checkbox" id="{{$sign['id']}}" value="option1">
    @if (array_key_exists("err",$sign))
        <div class="invalid-feedback">
            Необходимо ввести значение.
        </div>
    @endif
    <label class="form-check-label" for="{{$sign['id']}}">
        {{$sign['name']}}
    </label>
    @if(array_key_exists('sub',$sign))
        <div class="form-text">Кровь в стуле</div>
    @endif
</div>
