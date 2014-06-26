class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!


  def sales
    @orders = Order.all.where(seller: current_user).order("created_at DESC")
  end

  def purchases
    @orders = Order.all.where(buyer: current_user).order("created_at DESC")
  end

  # GET /orders/new
  def new
    @order = Order.new
    @listing = Listing.find(params[:listing_id])
  end

  # POST /orders
  # POST /orders.json
  def create
    @order = Order.new(order_params)
    @listing = Listing.find(params[:listing_id])

    @order.set_charge_params({
      token: params[:stripeToken],
      listing: @listing,
      seller: @listing.user,
      buyer: current_user
    })

    respond_to do |format|
      if @order.save
        flash[:notice] = @order.flash_message
        format.html { redirect_to root_url}
        format.json { render :show, status: :created, location: @order }
      else
        flash[:danger] = @order.flash_message
        format.html { render :new }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def order_params
      params.require(:order).permit(:qty, :instructions, :address, :city, :state)
    end
end
