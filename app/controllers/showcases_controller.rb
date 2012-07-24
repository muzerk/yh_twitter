class ShowcasesController < ApplicationController
	layout 'showcases'

	def index
		
	end


	def show
		@lastShownTweet = Tweet.find(:first, 
                        		:order => "id_str DESC")
	end
end
