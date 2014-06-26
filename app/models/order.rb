class Order < ActiveRecord::Base
	validates :address, :city, :state, :qty, presence: true
	validates :qty, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 20 }
	belongs_to :listing
	belongs_to :buyer, class_name: "User"
	belongs_to :seller, class_name: "User"

  attr_accessor :token, :flash_message

  before_create :charge

  def set_charge_params params
    self.token = params[:token]
    self.listing = params[:listing]
    self.seller = params[:seller]
    self.buyer = params[:buyer]
  end


  private

  def charge
    Stripe.api_key = ENV["STRIPE_API_KEY"]

    begin
      # the following code charges the card
      charge = Stripe::Charge.create(
        :amount => (self.listing.price * self.qty * 100).floor,
        :currency => "usd",
        :card => self.token
      )
      self.flash_message = "Thanks for ordering!"

      #initiate transfer to seller
      begin
        transfer = Stripe::Transfer.create(
          :amount => (self.listing.price * 95).floor,
          :currency => "usd",
          :recipient => self.seller.recipient
        )
      rescue => e
        # inform owner by mail or somehow
        # that charge was successful
        # but transfer was not
      end

    rescue => e
      self.flash_message = e.message
      return false
    end
  end
end
