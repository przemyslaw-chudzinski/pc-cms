@if (count($categories) > 0)
    <div>
        <ul class="d-flex list-unstyled">
            @foreach($categories as $category)
                <li><a class="btn btn-info btn-sm mr-1" href="{{ url('blog/category/' . $category->slug ) }}">{{ $category->name }}</a></li>
            @endforeach
        </ul>
    </div>
@endif