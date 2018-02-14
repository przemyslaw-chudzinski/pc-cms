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
                    <h2 class="card-title">Edit - {{ $menu->name }}</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                        'method' => 'put',
                        'route' => [getRouteName('menus', 'update'), $menu->id],
                         'id' => 'editMenuForm'
                    ]) !!}
                    <div class="form-group">
                        {!! Form::label(null, 'Menu name') !!}
                        {!! Form::text('name', $menu->name, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Menu slug') !!}
                        {!! Form::text('slug', $menu->slug, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                    </div>

                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input name="generateSlug" type="checkbox"> Do you want to generate new slug based on menu name?
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        {!! Form::label(null, 'Description') !!}
                        {!! Form::textarea('description', $menu->description, ['class' => 'form-control', 'rows' => 5]) !!}
                    </div>

                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input name="saveAndPublish" type="checkbox" checked> Save and publish
                            </label>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#">Save</button>
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

            $('#editMenuForm').validate({
                rules: {
                    name: "required"
                }
            });
        })();
    </script>

@endpush