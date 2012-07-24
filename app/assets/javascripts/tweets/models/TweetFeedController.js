TweetFeedController = (function() {
	function TweetFeedController(params) {
		this.view = params.view;
		this.toggle_btn = this.view.find('.toggle_btn');
		this.delete_btn = this.view.find('.delete_btn');
		this.curated = this.view.data('curated');
		this.controller_url = this.view.data('href');
	}

	TweetFeedController.prototype = {
		init: function() {
			this.toggle_btn.click(_.bind(function(e) {
				e.preventDefault();
				this.ajax_call();
			},this));

			this.delete_btn.click(_.bind(function(e) {
				e.preventDefault();
				this.delete_ajax_call();
			},this));
		},
		ajax_call: function() {
			$.ajax({
		        type: 'GET',
		        url: this.controller_url + '/edit.json',
		        data: 'curated=' + this.curated,
		        success: _.bind(this.response, this)
		    });
		},
		response: function(data) {
			
			this.curated = data.curated;
			
			if(this.curated == true) {
				this.view.addClass('curated')
			} else {
				this.view.removeClass('curated')
			}
			this.view.find('.status').html(this.curated.toString());

		},
		delete_ajax_call: function() {
			$.ajax({
		        type: "DELETE",
        		url: this.controller_url + '.json',
        		success: _.bind(this.delete_response, this) 
		    });
		},

		delete_response: function(data) {
			this.view.remove();

		}
	}

	return TweetFeedController;
})();