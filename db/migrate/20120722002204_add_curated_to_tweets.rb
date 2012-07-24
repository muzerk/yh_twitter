class AddCuratedToTweets < ActiveRecord::Migration
  def change
  	add_column :tweets, :curated, :boolean
  end
end
