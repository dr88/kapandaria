class CreateListingsLocationsJoinsTable < ActiveRecord::Migration
  def change
    create_table  :listings_locations_joins_table do |t|
    	t.integer :listing_id
    	t.integer :location_id    	
    end
  end
end
