class ClassifiedsController < ApplicationController
  before_action :set_classified, only: [:edit, :update]

  def index
    @classifieds = Classified.where(user: current_user)
  end

  def new
    @classified = Classified.new
  end

  def create
    @classified = Classified.new(classified_params)

    respond_to do |format|
      if @classified.save
        format.html { redirect_to :classifieds, notice: 'Classified was successfully created.' }
        format.json { render :index, status: :created, location: @classified }
      else
        format.html { render :place }
        format.json { render json: @classified.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @classified.update(classified_params)
        format.html { redirect_to :classifieds, notice: 'Classified was successfully updated.' }
        format.json { render :show, status: :ok, location: @classified }
      else
        format.html { render :modify }
        format.json { render json: @classified.errors, status: :unprocessable_entity }
      end
    end
  end


  private

  def classified_params
    params.require(:classified).permit(:title, :location, :body, :last_line, :user_id)
  end

  def set_classified
    @classified = Classified.find(params[:id])
  end

end
