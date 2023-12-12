class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + %w[firstName lastName email zipCode password]

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :zip_code, :password)
  end
end
