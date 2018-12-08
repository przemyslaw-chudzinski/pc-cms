<div class="modal fade" id="newSettingForm" tabindex="-1" role="dialog" aria-labelledby="newSettingForm">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Create new setting</h4>
            </div>
            <div class="modal-body">
                {!! Form::open([
                    'method' => 'post',
                    'route' => getRouteName('settings', 'store'),
                    'id' => 'createNewSettingForm'
                ]) !!}
                <div class="form-group">
                    {!! Form::label(null, 'Key') !!}
                    {!! Form::text('key', null, ['class' => 'form-control', 'autocomplete' => 'off']) !!}
                </div>

                <div class="form-group">
                    {!! Form::label(null, 'Description') !!}
                    {!! Form::textarea('description', null, ['class' => 'form-control', 'rows' => 5]) !!}
                </div>

                <div class="form-group">
                    {!! Form::label(null, 'Type') !!}
                    <?php $types = config('admin.form_types'); ?>
                    <select name="type" class="form-control select">
                        @if(count($types) > 0)
                            @foreach($types as $type)
                                <option value="{{ $type['type'] }}">{{ $type['name'] }}</option>
                            @endforeach
                        @endif
                    </select>
                </div>

                {!! Form::close() !!}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary pc-cms-send-form pc-cms-loader-btn" data-form="#createNewSettingForm">Save</button>
            </div>
        </div>
    </div>
</div>

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

            $('#createNewSettingForm').validate({
                rules: {
                    key: 'required',
                    description: "required"
                }
            });
        })();
    </script>

@endpush