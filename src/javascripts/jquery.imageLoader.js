(function( $ ){

  $.imageLoader = function( options ) { 

    // Settings
    var settings = $.extend({
      'mark'     : '.loading',
      'enabled'  : true,
      'fadeIn'   : 100,
      'callback' : function(){}
    }, options);

    if (settings.enabled) {
      var images = $(settings.mark);
      images.each(function(index){
        var image = $(this)
        var src = image.attr('data-src');
        $('<img>').attr('src', src).load(function(){
          image.hide().attr('src', src).fadeIn(settings.fadeIn);
        });
        if (images.length-index == 1) settings.callback();
      });
    }
  }
})( jQuery );
