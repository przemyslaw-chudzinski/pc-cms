import {filterList} from './filterList';
const cal = () => {
  var date = new Date();
  var m = date.getMonth();
  var y = date.getFullYear();
  var target = $('#calendar');
  target.fullCalendar({
    header: {
      left: 'today',
      center: 'prev,title,next',
      right: 'month,agendaWeek,agendaDay'
    },
    theme: false,
    selectable: true,
    selectHelper: true,
    editable: true,
    navLinks: true,
    eventLimit: true,
    events: [{
      id: 1,
      title: 'Plan design meeting',
      start: '2017-04-02T10:30:00.000Z',
      end: '2017-04-02T12:30:00.000Z',
      allDay: false,
      className: 'mw-salmon',
      description: 'Fashion axe kitsch marfa, art party gluten-free beard meditation lumbersexual pinterest sapiente. Aute portland nostrud four dollar toast, organic typewriter cold-pressed wolf do chartreuse godard.'
    }, {
      id: 2,
      title: 'Client Meeting',
      start: '2017-04-05T08:30:00',
      end: '2017-04-05T12:00:00',
      allDay: false,
      className: 'mw-grayBlue',
      description: 'Before they sold out consequat voluptate man bun, craft beer ullamco mlkshk quis health goth cold-pressed yuccie pork belly.'
    }, {
      id: 3,
      title: 'Conference in NYC',
      start: '2017-04-09',
      end: '2017-04-12',
      allDay: true,
      className: 'mw-green',
      description: 'Celiac tilde commodo four dollar toast. Scenester kale chips roof party PBR&B, organic everyday carry cornhole tumblr kickstarter marfa salvia photo booth voluptate gastropub ennui. '
    }, {
      id: 4,
      title: 'UX design review',
      start: '2017-04-13T11:30:00',
      end: '2017-04-13T14:30:00',
      allDay: false,
      className: 'mw-blue',
      description: 'Paleo flexitarian bushwick letterpress, ea migas yr adipisicing. '
    }, {
      id: 5,
      title: 'Board Meeting',
      start: '2017-04-23T10:00:00',
      end: '2017-04-23T13:00:00',
      allDay: true,
      className: 'mw-grayBlue',
      description: ''
    }, {
      id: 6,
      title: 'Concert',
      start: '2017-04-22',
      end: '2017-04-23',
      allDay: true,
      className: 'mw-turquoise',
      description: 'Man bun tacos tumblr kombucha, yuccie banjo affogato dolore gentrify retro chartreuse. '
    },
    {
      id: 7,
      title: 'Birthday',
      start: '2017-04-08',
      end: '2017-04-09',
      allDay: true,
      className: 'mw-turquoise',
      description: 'Celiac tilde commodo four dollar toast. Scenester kale chips roof party PBR&B, organic everyday carry cornhole tumblr kickstarter marfa salvia photo booth voluptate gastropub ennui. '
    }, {
      id: 8,
      title: 'Design Meeting',
      start: '2017-04-18',
      end: '2017-04-19',
      allDay: true,
      className: 'mw-salmon',
      description: 'Before they sold out consequat voluptate man bun, craft beer ullamco mlkshk quis health goth cold-pressed yuccie pork belly.'
    }, {
      id: 9,
      title: 'Dr. Appointment',
      start: '2017-04-15T10:00:00',
      end: '2017-04-15T16:00:00',
      allDay: false,
      className: 'mw-turquoise',
      description: 'Celiac tilde commodo four dollar toast.'
    }, {
      id: 10,
      title: 'Brainstorm Session',
      start: '2017-05-15T10:30:00',
      end: '2017-05-19T12:30:00',
      allDay: false,
      className: 'mw-grayBlue',
      description: ''
    },
  ],
  dayClick: function(date, jsEvent, view) {
    $('#modal_new_event').modal('show');
    $('#modal_new_event #new_event_title').val('');
    $('#modal_new_event #allDay').prop('checked', true);
    $('#modal_new_event #add_event_start_time,#modal_new_event #add_event_end_time').val('').attr('disabled', true);
    $('#modal_new_event #add_event_start_date').val(moment(date).format("YYYY-MM-DD"));
    $('#modal_new_event #add_event_end_date').val(moment(date).format("YYYY-MM-DD"));
  },
  viewRender: function(view) {
    var calendarDate = $("#calendar").fullCalendar('getDate');
    var calendarMonth = calendarDate.month();
    $('#calendar .fc-toolbar').attr('data-calendar-month', calendarMonth);
    $('.block-header-calendar > h2 > span').html(view.title);
  },
  eventClick: function(event, element) {
    $('.edit_event_id').val(event.id);
    $('.edit_event_title').val(event.title);
    $('#modal_edit_event #event_start_date').val(moment(event.start).format("YYYY-MM-DD"));
    $('#modal_edit_event #event_end_date').val(moment(event.end).format("YYYY-MM-DD"));
    $('#modal_edit_event #event_start_time').val(moment(event.start).format("HH:mm a"));
    $('#modal_edit_event #event_end_time').val(moment(event.end).format("HH:mm a"));
    $('#modal_edit_event .edit_event_description').val(event.description);
    $('#modal_edit_event input[value=' + event.className + ']').prop('checked', true);
    $('#modal_edit_event').modal('show');
    if (event.allDay === true) {
      $('#toggle-allDay').prop('checked', true);
      $('#modal_edit_event #event_start_time,#modal_edit_event #event_end_time').val('').attr('disabled', true);
    } else {
      $('#toggle-allDay').prop('checked', false);
      $('#modal_edit_event #event_start_time,#modal_edit_event #event_end_time').attr('disabled', false);
    }
  }
});
//Add new Event
$(document).on('click', '#btn_add_event', function() {
  var addEventTitle = $('#new_event_title').val(),
  addEventStartDate = $('#add_event_start_date').val(),
  addEventStartTime = $('#add_event_start_time').val(),
  addEventEndDate = $('#add_event_end_date').val(),
  addEventEndTime = $('#add_event_end_time').val();
  var eventStart = moment(addEventStartDate).add(addEventStartTime).toISOString();
  var eventEnd = moment(addEventEndDate).add(addEventEndTime).toISOString();
  var GenRandom = {
    Stored: [],
    Job: function() {
      var newId = Date.now().toString().substr(6);
      if (!this.Check(newId)) {
        this.Stored.push(newId);
        return newId;
      }
      return this.Job();
    },
    Check: function(id) {
      for (var i = 0; i < this.Stored.length; i++) {
        if (this.Stored[i] == id) return true;
      }
      return false;
    }
  };
  if (addEventTitle != '') {
    $('#calendar').fullCalendar('renderEvent', {
      id: GenRandom.Job(),
      title: addEventTitle,
      start: eventStart,
      end: eventEnd,
      allDay: true,
      className: $('.event-tag input:checked').val(),
      description: ''
    }, true);
    $('.form-event')[0].reset()
    $('#modal_new_event').modal('hide');
    $('#new_event_title').closest('.form-group').removeClass('has-error');
  } else {
    $('#new_event_title').closest('.form-group').addClass('has-error');
    $('#new_event_title').focus();
  }
});
//Update/Delete an Event
$('body').on('click', '[data-calendar]', function() {
  var calendarAction = $(this).data('calendar'),
  currentId = $('.edit_event_id').val(),
  currentTitle = $('.edit_event_title').val(),
  currentDesc = $('.edit_event_description').val(),
  currentClass = $('.event-tag-edit input:checked').val(),
  currentEvent = $('#calendar').fullCalendar('clientEvents', currentId);
  //Update
  if (calendarAction === 'update') {
    if (currentTitle != '') {
      currentEvent[0].title = currentTitle;
      currentEvent[0].description = currentDesc;
      currentEvent[0].className = currentClass;
      $('#calendar').fullCalendar('updateEvent', currentEvent[0]);
      $('#modal_edit_event').modal('hide');
    } else {
      $('.edit_event_title').closest('.form-group').addClass('has-error');
      $('.edit_event_title').focus();
    }
  }
  //Delete
  if (calendarAction === 'delete') {
    $('#modal_edit_event').modal('hide');
    setTimeout(function() {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function() {
        target.fullCalendar('removeEvents', currentId);
        swal(
          'Deleted!',
          'Your event has been removed.',
          'success'
        );
      })
    }, 250);
  }
});
$('[data-trigger="popover-guests"]').popover({
  trigger: 'manual',
  html: true,
  title: function() {
    return $('#popover-guests').find('.head').html();
  },
  content: function() {
    return $('#popover-guests').find('.content').html();
  },
  container: 'body',
  placement: 'right'
}).on('click',function(e) {
  e.stopPropagation();
  $(this).popover('show');
  $('#popover-guests').parents('.popover').addClass('guest_popover_open');
});
$('body').on('click', function(event) {
  if($('#popover-guests').length && $('.popover:visible').length){
    $('.popover').hide();
  }
});
$('.fc-today-button').addClass('btn btn-white-text btn-flat').html('<i class="zmdi zmdi-calendar-alt"></i><span>Today</span>');
$('.fc-prev-button,.fc-next-button').addClass('btn btn-white-text btn-flat btn-fab btn-fab-sm');
$('.fc-month-button').addClass('btn btn-white-text btn-flat').html('<i class="zmdi zmdi-view-comfy"></i><span>Month</span>');
$('.fc-agendaWeek-button').addClass('btn btn-white-text btn-flat').html('<i class="zmdi zmdi-view-week"></i><span>Week</span>');
$('.fc-agendaDay-button').addClass('btn btn-white-text btn-flat').html('<i class="zmdi zmdi-view-day"></i><span>Day</span>');
}
const updateInputCal = () => {
  var startDate,
  endDate,
  updateStartDate = function() {
    startPicker.setStartRange(startDate);
    endPicker.setStartRange(startDate);
    endPicker.setMinDate(startDate);
  },
  updateEndDate = function() {
    startPicker.setEndRange(endDate);
    endPicker.setEndRange(endDate);
  },
  startPicker = new Pikaday({
    field: document.getElementById('event_start_date'),
    minDate: new Date(),
    maxDate: new Date(2020, 12, 31),
    onSelect: function() {
      startDate = this.getDate();
      updateStartDate();
    }
  }),
  endPicker = new Pikaday({
    field: document.getElementById('event_end_date'),
    minDate: new Date(),
    maxDate: new Date(2020, 12, 31),
    onSelect: function() {
      endDate = this.getDate();
      updateEndDate();
    }
  }),
  _startDate = startPicker.getDate(),
  _endDate = endPicker.getDate();
  if (_startDate) {
    startDate = _startDate;
    updateStartDate();
  }
  if (_endDate) {
    endDate = _endDate;
    updateEndDate();
  }
  $('#event_start_time').timepicker({
    'scrollDefault': 'now'
  });
  $('#event_end_time').timepicker({
    'minTime': '2:00pm',
    'maxTime': '11:30pm',
    'showDuration': true
  });
  $('input#toggle-allDay:checkbox').on('change',function() {
    if ($(this).is(":checked")) {
      $('#event_start_time,#event_end_time').val('').attr('disabled', true);
    } else {
      $('#event_start_time,#event_end_time').attr('disabled', false);
    }
  });
}
const addInputCal = () => {
  var startDate,
  endDate,
  updateStartDate = function() {
    startPicker.setStartRange(startDate);
    endPicker.setStartRange(startDate);
    endPicker.setMinDate(startDate);
  },
  updateEndDate = function() {
    startPicker.setEndRange(endDate);
    endPicker.setEndRange(endDate);
  },
  startPicker = new Pikaday({
    field: document.getElementById('add_event_start_date'),
    minDate: new Date(),
    maxDate: new Date(2020, 12, 31),
    onSelect: function() {
      startDate = this.getDate();
      updateStartDate();
    }
  }),
  endPicker = new Pikaday({
    field: document.getElementById('add_event_end_date'),
    minDate: new Date(),
    maxDate: new Date(2020, 12, 31),
    onSelect: function() {
      endDate = this.getDate();
      updateEndDate();
    }
  }),
  _startDate = startPicker.getDate(),
  _endDate = endPicker.getDate();
  if (_startDate) {
    startDate = _startDate;
    updateStartDate();
  }
  if (_endDate) {
    endDate = _endDate;
    updateEndDate();
  }
  $('#add_event_start_time').timepicker({
    'scrollDefault': 'now'
  });
  $('#add_event_end_time').timepicker({
    'minTime': '2:00pm',
    'maxTime': '11:30pm',
    'showDuration': true
  });
  $('input#allDay:checkbox').on('change',function() {
    if ($(this).is(":checked")) {
      $('#add_event_start_time,#add_event_end_time').val('').attr('disabled', true);
    } else {
      $('#add_event_start_time,#add_event_end_time').attr('disabled', false);
    }
  });
}
const filterCalMembers = () =>{
  $('#modal_edit_event').on('show.bs.modal', function(e) {
    $('.popover').on('show.bs.popover', function () {
      let filterCalMembersInput = $('#modal_edit_event #filter_cal_input'),
      filterCalMembersList = $('#modal_edit_event .filter_cal_list li');
      filterList(filterCalMembersInput,filterCalMembersList);
    });
  });
}
export {
  cal,
  updateInputCal,
  addInputCal,
  filterCalMembers
}
