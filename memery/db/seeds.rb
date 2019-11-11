# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user1 = User.create(name: "Adam")
user2 = User.create(name: "Jinming")

game1 = Game.create(user: user1, level: 1, score: 0)
game2 = Game.create(user: user2, level: 1, score: 0)

tile1 = Tile.create(game: game1, url: "https://media.giphy.com/media/STYcRDzNO6AYNmMgvA/giphy.gif")
tile2 = Tile.create(game: game2, url: "https://media.giphy.com/media/kFCkZlBN1ub3iUuRDz/giphy.gif")