/*
*
* MaterialLab
* Author: http://authenticgoods.co
*
*/
//import the JavaScript modules to run
import {toggleState, toggleExpand} from './modules/appState';
import {toggleDrawer} from './modules/drawers';
import {fabMenu, toggleCard, toggleSearch} from './modules/animations';
import {navBarSearch} from './modules/search';
import {
  cardRefresh,
  cardCollapse,
  cardOffCanvas,
  cardStacks,
  cardTask,
  cardToggleHighlighter,
  cardSearch,
  cardReveal
} from './modules/cards';
import {
  dashboardWebStats,
  sparklineDashboard,
  chartistBarsDashboard,
  chartistLineDashboard,
  chartistBiPolarChartDashboard,
  chartistPathAnimationDashboard,
  drawSparkline,
	dashboardC3Donut
} from './modules/dashboardCharts';
import {
  c3_areaChart,
  c3_combination,
  c3_zoom,
  c3_stacked_bars_chart,
  c3_gauges,
  c3_pie,
  c3_donut,
  c3_areaSpline,
  c3_scatter
} from './modules/chartsC3Demos';
import {
  chartjs_lineChart,
  chartjs_barChart,
  chartjs_radarChart,
  chartjs_polarChart,
  chartjs_pieChart,
  chartjs_doughnutChart
} from './modules/chartsChartjs';
import {
  chartist_simplePie,
  chartist_pieCustomLabels,
  chartist_animatingDonut,
  chartist_biPolarBar,
  chartist_peakCircles,
  chartist_stackedBar,
  chartist_horizontalBar,
  chartist_lineChart,
  chartist_holesInData,
  chartist_filledHolesInData,
  chartist_onlyWholeNumbers,
  chartist_lineScatter,
  chartist_lineChartWithArea,
  chartist_biPolar
} from './modules/chartsChartistDemos';
import {morrisjs_demo} from './modules/chartsMorrisjs';
import {initSubMenu, closeOpenState, switchMenuState,openProfileMenu,openProfile,openThemeSettingPanel} from './modules/sidebars';
import {dismissListItem} from './modules/listItems';
import {initPhotoSwipeFromDOM} from './modules/photoSwipe';
import {mailList, mailCompose, mailSelected} from './modules/mail';
import {chips, initChips} from './modules/chips';
import {simpleStepper} from './modules/stepper';
import {expansionPanel} from './modules/panelExpand';
import {loginV3,registerForm} from './modules/auth';
import {cal, updateInputCal, addInputCal, filterCalMembers} from './modules/cal';
import {sweetAlerts, alertifyjs} from './modules/alerts';
import {
  allNotes,
  notesAdd,
  noteSelected,
  noteImgUpload,
  noteAddList,
  updateNote
} from './modules/notes';
import {
  scrollBar,
  selectDropdowns,
  materialAvatar,
  initTooltips,
  initPopovers,
  countTo,
  otherScrollbarOptions,
  initSliders,
  materialDatePicker,
  pikaday,
  triggerFormValidation,
  masonryInit,
  keepDropdownOpen,
  slickCarousel,
  videoPlayer,
  initToolbarjs
} from './modules/initPlugins';
import {currentDateTimeSidebar, nextThreeDays, todaysDate, timlineInput} from './modules/dateTime';
import {fullscreenTransition} from './modules/transitions';
import {matchElementHeight} from './modules/matchElementHeight';
import {iconModal, css3AnimationDemos, cardCarousel,cardDemoMorrisChart,loadThemes,swapLayoutMode} from './modules/demo';
import {autocompleteBasic, autocompleteClear, countryAutocomplete} from './modules/autocomplete';
import {mwDataTables, checkAll, deleteItem, pagination} from './modules/dataTables';
import {wizardDemo} from './modules/wizard';
import {loadGmaps} from './modules/gmap';
import {sidebarChatCompose} from './modules/sidebarChat';
import {contactSetup,contactEditUser,contactNewUser,contactSelected} from './modules/contacts';
import {
  loadTaskId,
  getTaskCardInfo,
  addNewTask,
  addNewTaskList,
  deleteTask,
  editTask,
  filterTaskMembers,
  dragDropTask
} from './modules/task';
//App View Modules
import {
  salesStats,
  conversionStats,
  todaysSales,
  newUsers,
  triggerSummerNoteEcom,
  triggerDropzoneEcom,
  addProductTags,
  editProductImg,
  orderTable,
  customerTable
} from './modules/ecom';
import{
	chatContactList
} from './modules/chat'
var MaterialLab = window.MaterialLab || (window.MaterialLab = {});
MaterialLab.dashboardWebStats = dashboardWebStats;
(function(window) {
  if (window.Package) {
    Materialize = {};
  } else {
    window.Materialize = {};
  }
})(window);
// Unique ID
Materialize.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
})();
$(function() {
  $.material.init();
  selectDropdowns();
  scrollBar();
  keepDropdownOpen();
  slickCarousel();
  videoPlayer();
  initToolbarjs();
  materialAvatar();
  initSubMenu();
  toggleState();
  toggleExpand();
  navBarSearch();
  cardRefresh();
  cardToggleHighlighter();
  switchMenuState();
  openProfileMenu();
	openProfile();
  openThemeSettingPanel();
  dashboardWebStats();
	dashboardC3Donut();
  chartistPathAnimationDashboard();
  chartistBarsDashboard();
  chartistLineDashboard();
  chartistBiPolarChartDashboard();
  mwDataTables();
  cardStacks();
  cardOffCanvas();
  toggleDrawer();
  sparklineDashboard();
  currentDateTimeSidebar();
  todaysDate();
  timlineInput();
  nextThreeDays();
  cardCollapse();
  closeOpenState();
  initTooltips();
  initPopovers();
  countTo();
  otherScrollbarOptions();
  fullscreenTransition();
  css3AnimationDemos();
  iconModal();
  loginV3();
  registerForm();
  sweetAlerts();
  alertifyjs();
  cardSearch();
  expansionPanel();
  simpleStepper();
  chips();
  sidebarChatCompose();
  initChips();
  dismissListItem();
  initSliders();
  cardReveal();
  cardTask();
  materialDatePicker();
  pikaday();
  countryAutocomplete();
  autocompleteBasic();
  autocompleteClear();
  triggerFormValidation();
  wizardDemo();
  fabMenu();
  masonryInit();
  toggleCard();
  toggleSearch();
  initPhotoSwipeFromDOM();
  cardCarousel();
  cardDemoMorrisChart();
  loadThemes();
  swapLayoutMode();
  //Chart C3 Demos
  c3_pie();
  c3_donut();
  c3_gauges();
  c3_areaChart();
  c3_combination();
  c3_zoom();
  c3_stacked_bars_chart();
  c3_areaSpline();
  c3_scatter();
  //Chart chartist demos,
  chartist_simplePie();
  chartist_pieCustomLabels();
  chartist_animatingDonut();
  chartist_biPolarBar();
  chartist_peakCircles();
  chartist_stackedBar();
  chartist_horizontalBar();
  chartist_lineChart();
  chartist_holesInData();
  chartist_filledHolesInData();
  chartist_onlyWholeNumbers();
  chartist_lineScatter();
  chartist_lineChartWithArea();
  chartist_biPolar();
  //Chart.js
  chartjs_lineChart();
  chartjs_barChart();
  chartjs_radarChart();
  chartjs_polarChart();
  chartjs_pieChart();
  chartjs_doughnutChart();
  //Morris.js Charts
  morrisjs_demo();
  //app views
	chatContactList();
  checkAll();
  deleteItem();
  pagination();
  triggerSummerNoteEcom();
  triggerDropzoneEcom();
  addProductTags();
  editProductImg();
  orderTable();
  customerTable();
  allNotes();
  notesAdd();
  noteSelected();
  noteImgUpload();
  noteAddList();
  updateNote();
  mailList();
  mailCompose();
  mailSelected();
  loadTaskId();
  getTaskCardInfo();
  addNewTask();
  addNewTaskList();
  deleteTask();
  editTask();
  filterTaskMembers();
  dragDropTask();
	contactSetup();
	contactEditUser();
	contactNewUser();
	contactSelected();
	cal();
	updateInputCal();
	addInputCal();
	filterCalMembers();
  //Pages
  loadGmaps();
if (Modernizr.mq("screen and (min-width:768px)")) {
  matchElementHeight('.match-height .card');
 }
});
window.onload = function() {
  salesStats();
  conversionStats();
  todaysSales();
  newUsers();
}
$(document).on('resize', function() {
  _.debounce(switchMenuState, 300, false)();
  _.debounce(drawSparkline, 300, false)();
});
