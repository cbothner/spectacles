# frozen_string_literal: true

json.extract! schedule, :id, :name, :created_at, :updated_at
json.suggestions schedule.suggestions do |suggest|
  json.filterId suggest['filter_id'] if suggest.key? 'filter_id'
  json.specialPrice suggest['special_price'] if suggest.key? 'special_price'
  json.content suggest['content'] if suggest.key? 'content'
end
json.url schedule_url(schedule, format: :json)
