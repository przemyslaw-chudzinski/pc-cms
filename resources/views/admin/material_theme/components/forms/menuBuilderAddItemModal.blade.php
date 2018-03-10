<div class="modal fade pc-cms-menubuilder-add-item" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gridSystemModalLabel">Add new item</h4>
            </div>
            <div class="modal-body">
                {!! Form::open([
                 'method' => 'post',
                 'id' => 'pc-cms-menubuilder-create-item-form',
                 'route' => [config('admin.modules.menus.actions.item_store.route_name'), $menu->id],
                 'files' => true
                 ]) !!}
                <div class="form-group">
                    {!! Form::label(null, 'Item name') !!}
                    {!! Form::text('title', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                </div>
                <div class="form-group">
                    {!! Form::select('target', config('admin.modules.menus.link_targets'), null, ['class' => 'form-control select']) !!}
                </div>

                <div class="form-group">
                    {!! Form::label(null, 'Url') !!}
                    {{ Form::text('url', null, ['class' => 'form-control']) }}
                </div>

                <div class="form-group">
                    @include('admin.material_theme.components.forms.uploadImage', [
                                    'filedName' => 'menuItemImage',
                                    'id' => 'menuItemImage',
                                    'label' => 'Image',
                                    'previewContainerId' => 'menuItemImagePreview',
                                    'placeholder' => 'Choose menu item image',
                                    'multiple' => false,
                                    'editState' => false
                                ])
                </div>
                {!! Form::close() !!}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary pc-cms-send-form pc-cms-loader-btn" data-form="#pc-cms-menubuilder-create-item-form">Save</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


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

            $('#pc-cms-menubuilder-create-item-form').validate({
                rules: {
                    title: 'required'
                }
            });
        })();
    </script>

@endpush