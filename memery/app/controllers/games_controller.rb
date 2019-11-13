class GamesController < ApplicationController

    def index
        @games = Game.all
        render json: @games
    end

    def create
        # byebug
        Game.create({level: params[:level], score: params[:score], user_id: params[:user_id]})
    end

end
