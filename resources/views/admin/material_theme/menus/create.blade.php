@extends('admin.material_theme.layout')

@section('module_name')
    Menus
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">New menu</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                      'method' => 'post',
                      'route' => config('admin.modules.menus.actions.store.route_name'),
                      'id' => 'createNewMenuForm'
                     ]) !!}
                        <div class="form-group">
                            {!! Form::label(null, 'Menu name') !!}
                            {!! Form::text('name', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                        </div>

                        <div class="form-group">
                            {!! Form::label(null, 'Menu slug') !!}
                            {!! Form::text('slug', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                        </div>

                        <div class="form-group">
                            {!! Form::label(null, 'Description') !!}
                            {!! Form::textarea('description', null, ['class' => 'form-control', 'rows' => 5]) !!}
                        </div>

                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="saveAndPublish" checked> Save and publish
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#createNewMenuForm">Save</button>
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

            $('#createNewMenuForm').validate({
                rules: {
                    name: "required"
                }
            });
        })();
    </script>

@endpush