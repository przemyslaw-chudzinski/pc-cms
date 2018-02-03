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
                    <h2 class="card-title">New user</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                     'method' => 'post',
                     'route' => config('admin.modules.users.actions.store.route_name'),
                     'id' => 'createNewUserForm',
                     'novalidate' => 'novalidate'
                     ]) !!}
                    <div class="form-group">
                        {!! Form::label(null, 'User name') !!}
                        {!! Form::text('first_name', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'User name') !!}
                        {!! Form::text('last_name', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'User email') !!}
                        {!! Form::email('email', null, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'User password') !!}
                        {!! Form::password('password', ['class' => 'form-control', 'autocomplete' => 'off', 'required', 'minlength' => 6]) !!}
                    </div>

                    <div class="form-group">
                        <select class="select form-control" name="role_id" required>
                            @if(count($roles) > 0)
                                @foreach($roles as $role)
                                    <option value="{{ $role->id }}">{{ $role->display_name }}</option>
                                @endforeach
                            @endif
                        </select>
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

            $('#createNewUserForm').validate();
        })();
    </script>

@endpush