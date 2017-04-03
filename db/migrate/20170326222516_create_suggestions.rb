class CreateSuggestions < ActiveRecord::Migration[5.0]
  def change
    create_table :suggestions do |t|
      t.references :filter, foreign_key: true
      t.references :schedule, foreign_key: true
      t.integer :position
      t.decimal :special_price, precision: 10, scale: 2

      t.timestamps
    end
  end
end
