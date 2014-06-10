class Order < ActiveRecord::Base
	validates :address, :city, :state, :qty, presence: true
	validates :qty, :numericality => { :greater_than_or_equal_to => 1 }

	belongs_to :listing
	belongs_to :buyer, class_name: "User"
	belongs_to :seller, class_name: "User"
end
