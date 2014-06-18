class ListingsController < ApplicationController
  before_action :set_listing, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!, only: [:seller, :new, :create, :edit, :udpate, :destroy]
  before_filter :check_user, only: [:edit, :update, :destroy]
  before_filter :set_location_ids, only: [:create, :update]

  def seller
    @listings = Listing.where(user: current_user).order("created_at DESC")
  end

  # GET /listings
  # GET /listings.json
  def index
    @listings = Listing.search(params.slice(:search, :tags, :women_only)).order("created_at DESC")
    @locations = Location.all
  end

  # GET /listings/1
  # GET /listings/1.json
  def show
  end

  # GET /listings/new
  def new
    @listing = Listing.new
    @locations = Location.all
  end

  # GET /listings/1/edit
  def edit
    @locations = Location.all
  end

  # POST /listings
  # POST /listings.json
  def create
    @listing = Listing.new(listing_params)
    @listing.user_id = current_user.id

    # if the current user has already a listing and therefore the Stripe
    # recipient was already created and the value entered into the recipient
    # column in the listings table, skip. Else, create.
    if current_user.recipient.blank?
      Stripe.api_key = ENV["STRIPE_API_KEY"]
      token = params[:stripeToken]    
      recipient = Stripe::Recipient.create(
        :name => current_user.name,
        :email => current_user.email,
        :type => "individual",
        :bank_account => token
      )
      current_user.recipient = recipient.id
      current_user.save      
    end



    respond_to do |format|
      if @listing.save
        format.html { redirect_to @listing, notice: 'Listing was successfully created.' }
        format.json { render :show, status: :created, location: @listing }
      else
        format.html { render :new }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /listings/1
  # PATCH/PUT /listings/1.json
  def update
    respond_to do |format|
      if @listing.update(listing_params)
        format.html { redirect_to @listing, notice: 'Listing was successfully updated.' }
        format.json { render :show, status: :ok, location: @listing }
      else
        format.html { render :edit }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /listings/1
  # DELETE /listings/1.json
  def destroy
    @listing.destroy
    respond_to do |format|
      format.html { redirect_to listings_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_listing
      @listing = Listing.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def listing_params
      params.require(:listing).permit(:name, :description, :price, :image ,:women_only, :location_ids => [])
    end

    def set_location_ids
      location_names = params[:listing][:location_names].split(',')
      existing_locations = Location.where(name: location_names).pluck(:id, :name)

      location_ids = existing_locations.map(&:first)

      (location_names - existing_locations.map(&:last)).each do |location_name|
        location_ids << Location.create(name: location_name).id
      end

      params[:listing][:location_ids] = location_ids
    end

    def check_user
      if current_user.id != @listing.user_id
        redirect_to root_url, alert: "Sorry, this listing belongs to someone else."
      end
    end
end
