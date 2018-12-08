<div class="panel panel-default">
    <div class="panel-body">
        <div class="form-group">
            <label for="metaTitle">Meta title</label>
            <input type="text" name="meta_title" class="form-control" id="metaTitle" value="{{ $meta_title }}" autocomplete="off">
        </div>
        <div class="form-group">
            <label for="metaDescription">Meta description</label>
            <textarea class="form-control" name="meta_description" id="metaDescription">{{ $meta_description }}</textarea>
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="allow_indexed" @if($allow) checked @endif> Allow robots to index this page
                </label>
            </div>
        </div>
    </div>
</div>