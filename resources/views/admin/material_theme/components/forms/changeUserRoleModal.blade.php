<!-- Modal -->
<div class="modal fade" id="changeUserRole-{{ $user->id }}" tabindex="-1" role="dialog" aria-labelledby="changeUserRole-{{ $user->id }}">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edit role - {{ $user->first_name }} {{ $user->last_name }}</h4>
            </div>
            <div class="modal-body">
                {!! Form::open([
                    'id' => 'changeUserRoleForm-' . $user->id,
                    'route' => [getRouteName('users', 'role_update'), $user->id],
                    'method' => 'put'
                ]) !!}
                    <div class="form-group">
                        {!! Form::label(null, 'Role') !!}
                        <select name="role_id" class="form-control select">
                            @if (count($roles) > 0)
                                <option></option>
                                @foreach($roles as $role)
                                    <option
                                            value="{{ $role->id }}"
                                            @if ($user->role_id === $role->id)
                                                selected
                                            @endif
                                    >{{ $role->display_name }}</option>
                                @endforeach
                            @endif
                        </select>
                    </div>
                {!! Form::close() !!}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary pc-cms-send-form pc-cms-loader-btn" data-form="#changeUserRoleForm-{{ $user->id }}">Save</button>
            </div>
        </div>
    </div>
</div>