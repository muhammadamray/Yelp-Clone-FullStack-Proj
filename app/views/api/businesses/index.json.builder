json.businesses do
  @businesses.each do |business|
    json.set! business.id do
      json.extract! business,
        :id,
        :name,
        :city,
        :state,
        :zip_code,
        :latitude,
        :longitude,
        :price_range,
        :phone_number,
        :category,
        :rating
    end
  end
end