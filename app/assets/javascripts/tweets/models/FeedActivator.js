FeedActivator = (function() {
	function FeedActivator(params) {
		this.view = $('table.tweets');
		this.tweets = [];
	}

	FeedActivator.prototype = {
		init: function() {
			this.view.find('tr.tweet').each(_.bind(function(idx, elem) {
				var tweet_feed_controller;
				tweet_feed_controller = new TweetFeedController({view: $(elem) });
				tweet_feed_controller.init();
				this.tweets.push(tweet_feed_controller);
			}, this));

			console.log(this.tweets.length);
		}
	}

	return FeedActivator;
})();