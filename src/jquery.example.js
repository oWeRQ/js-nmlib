;(function(factory){
	if (typeof define === 'function' && define.amd)
		define(['jquery', 'jquery.plugin'], factory);
	else
		factory(jQuery, jQuery.plugin);
})(function($, $plugin){

	return $plugin('example', {
		defaults: {
			template: '<a href="#">Toggle</a> <p>Hello World!</p>',
			elements: {
				anchors: 'a',
				paragraphs: 'p'
			},
			visible: true
		},

		isVisible: true,

		init: function(){
			this.$el.append(this.options.template);

			this.findAll(this.options.elements);

			this.bindAll('anchorsClick', 'paragraphsClick');

			this.anchors.click(this.anchorsClick);
			this.paragraphs.click(this.paragraphsClick);

			this.toggle(this.options.visible);
		},

		anchorsClick: function(e){
			e.preventDefault();
			this.toggle();
		},

		paragraphsClick: function(e){
			// this instance of Plugin
			alert(e.target.innerHTML);
		},

		toggle: function(visible){
			if (visible === undefined)
				this[!this.isVisible ? 'show' : 'hide']();
			else
				this[visible ? 'show' : 'hide']();
		},

		show: function(){
			this.paragraphs.show();
			this.isVisible = true;
		},

		hide: function(){
			this.paragraphs.hide();
			this.isVisible = false;
		}
	});

});