const contactSetup = () => {
    let $eachPanel = $('#contact-wrapper .panel-group .panel'),
        count = 0;
    $eachPanel.each(function() {
        $(this).attr('id', 'contact_item_' + count);
        $(this).find('#contact_checkbox_').attr('id', 'contact_checkbox_' + count);
        count++;
    });
    $('#contact-wrapper .panel .action').on('click', function(e) {
        e.stopPropagation();
    });
    starUser();
}
const starUser = () => {
    $('.zmdi.star').parent().on('click', function(e) {
        e.stopPropagation();
        if ($(this).children('i').hasClass('text-yellow')) {
            $(this).children('i').removeClass('zmdi-star text-yellow');
            $(this).children().addClass('zmdi-star-outline');
        } else {
            $(this).children('i').removeClass('zmdi-star-outline');
            $(this).children('i').addClass('zmdi-star text-yellow');
        }
    });
}
const contactEditUser = () => {
    //triggered when contact modal is about to be shown
    $('#contactEditUser').on('show.bs.modal', function(e) {
        //get data attributes off the clicked element
        let name = $(e.relatedTarget).data('name'),
            phone = $(e.relatedTarget).data('phone'),
            email = $(e.relatedTarget).data('email'),
            avatar = $(e.relatedTarget).data('img'),
            star = $(e.relatedTarget).data('star');
        //populate the contact modal
        $(e.currentTarget).find('.user-avatar-wrapper .name').text(name);
        $(e.currentTarget).find('.user-avatar-wrapper .avatar').attr('src', avatar);
        $(e.currentTarget).find('#edit_name').val(name);
        $(e.currentTarget).find('#edit_phone').val(phone);
        $(e.currentTarget).find('#edit_email').val(email);
        if (star === true) {
            $(e.currentTarget).find('.user-avatar-wrapper .star').removeClass('zmdi-star-outline');
            $(e.currentTarget).find('.user-avatar-wrapper .star').addClass('zmdi-star text-yellow');
        } else {
            $(e.currentTarget).find('.user-avatar-wrapper .star').addClass('zmdi-star-outline');
            $(e.currentTarget).find('.user-avatar-wrapper .star').removeClass('zmdi-star text-yellow');
        }
        $('#edit_name').keydown(function() {
            var str = $(this).val();
            $("#contactEditUser .name").text(str);
        });
    });
};
const contactNewUser = () => {
    $('#newContactModal').on('show.bs.modal', function(e) {
        $('#add_name').keydown(function() {
            let str = $(this).val();
            $("#newContactModal .name").text(str);
        });
        $('#add_name').on('blur', function() {
            let str = $(this).val(),
                abbr = str.split(' ').map(function(item) {
                    return item[0]
                }).join('');
            $("#newContactModal .no-avatar").text(abbr.toUpperCase());
        });
    });
}
const contactSelected = () =>{
  $("#contact-wrapper [id*=contact_checkbox_]").change(function(e) {
      e.stopPropagation();
    var $this = $(this);
    if ($('#contact-wrapper input[id*=contact_checkbox_][type=checkbox]:checked').length){
      $('#header_action_bar').addClass('open');
    } else {
      $('#header_action_bar').removeClass('open');
    }
    if ($this.is(":checked")) {
      $this.closest(".panel-heading").addClass("highlight");
    } else {
      $this.closest(".panel-heading").removeClass("highlight");
    }
    var initCheckCount = $('#contact-wrapper input[id*=contact_checkbox_][type=checkbox]:checked').length;
    $('#selected_items span').text(`${initCheckCount} selected`);
  });
  $('#header_action_bar [data-mail-actionbar="closed"]').on('click',function(e){
    e.stopPropagation();
    $('#header_action_bar').removeClass('open');
    $('#contact-wrapper input[id*=contact_checkbox_][type=checkbox]:checked').each(function() {
      $(this).prop('checked', false);
       $(this).closest(".panel-heading").removeClass("highlight");
    });
  })
}
export {contactSetup, contactEditUser, contactNewUser,contactSelected}
