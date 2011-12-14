$(document).ready(function() {
  /* Use this js doc for all application specific JS */
  $(window).resize(function() {
    categories.resize();
  });
	
  /* PLACEHOLDER FOR FORMS ------------- */
  /* Remove this and jquery.placeholder.min.js if you don't need :) */
  $('input, textarea').placeholder();

  /* Adapt each category to screen */
  var categories = function(){
    var resize = function(){
      var ratio     = $(window).width()/$(window).height();
      var minHeight = (ratio > 1) ? $(window).height() : $(window).height()/2 ;
      $(".category").css('min-height', minHeight);
    }
    return {
      resize: resize
    }
  }();

  /* Menu */
  var menu = function(){
    var reset = function(){
      $("#productions_content").css({'top': '-2em'});
      $('#basemenu a').removeClass("unselected");
    }
    var submenu = function(){
      $("#productions_menu").click(function(e) {
        e.preventDefault();
        $('#basemenu a').toggleClass("unselected");
        $(this).toggleClass("unselected");
        if($("#productions_content").css('top')=='0px') {
          $("#productions_content").animate({'top': '-2em'}, 200);
        } else {
          $("#productions_content").animate({'top': '0px'}, 200);
        }
      });
    }
    return {
      reset:   reset,
      submenu: submenu
    }
  }();

  /* Smooth vertical scrolling */
  var smoothlyScrolling = function(){
    var init = function(){
      $(".scroll").click(function(e){
        menu.reset();
        e.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top-$('#menu').height()}, 500);
      });
    }
    return {
      init: init
    }
  }();

  
  /* Run */
  menu.submenu();
  smoothlyScrolling.init();
  categories.resize();

  /* Lightbox */
  $(".gallery a").fancybox({
    titlePosition: 'over'
  });

  /* Slideshow */
  $('#slideshow').orbit({
    animation: 'fade'
  });
});

$(window).load(function(){
    /* Slideshow image loader */
  $.imageLoader({
    mark:   '.slideshow-loading',
    fadeIn: 200
  });


  /* Images Loader */
  $.imageLoader({
    fadeIn: 600
  });

  /* Build at_work wall */
  $('#at_work_gallery').masonry({
    itemSelector : '.wall',
    columnWidth : 245
  });

  /* Semin-fixed menu */
  var fixedMenu = function(){
    var fixed = function(){
      $('#menu').css({
        'position':      'fixed',
        'top':           '0',
        'margin-top':    '0'
      });
      $('#productions_content').css('border-bottom', '1px solid white');
      $('#basemenu').css('padding-top', '1em');
    }

    var free = function(){
      $('#menu').css({
        'position':      '',
        'top':           '',
        'margin-top':    ''
       });
      $('#productions_content').css('border-bottom', '');
      $('#basemenu').css('padding-top', '');
    }

    var init = function(){
      var limit = $('#slideshow_area').height()+$('#slideshow_area').offset().top
      var page = ($.browser.safari) ? $("body") : $("html,body") ; // fix a webkit bug with scrollTop()
      $(document).scroll(function(){
        if (page.scrollTop() > limit)  {
          fixed();
        } else {
          free();
        };
      });
    }

    return {
      init: init
    }
  }();

  /* Run */
  fixedMenu.init();

});
