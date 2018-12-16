@extends('admin::layout')

@section('module_name')
    Account settings
@endsection

@section('content')


    <div class="row">
        <div class="col-xs-12 col-md-6">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">User info</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                        'id' => 'accountSettingsForm',
                        'route' => 'admin.account_settings.update',
                        'method' => 'put'
                    ]) !!}
                    <div class="form-group">
                        {!! Form::label(null, 'First name') !!}
                        {!! Form::text('first_name', $user->first_name, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Last name') !!}
                        {!! Form::text('last_name', $user->last_name, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Email') !!}
                        {!! Form::email('email', $user->email, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#accountSettingsForm">Save</button>
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
                        'route' => [getRouteName('users', 'reset_password'), $user->id]
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

            $('#accountSettingsForm').validate({
                rules: {
                    name: 'required',
                    email: 'required'
                }
            });

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