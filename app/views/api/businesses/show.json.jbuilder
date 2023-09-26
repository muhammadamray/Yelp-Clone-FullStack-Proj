json.extract! @business, :id, :name, :city, :state, :zip_code, :latitude, :longitude, :price_range, :phone_number, :category, :rating
json.photo_url @business.photo.url if @business.photo.attached?
