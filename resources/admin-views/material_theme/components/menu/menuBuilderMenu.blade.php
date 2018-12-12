@if (count($items) > 0)
    <ol class="dd-list">
        @foreach(collect($items)->sortBy('order') as $item)
            <li class="dd-item" data-id="{{ $item->id }}">
                <button class="collapse" data-action="collapse" type="button" style="display: none;">–</button>
                <button class="expand" data-action="expand" type="button" style="display: none;">+</button>
                <div class="dd-handle dd3-handle">Drag</div>
                <div class="dd3-content">
                    <span class="item-name">{{ $item->title }}</span>
                    <div class="dd-button-container">
                        <button class="item-remove" data-confirm-class="item-remove-confirm">&times;</button>
                        <button type="button" data-toggle="modal" data-target=".pc-cms-menubuilder-edit-item-{{ $item->id }}">Edit</button>
                    </div>
                </div>
                @if(!$item->children->isEmpty())
                    @include('admin::components.menu.menuBuilderMenu', ['items' => $item->children])
                @endif
                @include('admin::components.forms.menuBuilderEditItemModal')
            </li>
        @endforeach
    </ol>
@endif