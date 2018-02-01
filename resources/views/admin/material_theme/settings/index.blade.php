@extends('admin.material_theme.layout')

@section('module_name')
    Settings
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')


    <div class="row">
        <div class="col-xs-12 col-md-8">
            <div class="row">
                @if (count($settings) > 0)
                    @foreach($settings as $setting)
                        <div class="col-xs-12">
                            <div class="card">
                                <div class="card-body">
                                    @include('admin.material_theme.components.forms.settingsForm', [
                                        'setting' => $setting
                                    ])
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
        <div class="col-xs-12 col-md-4">
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-body">
                            <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#newSettingForm">Add new</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('admin.material_theme.components.forms.createNewSettingForm')

@endsection

