# @reservations.each do |reservation|
#   json.set! reservation.id do
#     json.extract! reservation, :id, :date, :start_time, :guests, :user_id, :business_id
#   end
# end 

# businesses = @reservations.include(:businesses)
# json.businesses do 
#   businesses.each do |business|
#     json.set! business.id do 
#       json.extract! business, :id, :name
#     end
#   end
# end


json.array!(@reservations) do |reservation|

  json.extract! reservation, :id, :date, :start_time, :guests, :user_id, :business_id

  # Include business name
  json.business do
    json.extract! reservation.business, :name
  end

end