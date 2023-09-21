class Api::BusinessesController < ApplicationController
    def index
        @businesses = Business.all
        # render :index
        render json: @businesses
    end
    
    def show
        @business = Business.find(params[:id])    #.includes(:reviews) when I have reviews 
        # render :show
        render json: @business
    end


    





    private 
    def business_params
        params.require(:business).perimit(:name, :city, :state, :zip_code, :latitude, :longitude, :price_range, :phone_number, :category)
    end
end