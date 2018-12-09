@extends('admin::layout')

@section('module_name')
    Menus
@endsection

@section('content')

    <div class="row">
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Menu builder - {{ $menu->name }}</h2>
                </header>
                <div class="card-body">
                    <div class="dd" id="menuBuilderTree" data-menu-id="{{ $menu->id }}">
                        @include('admin::components.menu.menuBuilderMenu', ['items' => $menu->getItems()])
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-4">
            <div class="card">
                <div class="card-body">
                    <div>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".pc-cms-menubuilder-add-item">Add item</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    @include('admin::components.forms.menuBuilderAddItemModal')


@endsection
