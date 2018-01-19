<!-- Contact form -->
<section class="pc-section pc-contact-form-front-page">
    <div class="container text-center pc-section-header-2-wrapper">
        <h3 class="text-uppercase text-white pc-section-header-2">{!! Segment::get('front-contact-header') !!}</h3>
        <div class="row">
            <div class="col-lg-7">
                <span class="d-block text-xs-center text-lg-right text-white pc-section-header-2-subheader">{!! Segment::get('front-contact-subheader') !!}</span>
            </div>
            <div class="col-lg-5 text-xs-center text-lg-left">
                <a href="#" class="btn text-white pc-button-primary pc-button-contact-form"><span>Najczęściej zadawane pytania</span></a>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <form class="pc-contact-form">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Imię i nazwisko">
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Telefon">
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Adres email">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Wiadomość"></textarea>
                    </div>
                    <button class="btn pc-button-primary pc-button-contact-form"><span>Wyślij</span></button>
                </form>
            </div>
        </div>
    </div>
</section>