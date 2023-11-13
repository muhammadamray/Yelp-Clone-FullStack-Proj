class Reservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.date :date, null: false
      t.datetime :start_time, null: false
      t.integer :guests, null: false
      t.references :user, null: false, foreign_key: true
      t.references :business, null: false, foreign_key: true
      t.timestamps
    end
  end
end
