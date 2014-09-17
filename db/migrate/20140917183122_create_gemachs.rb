class CreateGemachs < ActiveRecord::Migration
  def change
    create_table :gemachs do |t|
      t.string :title
      t.string :location
      t.text :body
      t.string :last_line
      t.references :user, index: true

      t.timestamps
    end
  end
end
