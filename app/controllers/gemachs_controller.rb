class GemachsController < ApplicationController
  before_action :set_gemach, only: [:edit, :update]

  def index
    @gemachs = Gemach.search(params[:search]).order("created_at DESC")
  end

  def modify
    @gemachs = Gemach.where(user: current_user)
  end

  def new
    @gemach = Gemach.new
  end

  def create
    @gemach = Gemach.new(gemach_params)

    respond_to do |format|
      if @gemach.save
        format.html { redirect_to :gemachs_my, notice: 'Gemach was successfully created.' }
        format.json { render :index, status: :created, location: @gemach }
      else
        format.html { render :place }
        format.json { render json: @gemach.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @gemach.update(gemach_params)
        format.html { redirect_to :gemachs_my, notice: 'Gemach was successfully updated.' }
        format.json { render :show, status: :ok, location: @gemach }
      else
        format.html { render :modify }
        format.json { render json: @gemach.errors, status: :unprocessable_entity }
      end
    end
  end


  private

  def gemach_params
    params.require(:gemach).permit(:title, :location, :body, :last_line, :user_id)
  end

  def set_gemach
    @gemach = Gemach.find(params[:id])
  end

end
