class TileSerializer < ActiveModel::Serializer
  attributes :id, :url
  belongs_to :game
end
