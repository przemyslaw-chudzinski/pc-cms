<div class="col-lg-4">
    <div class="card type--profile">
        <header class="card-heading card-background" id="card_img_02"></header>
        <div class="card-body">
            <h3 class="name"><p class="text-muted">Hello</p>{{ $user->first_name }} {{ $user->last_name }}</h3>
            <span class="title">{{ $user->role->display_name }}</span>
            <a href="{{ route('admin.account_settings.index') }}" class="btn btn-primary btn-round">Account settings</a>
        </div>
    </div>
</div>