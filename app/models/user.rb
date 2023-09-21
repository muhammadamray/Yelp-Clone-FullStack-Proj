# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  zip_code        :string           not null
#  birthday        :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, uniqueness: true, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :zip_code, length: { is: 5 }, presence: true
    validates :password, length: { in: 6..255 }, allow_nil: true
    
    before_validation :ensure_session_token

    # has_many :reviews,
    # dependent: :destroy

    has_many :businesses,
    class_name: :Business,
    foreign_key: :user_id,
    dependent: :destroy
  
    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      user&.authenticate(password)
    end
  
    def reset_session_token!
      self.update!(session_token: generate_unique_session_token)
      self.session_token
    end
  
    private
  
    def generate_unique_session_token
      loop do
        token = SecureRandom.base64
        break token unless User.exists?(session_token: token)
      end
    end
  
    def ensure_session_token
      self.session_token ||= generate_unique_session_token
    end
  end
  
