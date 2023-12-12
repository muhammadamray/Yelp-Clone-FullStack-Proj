class Api::BusinessesController < ApplicationController
  def index
    @businesses = Business.all
    # render :index
    # render json: @businesses
    render 'api/businesses/index'
  end

  def show
    @business = Business.find(params[:id]) # .includes(:reviews) when I have reviews
    # render :show

    @business.calculate_updated_rating
    render :show # changed the render from @business to this one...... any issue?
  end

  def search
    query = params[:query]

    @businesses = Business.where('name ILIKE ?', "%#{query}%")

    render :search
  end

  private

  def business_params
    params.require(:business).perimit(:name, :city, :state, :zip_code, :latitude, :longitude, :price_range,
     :phone_number, :category)
  end
end
