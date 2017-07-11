# frozen_string_literal: true

json.extract! schedule, :id, :name, :created_at, :updated_at
json.suggestions schedule.suggestions do |suggestion|
  json.extract! suggestion, 'filter_id', 'special_price'
end
json.url schedule_url(schedule, format: :json)
