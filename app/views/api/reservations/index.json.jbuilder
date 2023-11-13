json.reservations do
  @reservations.each do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :date, :start_time, :guests, :user_id, :business_id
    end
  end 
end