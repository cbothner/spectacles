class CreateFilters < ActiveRecord::Migration[5.0]
  def change
    create_table :filters do |t|
      t.string :name
      t.boolean :ce
      t.decimal :base_price, precision: 10, scale: 2
      t.text :color
      t.integer :vlt
      t.jsonb :spectrophotometer_data, default: []
      t.jsonb :l_ratings, default: []
      t.jsonb :ods, default: []

      t.timestamps
    end
  end
end
