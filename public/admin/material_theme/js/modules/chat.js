export const chatContactList = () => {
  $('[data-contacts="show"]').on('click', function(e) {
    e.stopPropagation();
    $('#chat_contact_wrapper').toggleClass('hide show');
  });
  $(document).on('click touchstart', '[data-contacts="hide"]',function(event) {
		event.stopPropagation();
    $('#chat_contact_wrapper').toggleClass('show hide');

  });

}
