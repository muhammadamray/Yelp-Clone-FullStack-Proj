class Reservation < ApplicationRecord
  validates :date, :start_time, :guests, presence: true

  belongs_to :user
  belongs_to :business
end
