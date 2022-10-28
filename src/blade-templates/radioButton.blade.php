<div class="form-check">
    <input class="form-check-input" type="radio" id="{{$item['id']}}" name="{{$item['group']}}" required>
    @if (array_key_exists('err',$item))
        { %>
        <div class="invalid-feedback">{{$item['err']}}</div>
    @endif
    <label class="form-check-label" for="{{$item['id']}}">{{$item['name']}}</label>
    @if (array_key_exists('desc',$item))
        <div class="form-text">{{$item['desc']}}</div>
    @endif
</div>
