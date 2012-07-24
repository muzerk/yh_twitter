class Tweet < ActiveRecord::Base
  attr_accessible :from_user, :id_str, :profile_image_url, :text, :curated

end
