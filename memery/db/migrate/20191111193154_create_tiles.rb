class CreateTiles < ActiveRecord::Migration[5.2]
  def change
    create_table :tiles do |t|
      t.references :game, foreign_key: true
      t.string :url

      t.timestamps
    end
  end
end
