class TweetsController < ApplicationController

	layout 'tweets'

	def index
		@tweets = Tweet.order('id_str DESC')
		@lastTweet = @tweets.first
	end

	def new
		@lastTweet = Tweet.find(:first, 
                        		:order => "id_str DESC")
		if @lastTweet.nil?
			@newTweets = Twitter.search("@we_alive", :rpp => 100, :result_type => "recent").results
			@status = 'first parse'
		else
			@newTweets = Twitter.search("@we_alive", :rpp => 100, :result_type => "recent", :since_id => @lastTweet.id_str).results
			@status = 'not first parse'
		end

		@newTweets.map do |status|
		  Tweet.create(:id_str => status.id, :text => status.text, :from_user => status.from_user, :profile_image_url => status.profile_image_url, :curated => false)
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
end
