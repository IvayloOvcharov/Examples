$(window).on('load', function() {
	$('.navigation a').on('click', function(event) {
		event.preventDefault();

		var address = $(this).attr('href');

		$('.' + address).show().siblings().hide();
	});
});
