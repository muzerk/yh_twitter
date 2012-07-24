class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :text
      t.string :id_str
      t.string :from_user
      t.string :profile_image_url

      t.timestamps
    end
  end
end
