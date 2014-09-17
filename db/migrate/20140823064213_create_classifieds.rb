class CreateClassifieds < ActiveRecord::Migration
  def change
    create_table :classifieds do |t|
      t.string :title
      t.string :location, index: true
      t.text :body
      t.string :last_line
      t.references :user, index: true

      t.timestamps
    end
  end
end
