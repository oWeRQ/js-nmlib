;(function(factory){
	if (typeof define === 'function' && define.amd)
		define(['jquery', 'jquery.plugin'], factory);
	else
		factory(jQuery, jQuery.plugin);
})(function($, $plugin){

	return $plugin('pluginTemplate', {
		defaults: {

		},

		init: function(){

		}
	});

});