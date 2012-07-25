class TweetsController < ApplicationController

	layout 'tweets'

	def index
		@tweets = Tweet.order('id_str DESC')
		@lastTweet = @tweets.first
	end

	def new

		search_string = "@we_alive"
		@lastTweet = Tweet.find(:first, 
                        		:order => "id_str DESC")
		if @lastTweet.nil?
			@newTweets = Twitter.search(search_string, :rpp => 100, :result_type => "recent").results
			@status = 'first parse'
		else
			@newTweets = Twitter.search(search_string, :rpp => 100, :result_type => "recent", :since_id => @lastTweet.id_str).results
			@status = 'not first parse'
		end

		@newTweets.map do |status|
		  Tweet.create(:id_str => status.id, :text => status.text, :from_user => status.from_user, :profile_image_url => status.profile_image_url, :curated => false, :shown => false)
		end

		redirect_to tweets_path
	end


	def edit
		@tweet = Tweet.find(params[:id])

		if params[:curated] == 'true'
			@tweet.curated = false
		elsif params[:curated] == 'false'
			@tweet.curated = true
		end

		@tweet.save
			
		render :json => { :text => "curated status has been toggled", :curated => @tweet.curated }
	end

	def destroy
		@tweet = Tweet.find(params[:id])
    	@tweet.destroy

		render :json => {:success => true, :message => 'Delete Tweet Successfully'}
	end

	def load
		lastShownTweet = Tweet.where(:shown => false, :curated => true).order('id_str DESC').last
		
		if lastShownTweet.nil?
			tweet = Tweet.where(:curated => true).order("RAND()").first
		else
			tweet = lastShownTweet
		end

		if tweet != nil

			tweet.shown = true if tweet.shown == false

			tweet.save
			render :json => {:presence => true, :user => tweet.from_user, :img_url => tweet.profile_image_url , :texts => tweet.text }
		else
			render :json => {:presence => false}
		end
		

		
	end
end
