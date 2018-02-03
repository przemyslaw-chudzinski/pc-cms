<div class="col-lg-4">
    <div class="card type--profile">
        <header class="card-heading card-background" id="card_img_02"></header>
        <div class="card-body">
            <h3 class="name">{{ $user->first_name }} {{ $user->last_name }}</h3>
            <span class="title">{{ $user->role->display_name }}</span>
            <a href="{{ route('admin.account_settings.index') }}" class="btn btn-primary btn-round">Account settings</a>
        </div>
        <footer class="card-footer border-top">
            <div class="row row p-t-10 p-b-10">
                <div class="col-xs-4"><span class="count">1420</span><span>Post</span></div>
                <div class="col-xs-4"><span class="count">1.1m</span><span>Followers</span></div>
                <div class="col-xs-4"><span class="count">320</span><span>Following</span></div>
            </div>
        </footer>
    </div>
</div>