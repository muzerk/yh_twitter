class ShowcasesController < ApplicationController
	layout 'showcases'

	def index
		
	end


	def load
		@lastShownTweet = Tweet.where(:shown => false).order('id_str DESC').last
		debugger
		if @lastShownTweet.nil?
			render :text => 'shown false is nil'
		else
			render :text => 'shown false is not nil'
		end

	end
end
