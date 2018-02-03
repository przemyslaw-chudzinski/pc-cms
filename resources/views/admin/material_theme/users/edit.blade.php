@extends('admin.material_theme.layout')

@section('module_name')
    Users
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Edit - {{ $user->first_name }} {{ $user->last_name }}</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                     'method' => 'put',
                     'route' => [config('admin.modules.users.actions.update.route_name'), $user->id],
                     'id' => 'editUserForm',
                     'novalidate' => 'novalidate'
                     ]) !!}
                    <div class="form-group">
                        {!! Form::label(null, 'User name') !!}
                        {!! Form::text('first_name', $user->first_name, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'User name') !!}
                        {!! Form::text('last_name', $user->first_name, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'User email') !!}
                        {!! Form::email('email', $user->email, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        <select class="select form-control" name="role_id" required>
                            @if(count($roles) > 0)
                                @foreach($roles as $role)
                                    <option
                                            value="{{ $role->id }}"
                                            @if ($user->role_id === $role->id)
                                                selected
                                            @endif
                                    >{{ $role->display_name }}</option>
                                @endforeach
                            @endif
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary">Save</button>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-6">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Reset password</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                        'method' => 'put',
                        'id' => 'userResetPasswordForm',
                        'route' => [config('admin.modules.users.actions.reset_password.route_name'), $user->id]
                    ]) !!}
                        <div class="form-group">
                            {!! Form::label(null, 'New password') !!}
                            {!! Form::password('password', ['class' => 'form-control', 'autocomplete' => 'off', 'id' => 'password']) !!}
                        </div>
                        <div class="form-group">
                            {!! Form::label(null, 'Repeat password') !!}
                            {!! Form::password('repeatedPassword', ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>


@endsection

@push('admin.footer')

    <script>
        (function () {

            $.validator.setDefaults({
                errorClass: 'help-block',
                highlight: function (elem) {
                    $(elem)
                        .closest('.form-group')
                        .addClass('has-error');
                },
                unhighlight: function (elem) {
                    $(elem)
                        .closest('.form-group')
                        .removeClass('has-error')
                }
            });

            $('#editUserForm').validate();

            $('#userResetPasswordForm').validate({
                rules: {
                    password: {
                        required: true,
                        minlength: 6
                    },
                    repeatedPassword: {
                        required: true,
                        minlength: 6,
                        equalTo: '#password'
                    }
                }
            });

        })();
    </script>

@endpush