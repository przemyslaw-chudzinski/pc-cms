@if (Session::has('alert'))
    @switch(Session::get('alert')['type'])
        @case('success')
            <div class="alert alert-success">{{Session::get('alert')['message']}}</div>
        @break
        @case('danger')
             <div class="alert alert-danger">{{Session::get('alert')['message']}}</div>
        @break
        @case('warning')
            <div class="alert alert-warning">{{Session::get('alert')['message']}}</div>
        @break
    @endswitch
@endif