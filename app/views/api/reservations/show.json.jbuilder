business = @reservation.business.name
json.extract! @reservation, 
:business,
:id, :date, :start_time, 
:guests, :user_id, :business_id
