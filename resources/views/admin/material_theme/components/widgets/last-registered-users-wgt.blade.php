<div class="col-lg-4">
    <div class="card ">
        <header class="card-heading app_primary_bg">
            <h2 class="card-title text-white">Last registered users</h2>
        </header>
        <div class="card-body p-0">
            <ul class="list-group ">
                @if (count($users) > 0)
                    @foreach($users as $user)
                        <a href="{{ route(getRouteName('users', 'edit'),['user' => $user->id]) }}">
                            <li class="list-group-item">
                                <span class="pull-left"><img src="{{ asset('admin/material_theme/dist/img/profiles/07.jpg') }}" alt="" class="img-circle max-w-40 m-r-10 "></span>
                                <div class="list-group-item-body">
                                    <div class="list-group-item-heading">{{ $user->first_name }} {{ $user->last_name }}</div>
                                    <div class="list-group-item-text">{{ $user->email }}</div>
                                </div>
                            </li>
                        </a>
                    @endforeach
                @endif
            </ul>
        </div>
        <div class="card-footer border-top">
            <ul class="more">
                <li>
                    <a href="{{ route(getRouteName('users', 'index')) }}">View More</a>
                </li>
            </ul>
            <ul class="card-actions icons right">
                <li>
                    {!! Form::open(['method' => 'get', 'route' => getRouteName('users', 'create'), 'id' => 'newUserWgtRedForm']) !!}{!! Form::close() !!}
                    <button class="btn btn-primary btn-fab"><i class="zmdi zmdi-account-add pc-cms-send-form" data-form="#newUserWgtRedForm"></i></button>
                </li>
            </ul>
        </div>
    </div>
</div>