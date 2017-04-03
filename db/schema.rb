# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170326222516) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "filters", force: :cascade do |t|
    t.string   "name"
    t.boolean  "ce"
    t.decimal  "base_price",             precision: 10, scale: 2
    t.text     "color"
    t.integer  "vlt"
    t.jsonb    "spectrophotometer_data", default: []
    t.jsonb    "l_ratings", default: []
    t.jsonb    "ods", default: []
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  create_table "schedules", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "suggestions", force: :cascade do |t|
    t.integer  "filter_id"
    t.integer  "schedule_id"
    t.integer  "position"
    t.decimal  "special_price", precision: 10, scale: 2
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["filter_id"], name: "index_suggestions_on_filter_id", using: :btree
    t.index ["schedule_id"], name: "index_suggestions_on_schedule_id", using: :btree
  end

  add_foreign_key "suggestions", "filters"
  add_foreign_key "suggestions", "schedules"
end
