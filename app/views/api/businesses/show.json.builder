json.business do
    json.extract! @business, :id, :name, :city, :state, :zip_code,
    :latitude, :longitude, :price_range, :phone_number,
    :category, :rating, :created_at, :updated_at
end