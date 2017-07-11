# frozen_string_literal: true

json.filters do
  @filters.each do |filter|
    json.set! filter.id do
      json.partial! filter
    end
  end
end
