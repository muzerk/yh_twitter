ShowcasesController = (function() {
	function ShowcasesController(params) {
		this.view = params.view;
		this.img = this.view.find('img.profile_img');
		this.user = this.view.find('p.from_user');
		this.texts = this.view.find('p.text');
		this.showTime = 9000;
		this.fadeTime = 2000;
		this.empty_user = '@we_alive';
		this.empty_texts = '@we_alive 로 트윗을 보내서, <br/>윤하에게 당신의 메세지를 전달하세요!<br/>(60자 내외)';
		this.img_str = 'https://twimg0-a.akamaihd.net/profile_images/2326500871/40dd3h331sfmblsln2jr_normal.jpeg';
	}

	ShowcasesController.prototype = {
		init: function() {
			this.do_ajax();
		},

		do_ajax: function() {
			$.ajax({
				type: 'GET',
				url: '/tweets/load',
				success: _.bind(this.response_ajax, this)
			});
		},

		response_ajax: function(data) {
			if(data.presence) {
				this.show_tweet(data.user, data.img_url, data.texts);
			} else {
				var empty_user = '@we_alive' 
				this.show_tweet(this.empty_user, this.img_str, this.empty_texts );
			}
		},

		show_tweet: function(user, img_url, texts) {
			this.img.attr('src', img_url);
			this.user.html(user);
			this.texts.html(texts);
			
			//console.log('user : ' + user + ' img_url : ' + img_url + ' texts : ' + texts);
			
			// this.img.load(_.bind(function() {
			// 	this.view.fadeIn(this.fadeTime, _.bind(function() {
			// 		setTimeout(_.bind(function() {
			// 			this.hide_tweet();
			// 		}, this), this.showTime); // tweet showing time
			// 	},this));	
			// },this));

			
			this.view.fadeIn(this.fadeTime, _.bind(function() {
				setTimeout(_.bind(function() {
					this.hide_tweet();
				}, this), this.showTime); // tweet showing time
			},this));	
			
			
		},
		hide_tweet: function() {
			this.view.fadeOut(this.fadeTime, _.bind(function() {
				this.do_ajax();
			},this));
		},
		test: function() {
			console.log('으앙');
		}


	}

	return ShowcasesController;
})();