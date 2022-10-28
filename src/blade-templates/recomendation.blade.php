<h6 class="fw-bold">{{$tactic['title']}}</h6>
<ol>
        @foreach($tactic['list'] as $item)
                <li class="{{$item['class']}}">{{$item['content']}}</li>
        @endforeach
</ol>
