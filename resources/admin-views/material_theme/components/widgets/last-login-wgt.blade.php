<div class="col-xs-12 col-md-4">
    <div class="row">
        <div class="col-xs-12">
            <div class="card app_accent_bg">
                <div class="card-body">
                    <h3 class="m-0 text-white">Last login: <strong>{{ $user->last_login }}</strong></h3>
                    <p class="m-b-0 m-t-5 text-muted text-white">From IP: <strong>{{ $user->IP }}</strong></p>
                    <p class="m-b-0 m-t-5 text-muted text-white">USER AGENT: <span>{{ $user->USER_AGENT }}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>