require 'uri'
require 'net/http'

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

    # @businesses = Business.where('name ILIKE ?', "%#{query}%")

    
    url = URI("https://api.yelp.com/v3/businesses/search?location=nyc&term=#{query}&sort_by=best_match&limit=20")
    
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    
    request = Net::HTTP::Get.new(url)
    request["accept"] = 'application/json'
    request["Authorization"] = 'Bearer fyKsAYn-fOsN3OIi_vekzWD2Wx37YurS3rsRm0YzVudZy_DhC6p6Csrtr9AtzKYGfLdld1fnQC6YI3D_OKSOqiHTIbhhYmqNBKdCsnUdtweMra3ud3-CLkMuz3zwZXYx'
    
    response = http.request(request)
    # puts response.read_body
    # @businesses = JSON.parse(response.read_body)

    render json:response.read_body
    # debuggerc
    
    # render :search
  end

  private

  def business_params
    params.require(:business).perimit(:name, :city, :state, :zip_code, :latitude, :longitude, :price_range,
     :phone_number, :category)
  end
end
