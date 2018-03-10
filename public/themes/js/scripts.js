// Wow initial
(function () {
  new WOW().init();
})();

// Enable bootstrap tooltips
(function () {
  $('[data-toggle="tooltip"]').tooltip();
})();
/**
 * Init parallax plugin
 */
(function () {
    $('.pc-banner').parallax();
})();

/**
 * Scrolled naviagation effects
 */
(function () {
  const $banner = $('.pc-banner');
  const $navigation = $('.pc-navigation');
  let bannerHeight = $banner.height();

  onSWindowScroll();

  $(window).on('scroll', onSWindowScroll);

  $(window).on('resize', function (e) {
    bannerHeight = $banner.height();
  });

  function onSWindowScroll(e) {
    let currentScrollPosition = window.scrollY;
    if (currentScrollPosition >= bannerHeight) {
      $navigation.addClass('pc-navigation-scrolled');
    } else {
      $navigation.removeClass('pc-navigation-scrolled');
    }
  }
})();

/**
 * Scrolled to first section
 */
 (function () {
   const $pcArrowDown = $('.pc-arrow-down');
   const $scrollToElem = $('.pc-welcome-front-page');

   $pcArrowDown.on('click', function () {
     $('html, body').animate({
       'scrollTop': $scrollToElem.offset().top
     }, 400);
   });

 })();

 /**
  * Mega menu
  */
  (function () {

    const $hamburgerBtn = $('.pc-hamburger-btn');
    const $megaMenu = $('.pc-megaMenu');
    const $closeMegaMenuBtn = $('.pc-close-megaMenu-btn');
    const $pcMegaMenuRightItemLinks = $('.pc-megaMenu-menu-item-link');
    const $pcMegaMenuLeftItems = $('.pc-megaMenu-left-inner-item');

    $megaMenu.css({
      display: 'none'
    });

    $hamburgerBtn.on('click', openMegaMenu);

    $closeMegaMenuBtn.on('click', function (e) {
      e.preventDefault();
      closeMegaMenu();
    });

    $pcMegaMenuRightItemLinks.hover(pcMegaMenuLeftItem);

    function preloadMegaMenuLeftItems(items) {
      const length = items.length;
      let counter = 0;
      return new Promise(function(resolve, reject) {
        items.each(function(index, elem) {

          let $elem = $(elem);
          $img = $('<img class="pc-tmp-img">');
          let $elemBgUrl = $elem.data('bg');

          $img.on('load', function() {
            counter++;
            if (counter === length - 1) {
              resolve();
            }
          });
          if ($elemBgUrl && $elemBgUrl.length) {
            $elem.css('background-image', 'url("' + $elemBgUrl + '")');
            $img.attr('src', $elemBgUrl);
          }
        });
      });
    }

    function openMegaMenu(e) {
      e.preventDefault();
      $megaMenu.css('display', 'block');
      // Preload images at left column in megaMenu - don't call this function when window width is less than 990px;
      if ($(window).innerWidth() > 990) {
        preloadMegaMenuLeftItems($pcMegaMenuLeftItems).then(function() {
          $pcMegaMenuLeftItems.filter('.active').css({zIndex: 99}).transition({opacity: 1});
        });
      } else {
        $pcMegaMenuLeftItems.filter('.active').css({zIndex: 99}).transition({opacity: 1});
      }
      if (!$megaMenu.hasClass('open')) {
        $megaMenu.addClass('open');
        $('body').css({
          overflow: 'hidden'
        });
      } else {
        closeMegaMenu();
      }
    }

    function closeMegaMenu() {
      if ($megaMenu.hasClass('open')) {
        $megaMenu.removeClass('open');
        $('body').css({
          overflow: 'auto'
        });
        $megaMenu.on('transitionend', function() {
          $megaMenu.css('display', 'none');
          $(this).off('transitionend');
        });
      }
    }

    function pcMegaMenuLeftItem(e) {
      const target = $(e.target).data('target');
      const $targetElem = $(target);
      const $targetElemBgUrl = $targetElem.data('bg');
      const $targetWithActiveClass = $pcMegaMenuLeftItems.filter('.active');
      const $targetWithActiveClassId = '#' + $targetWithActiveClass.attr('id');

      if ($targetWithActiveClassId !== target) {
        $pcMegaMenuLeftItems.removeClass('active');
        $targetWithActiveClass.css({zIndex: 0});
        $targetElem.addClass('active').css({zIndex: 99}).stop().transition({opacity: 1}, 300, function () {
          $targetWithActiveClass.css({opacity: 0});
        });
      }
    }
  })();

  /**
   * Scroll up plugin
   */
   (function() {
     const $pcArrowUpBtn = $('.pc-arrow-up-btn');
     $pcArrowUpBtn.on('click', scrollToUp);

     function scrollToUp(e) {
       e.preventDefault();
       $('html, body').animate({
         'scrollTop': 0
       }, 400);
     }
   })();
