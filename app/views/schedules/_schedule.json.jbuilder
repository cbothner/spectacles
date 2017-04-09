json.extract! schedule, :id, :name, :created_at, :updated_at
json.suggestions schedule.suggestions
json.url schedule_url(schedule, format: :json)
