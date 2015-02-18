/**
 * Simple Modal & Custom Overlay
 */
(function($, $modalWindow){
	$('#example1-modal').modalWindow({
		overlay: {
			initStyles: {
				opacity: 0,
				background: 'gray'
			},
			showAnimate: {
				opacity: .75
			},
			showDuration: 1000
		}
	});
	$('#show-example1-modal').click(function(e){
		e.preventDefault();
		$('#example1-modal').modalWindow('open');
	});
})(jQuery, jQuery.modalWindow);

/**
 * Lazy Init
 */
(function($){
	$('.show-example2-modal').click(function(e){
		e.preventDefault();

		var modal = $(this.hash);

		(function($modalWindow){
			modal.modalWindow('open');
		})(jQuery.modalWindow);
	});
})(jQuery);

/**
 * Html Content
 */
(function($, $modalWindow){
	var modalWindow = $modalWindow();

	$('.show-example3-modal').click(function(e){
		e.preventDefault();
		modalWindow.content.html($(this).data('content'));
		modalWindow.open();
	});
})(jQuery, jQuery.modalWindow);

/**
 * Lightbox
 */
(function($, $lightbox){
	$('#example4-list a').lightbox();

	console.log('test equal object: ', $('#example4-list a:eq(0)').data('lightbox') === $('#example4-list a:eq(1)').data('lightbox'));

	console.log('test instanceof lightbox: ', $('#example4-list a:eq(0)').data('lightbox') instanceof $lightbox);
})(jQuery, jQuery.lightbox);

/**
 * Lightbox Customize
 */
(function($, $lightbox){
	var linkOpenLast = $('#example5-link'),
		links = $('#example5-list a'),
		thumbs = links.find('img'),
		activeThumb;

	var lightbox = $.lightbox({
		onOpen: function(){
			linkOpenLast.hide();
		},
		onClose: function(){
			activeThumb.css({
				outline: ''
			});
			linkOpenLast.show();
		},
		onChange: function(){
			activeThumb = thumbs.eq(this.idx).css({
				outline: '3px solid #3875d7',
			});
			thumbs.not(activeThumb).css({
				outline: ''
			});
		}
	}, links);

	linkOpenLast.click(function(e){
		e.preventDefault();
		lightbox.modalWindow.open();
	});
})(jQuery, jQuery.lightbox);

/**
 * Children Dialogs
 */
(function($, $modalWindow){
	var loginModal = $modalWindow({}, '#example6-login');
	var signupModal = $modalWindow({}, '#example6-signup');

	$('#example6-login-link').click(function(e){
		e.preventDefault();

		loginModal.open();
	});

	$('#example6-signup-link').click(function(e){
		e.preventDefault();

		signupModal.open();
	});

	loginModal.$el.find('.signup').click(function(e){
		e.preventDefault();

		loginModal.close();
		
		signupModal.options.onClose = function(){
			loginModal.open();
			signupModal.options.onClose = $.noop;
		};
		signupModal.open();
	});
})(jQuery, jQuery.modalWindow);

/**
 * Plugin Example
 */
(function($, $example){
	$('#example7').example({
		visible: false
	});
})(jQuery, jQuery.example);

/**
 * Plugin Example Alt
 */
(function($, $example){
	$example({
		template: '<a href="#">Toggle Cat</a> <p>Hello Cat!</p>'
	}, '#example8');
})(jQuery, jQuery.example);