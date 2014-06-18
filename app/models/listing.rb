class Listing < ActiveRecord::Base
	if Rails.env.development?
		has_attached_file 	:image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "default.jpg"
	else
		has_attached_file 	:image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "default.jpg",
						    :storage => :dropbox,
						    :dropbox_credentials => Rails.root.join("config/dropbox.yml"),
						    :path => ":style/:id_:d_filename"

	end
	do_not_validate_attachment_file_type :image
	validates :name, :description, :price, presence: true
	validates :price, numericality: {greater_than: 0}
	# validates_attachment_presence :image

	belongs_to :user
	has_many :orders
	has_and_belongs_to_many :locations

	def location_names
		locations.map(&:name)
	end

	def self.search query
		unless query.empty?
			listings = all
			listings = listings.where(women_only: false) unless query.has_key? :women_only
			listings = listings.where("listings.name" => "#{query[:search]}%") unless query[:search].blank?
			listings = listings.joins(:locations).where("locations.name" => query[:tags].downcase.split(',')) unless query[:tags].blank?
			listings
		else
			where(women_only: false)
		end
	end
end
