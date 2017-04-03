json.schedules do
  @schedules.each do |schedule|
    json.set! schedule.id do
      json.partial! schedule
    end
  end
end
