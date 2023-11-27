json.business do 
    json.extract! @business, :id, :name, :city, :state, :zip_code, :latitude, :longitude, :price_range, :phone_number, :category, :rating
    json.photo_url @business.photo.url if @business.photo.attached?
end

reviews = @business.reviews.includes(:user)
json.reviews do 
  reviews.each do |review|
    json.set! review.id do 
      json.extract! review, :id, :rating, :body, :user_id, :business_id, :created_at, :updated_at
      json.first_name review.user.first_name
      json.last_name review.user.last_name
    end
  end
end
