class AddQtyAndInstructionsToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :qty, :integer
    add_column :orders, :instructions, :text
  end
end
