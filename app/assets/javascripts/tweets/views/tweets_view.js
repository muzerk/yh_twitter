tweets_view = (function() {

	var feed_activator;

	function tweets_view() {
		feed_activator = new FeedActivator();
		feed_activator.init();
	}

	return tweets_view;
})();