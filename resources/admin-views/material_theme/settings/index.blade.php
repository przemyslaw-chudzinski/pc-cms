@extends('admin::layout')

@section('module_name')
    Settings
@endsection

@section('content')

    <?php
    $module_name = 'settings';
    ?>


    <div class="row">
        <div class="col-xs-12 col-md-8">
            <div class="row">
                @if (count($settings) > 0)
                    @foreach($settings as $setting)
                        @if ($setting->key !== 'theme')
                            <div class="col-xs-12">
                                <div class="card">
                                    <header class="card-heading">
                                        <h2 class="card-title">{{ $setting->description }}</h2>
                                        <ul class="card-actions icons right-top">
                                            <li class="dropdown">
                                                <a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false">
                                                    <i class="zmdi zmdi-more-vert"></i>
                                                </a>
                                                <ul class="dropdown-menu btn-primary dropdown-menu-right">
                                                    <li>
                                                        <a href="#" class="pc-cms-remove-item" data-form="#removeSetting-{{ $setting->id }}">Remove</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </header>
                                    <div class="card-body">
                                        @include('admin::components.forms.settingsForm', [
                                            'setting' => $setting
                                        ])
                                    </div>
                                </div>
                            </div>
                        @endif
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

    @include('admin::components.forms.createNewSettingForm')

@endsection

