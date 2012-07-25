showcases_view = (function() {

	var showcases_controller;
	function showcases_view() {
		showcases_controller = new ShowcasesController({view: $('div.tweet')});
		showcases_controller.init();
	}
	return showcases_view;
})();