class GameSerializer < ActiveModel::Serializer
  attributes :id, :level, :score
  belongs_to :user
end
