@extends('admin::layout')

@section('module_name')
    Roles
@endsection

@section('content')

    <?php
        $module_name = 'roles';
    ?>

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <div class="card">
                <header class="card-heading ">
                    <h2 class="card-title">New role</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                     'method' => 'post',
                     'route' => getRouteName($module_name, 'store'),
                     'id' => 'createRoleForm',
                     'novalidate' => 'novalidate'
                     ]) !!}

                    <div class="form-group">
                        {!! Form::label(null, 'Role name') !!}
                        {!! Form::text('name', null, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Display name') !!}
                        {!! Form::text('display_name', null, ['class' => 'form-control']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Role description') !!}
                        {!! Form::textarea('description', null, ['class' => 'form-control']) !!}
                    </div>

                    <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#createRoleForm">Save</button>
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

            $('#createRoleForm').validate();
        })();
    </script>

@endpush