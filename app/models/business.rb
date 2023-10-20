# == Schema Information
#
# Table name: businesses
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  city         :string           not null
#  state        :string           not null
#  zip_code     :string           not null
#  latitude     :float            not null
#  longitude    :float            not null
#  price_range  :string           not null
#  phone_number :string           not null
#  category     :string           not null
#  rating       :float            not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
class Business < ApplicationRecord
    validates :name, :city, :state, presence: true
    validates :zip_code, presence: true, length: { is: 5 }
    validates :latitude, :longitude, presence: true
    validates :price_range, presence: true
    validates :phone_number, presence: true, length: { is: 12 }
    validates :category, presence: true

    has_one_attached :photo

    has_many :reviews,
    dependent: :destroy

    # has_many :reviewers,
    # through: :reviews,
    # source: :user,
    # dependent: :destroy

    def calculate_updated_rating
        ratings_sum = reviews.sum(:rating)    # Sum of all ratings
        reviews_count = reviews.count         # Number of reviews
    
        # Handle the case when there are no reviews to avoid division by zero
        return update(rating: 0) if reviews_count.zero?
    
        new_average_rating = ratings_sum / reviews_count.to_f
        update(rating: new_average_rating.round(2))
    end
      

end
