<div class="modal fade pc-cms-menubuilder-edit-item-{{ $item->id }}" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gridSystemModalLabel">Edit - {{ $item->title }}</h4>
            </div>
            <div class="modal-body">
                {!! Form::open([
                 'method' => 'put',
                 'id' => 'pc-cms-menubuilder-edit-item-form-' . $item->id,
                 'route' => [getRouteName('menus', 'item_update'), $item->id]
                 ]) !!}
                <div class="form-group">
                    {!! Form::label(null, 'Item name') !!}
                    {!! Form::text('title', $item->title, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                </div>
                <div class="form-group">
                    {!! Form::select('target', config('admin.modules.menus.link_targets'), $item->target, ['class' => 'form-control select']) !!}
                </div>

                <div class="form-group">
                    {!! Form::label(null, 'Url') !!}
                    {{ Form::text('url', $item->url, ['class' => 'form-control']) }}
                </div>

                <div class="form-group">
                    {!! Form::label(null,'Hook') !!}
                    {!! Form::text('hook', $item->hook, ['class' => 'form-control']) !!}
                </div>
                {!! Form::close() !!}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary pc-cms-send-form pc-cms-loader-btn" data-form="#pc-cms-menubuilder-edit-item-form-{{ $item->id }}">Save</button>
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