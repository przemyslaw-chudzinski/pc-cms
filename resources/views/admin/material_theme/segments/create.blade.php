@extends('admin.material_theme.layout')

@section('module_name')
    Segments
@endsection

@section('content')


    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">New segment</h2>
                </header>
                <div class="card-body">
                    {!! Form::open([
                     'route' => getRouteName('segments', 'store'),
                     'method' => 'post',
                     'id' => 'createNewSegmentForm',
                     'novalidate' => 'novalidate'
                     ]) !!}

                        <div class="form-group">
                            {!! Form::label(null, 'Segment name') !!}
                            {!! Form::text('name', null, ['class' => 'form-control', 'autocomplete' => 'off', 'required']) !!}
                        </div>

                        <div class="form-group">
                            {!! Form::label(null, 'Segment content') !!}
                            {!! Form::textarea('content', null, ['class' => 'form-control pc-cms-editor']) !!}
                        </div>

                        <button type="submit" class="btn btn-primary pc-cms-loader-btn" data-form="#createNewSegmentForm">Save</button>
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

            $('#createNewSegmentForm').validate();
        })();
    </script>

@endpush