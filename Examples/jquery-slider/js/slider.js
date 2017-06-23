$.fn.slider = function( options ) {

  this.each(function() {

    // Slider options
    var settings = $.extend({
        arrows    : false,
        dots      : true,
        animation : 500,
        transition: 500
    }, options );

    // Use only current element's elements ...
    var $slider = $(this);

    if ( settings.arrows ) {
      var $arrow = $('<div class="arrow"></div>');
      var $arrowRight = $arrow.clone();

      $arrowRight.addClass('arrow-right');

      $slider.append( $arrow );
      $slider.append( $arrowRight );
    }

    if ( settings.dots ) {
      $slider.append( '<div class="navigation"></div>' );
    }

    var $slides     = $slider.find('.slides');
    var $navigation = $slider.find('.navigation');
    var $arrow      = $slider.find('.arrow');
    var animation   = false;

    animateSlider();

    // Current slides
    var slide = 0;

    // Get image count
    var sliderCount = $slider.find('img').length;

    // Get image width
    var imageWidth = $slider.find('img:first').width();

    // Set slider width
    var sliderWidth = sliderCount * imageWidth;

    $slides.css('width', sliderWidth );

    // Loop through slides and append dots
    for ( var i = 0; i < sliderCount; i++ ) {
      var $dot = $('<a href="#"></a>');

      // Add active class on first dot
         if ( i === 0 ) {
        $dot.addClass('active');
      }

      // Append dot to navigation
      $navigation.append( $dot );
    }

    $navigation.on('click', 'a', function(event) {
      // Prevents Default link behavior
      event.preventDefault();
      console.log($(this).index());
      goToSlide( $(this).index() );
    });

    $arrow.on('click', function() {
       var slideModifier = $(this).hasClass('arrow-right') ? 1 : -1;

       goToSlide( slide + slideModifier );
     });

    function goToSlide(index) {
      if ( $slides.is(':animated') ) {
        return;
      }

      // reset the timeout progress
      clearTimeout( animation );

      if ( index === sliderCount ) {
        index = 0;
      }

      if ( index < 0 ) {
        index = sliderCount - 1;
      }

      slide = index;

      $slides.animate({
        left: index * imageWidth * (-1)
      }, settings.transition );

      $navigation
        .find('a')
        .removeClass('active')
        .eq(slide)
        .addClass('active');

      animateSlider();
    }

    function animateSlider() {
      if ( settings.animation ) {
        if ( settings.animation < settings.transition ) {
          settings.animation = settings.transition + 100;
        }

        // variable value becomes the timeout
        animation = setTimeout( function() {
          goToSlide( slide + 1 );
        }, settings.animation );
      }
    }
  });
}
