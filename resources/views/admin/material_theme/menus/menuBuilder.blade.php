@extends('admin.material_theme.layout')

@section('module_name')
    Menus
@endsection

@section('content')

    @include('admin.material_theme.components.alert')

    @include('admin.material_theme.components.forms.validation')


    <div class="row">
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <header class="card-heading">
                    <h2 class="card-title">Menu builder</h2>
                </header>
                <div class="card-body">
                    <div class="dd" id="menuBuilderTree">
                        <li class="dd-item-blueprint">
                            <button class="collapse" data-action="collapse" type="button" style="display: none;">–</button>
                            <button class="expand" data-action="expand" type="button" style="display: none;">+</button>
                            <div class="dd-handle dd3-handle">Drag</div>
                            <div class="dd3-content">
                                <span class="item-name">[item_name]</span>
                                <div class="dd-button-container">
                                    <button class="item-add">+</button>
                                    <button class="item-remove" data-confirm-class="item-remove-confirm">&times;</button>
                                </div>
                                <div class="dd-edit-box" style="display: none;">
                                    <input type="text" name="title" autocomplete="off" placeholder="Item"
                                           data-placeholder="Any nice idea for the title?"
                                           data-default-value="doMenu List Item. {?numeric.increment}">
                                    <i class="end-edit">save</i>
                                </div>
                            </div>
                        </li>
                        <ol class="dd-list"></ol>
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


    @include('admin.material_theme.components.forms.menuBuilderAddItemModal')


@endsection
