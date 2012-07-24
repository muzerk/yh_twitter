class AddShownToTweets < ActiveRecord::Migration
  def change
  	add_column :tweets, :shown, :boolean
  end
end
