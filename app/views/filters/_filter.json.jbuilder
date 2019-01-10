# frozen_string_literal: true

json.extract! filter, :id, :name, :ce, :color, :vlt, :created_at, :updated_at
json.base_price filter.base_price.to_f
json.spectrophotometer_data filter.spectrophotometer_data
json.l_ratings filter.l_ratings
json.ods filter.ods
json.url filter_url(filter, format: :json)
