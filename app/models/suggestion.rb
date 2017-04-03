class Suggestion < ApplicationRecord
  belongs_to :filter
  belongs_to :schedule
end
