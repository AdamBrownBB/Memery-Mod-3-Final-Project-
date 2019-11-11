class TilesController < ApplicationController

    def index
        @tiles = Tile.all
        render json: @tiles
    end

end
