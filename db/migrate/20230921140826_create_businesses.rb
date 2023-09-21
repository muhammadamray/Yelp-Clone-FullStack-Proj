class CreateBusinesses < ActiveRecord::Migration[7.0]
  def change
    create_table :businesses do |t|
      t.string :name, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip_code, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :price_range, null: false
      t.string :phone_number, null: false
      t.string :category, null: false
      t.float :rating, null: false
      t.timestamps
    end
  end
end
