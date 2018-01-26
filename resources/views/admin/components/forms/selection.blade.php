<div class="form-group">
    @if($label)
        <label for="{{ $id }}">{{ $label }}</label>
    @endif
    <select
            @if($multiple)
            multiple
            name="{{ $fieldName }}[]"
            @else
            name="{{ $fieldName }}"
            @endif
            id="{{ $id }}"
            class="form-control pc-cms-select2-base">
        @if (count($selections) > 0)
            @if(!$multiple)
                <option></option>
            @endif
            @foreach($selections as $selection)
                @if (count($excludeIds) > 0)
                    @foreach($excludeIds as $excludeId)
                        @if ($excludeId !== $selection->id)
                                <option
                                        value="{{ $selection->id }}"
                                        @if($editState)
                                            @if (count($idsAttribute) > 0)
                                                @foreach($idsAttribute as $_id)
                                                    @if ($_id === $selection->id)
                                                        selected
                                                    @endif
                                                @endforeach
                                            @endif
                                        @endif
                                >{{ $selection[$selectionName] }}</option>
                        @endif
                    @endforeach
                @else
                        <option
                                value="{{ $selection->id }}"
                                @if($editState)
                                    @if (count($idsAttribute) > 0)
                                        @foreach($idsAttribute as $_id)
                                            @if ($_id === $selection->id)
                                                selected
                                            @endif
                                        @endforeach
                                    @endif
                                @endif
                        >{{ $selection[$selectionName] }}</option>
                @endif
            @endforeach
        @endif
    </select>
</div>