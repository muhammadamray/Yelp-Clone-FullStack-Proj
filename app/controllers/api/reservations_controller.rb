class Api::ReservationsController < ApplicationController
  wrap_parameters include: Reservation.attribute_names + [:businessId]

  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
      # @reservations = current_user.reservations
      render :show
    else
      render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @reservations = if current_user
        current_user.reservations
    # render :index
    else
        []
    end
    render :index
  end

  def show
    @reservation = Reservation.find_by(id: params[:id])
    render :show
  end

  def update
    @reservation = Reservation.find_by(id: params[:id])
    if @reservation.update(reservation_params)
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  # def update
  #     @reservation = current_user.reviews.find(params[:id])

  #     unless @reservation
  #       render json: { message: 'Unauthorized' }, status: :unauthorized
  #       return
  #     end

  #     if @reservation.update(reservation_params)
  #       render :show
  #     else
  #       render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
  #     end
  # end

  def destroy
    @reservation = Reservation.find_by(id: params[:id])

    return unless @reservation.user_id == current_user.id

    @reservation.destroy
    render :index
  end

  private

  def reservation_params
    params.require(:reservation).permit(
      :business_id,
      :user_id,
      :guests,
      :date,
      :start_time
    )
  end
end
