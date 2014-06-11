class Order < ActiveRecord::Base
	validates :address, :city, :state, :qty, presence: true
	#validates :qty, numericality: { greater_than: 0}

	belongs_to :listing
	belongs_to :buyer, class_name: "User"
	belongs_to :seller, class_name: "User"
end
