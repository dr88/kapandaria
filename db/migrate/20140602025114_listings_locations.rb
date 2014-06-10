class ListingsLocations < ActiveRecord::Migration
  def change
    create_table  :listings_locations, :id=>false do |t|
    	t.integer :listing_id
    	t.integer :location_id    
    end	
  end
end
