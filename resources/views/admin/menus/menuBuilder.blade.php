@extends('admin.layout')

@section('content')

    @include('admin.components.headers.pageHeader', [
        'title' => 'Menu builder - ' . $menu->name
    ])

    @include('admin.components.alert')

    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".pc-cms-menubuilder-add-item">Add item</button>
    </div>

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


    @include('admin.components.forms.menuBilderAddItemModal')


@endsection