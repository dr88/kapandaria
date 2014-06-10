class AddWomaeOnlyToListings < ActiveRecord::Migration
  def change
    add_column :listings, :women_only, :boolean
  end
end
