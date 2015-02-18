;(function(factory){
	if (typeof define === 'function' && define.amd)
		define(['jquery', 'jquery.plugin', 'jquery.modalWindow'], factory);
	else
		factory(jQuery, jQuery.plugin, jQuery.modalWindow);
})(function($, $plugin, $modalWindow){

	var related = {};

	return $plugin('lightbox', {
		defaults: {
			template: '<div class="modal-lightbox"><div class="model-desc"></div><div class="modal-prev"></div><div class="modal-next"></div><img class="modal-image"></div>',
			elements: {
				image: '.modal-image',
				prev: '.modal-prev',
				next: '.modal-next',
				desc: '.model-desc'
			},
			onOpen: $.noop,
			onClose: $.noop,
			onChange: $.noop
		},

		init: function(){
			if (related[this.el.rel])
				return related[this.el.rel].add(this.el);

			related[this.el.rel] = this;

			this.bindAll();
			
			this.idx = 0;

			this.content = $(this.options.template);
			this.findAll(this.options.elements, this.content);

			this.$el.click(this.linkClick);
			this.image.load(this.imageLoad);
			this.prev.click(this.gotoPrev);
			this.next.click(this.gotoNext);

			this.modalWindow = $modalWindow({
				onOpen: this.onOpen,
				onClose: this.onClose
			}, this.content);

			this.modalWindow.window.addClass('modal-window-lightbox');
		},

		add: function(el){
			this.$el.push(el);
			$(el).on('click.'+this.pluginName, this.linkClick);
			return this;
		},

		keypress: function(e){
			if (e.which === 27) { // esc
				this.modalWindow.close();
			} else if (e.which === 37) { // prev
				this.gotoPrev();
			} else if (e.which === 39) { // next
				this.gotoNext();
			}
		},

		onOpen: function(){
			$(window).on('keyup', this.keypress);

			this.options.onOpen.call(this);
		},

		onClose: function(){
			$(window).off('keyup', this.keypress);

			this.options.onClose.call(this);
		},

		imageLoad: function(){
			var speed = 500;

			var contentSize = {
				width: this.image.width(),
				height: this.image.height()
			};

			this.modalWindow.windowCenter.updatePosition({
				width: contentSize.width+60,
				height: contentSize.height+60
			}, speed);

			this.content.stop().animate(contentSize, speed, this.onImageAnimateComplete);
		},

		onImageAnimateComplete: function(){
			var speed = 1000;

			this.desc.stop().css({
				bottom: -this.desc.outerHeight()
			}).show().animate({
				bottom: 0
			}, speed);
		},

		gotoIdx: function(idx){
			this.idx = idx;

			if (this.idx < 0)
				this.idx = this.$el.length-1;

			if (this.idx >= this.$el.length)
				this.idx = 0;

			var link = this.$el.eq(this.idx);

			this.image.prop('src', '');
			this.image.prop('src', link.prop('href'));
			this.desc.hide().html(link.prop('title'));

			this.modalWindow.open();

			this.options.onChange.call(this);
		},

		linkClick: function(e){
			e.preventDefault();

			this.content.css({
				width: 75,
				height: 75
			});

			this.gotoIdx(this.$el.index(e.currentTarget));
		},

		gotoPrev: function(){
			this.gotoIdx(this.idx-1);
		},

		gotoNext: function(){
			this.gotoIdx(this.idx+1);
		}
	});

});