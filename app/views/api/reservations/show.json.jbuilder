json.extract! @reservation, 
:id, :date, :start_time, 
:guests, :user_id, :business_id
json.business do
    json.extract! @reservation.business, :name
end
