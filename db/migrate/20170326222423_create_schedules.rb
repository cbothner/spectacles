class CreateSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :schedules do |t|
      t.string :name
      t.jsonb :suggestions, null: false, default: []

      t.timestamps
    end
  end
end
