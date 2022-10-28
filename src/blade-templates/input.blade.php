<div class="col-{{(isset($col)) ? "auto" : $col }}">
    <input class="form-control" type="text" id="{{$item['id']}}" {{is_null($required) ? "" : "required" }}>
    <label class="form-label" for="{{$item['id']}}">{{$item['name']}}</label>
    @if (array_key_exists('err',$item))
        <div class="invalid-feedback">
            Необходимо ввести значение.
        </div>
    @endif
</div>
