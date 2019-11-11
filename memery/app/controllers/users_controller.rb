class UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
    end

    def create
        User.create({name: params[:name]})
    end

    private


end