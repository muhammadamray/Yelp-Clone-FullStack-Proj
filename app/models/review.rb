class Review < ApplicationRecord
    validates :rating, inclusion: { in: 1..5, message: "must be between 1 and 5" }, presence: true
    validates :body, presence: true

    belongs_to :user 
    belongs_to :business
end
