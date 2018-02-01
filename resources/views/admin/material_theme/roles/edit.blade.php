@extends('admin.material_theme.layout')

@section('module_name')
    Roles
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <div class="card">
                <header class="card-heading ">
                    <h2 class="card-title">Edit - {{ $role->display_name }}</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                     'method' => 'put',
                     'route' => [config('admin.modules.roles.actions.update.route_name'), $role->id],
                     'id' => 'editRoleForm',
                     'novalidate' => 'novalidate'
                     ]) !!}

                    <div class="form-group">
                        {!! Form::label(null, 'Role name') !!}
                        {!! Form::text('name', $role->name, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Display name') !!}
                        {!! Form::text('display_name', $role->display_name, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Role description') !!}
                        {!! Form::textarea('description', $role->description, ['class' => 'form-control']) !!}
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

            $('#editRoleForm').validate();
        })();
    </script>

@endpush