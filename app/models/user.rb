class User < ApplicationRecord
    has_secure_password
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, 
      uniqueness: true, 
      presence: true,
      email: true
    validates :session_token, presence: true, uniqueness: true
    validates :zip_code, length: { is: 5 }, presence: true
    validates :password, length: { in: 6..255 }, allow_nil: true
    
    before_validation :ensure_session_token

    # has_many :reviews,
    # dependent: :destroy
  
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
  