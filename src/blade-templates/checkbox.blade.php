<div class="form-check">
    <input class="form-check-input" type="checkbox" id="{{$item['id']}}>" value="option2">
    @if (array_key_exists('err',$item))
        <div class="invalid-feedback">{{$item['err']}}</div>
    @endif
    <label class="form-check-label" for="{{$item['id']}}">{{$item['name']}}</label>
    @if (array_key_exists('desc',$item))
        <div class="form-text">{{$item['desc']}}</div>
    @endif
</div>
