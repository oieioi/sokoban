class Question < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :map, presence: true
end
