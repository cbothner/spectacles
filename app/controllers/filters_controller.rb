class FiltersController < ApplicationController
  before_action :set_filter, only: [:show, :update, :destroy]

  # GET /filters
  # GET /filters.json
  def index
    @filters = Filter.all
  end

  # GET /filters/1
  # GET /filters/1.json
  def show
  end

  # GET /filters/find.json?name=ABC
  def find
    @filter = Filter.find_by_name(params[:name])
    if @filter
      render :show
    else
      head status: 404
    end
  end

  # POST /filters
  # POST /filters.json
  def create
    @filter = Filter.new(filter_params)

    if @filter.save
      render :show, status: :created, location: @filter
    else
      render json: @filter.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /filters/1
  # PATCH/PUT /filters/1.json
  def update
    if @filter.update(filter_params)
      render :show, status: :ok, location: @filter
    else
      render json: @filter.errors, status: :unprocessable_entity
    end
  end

  # DELETE /filters/1
  # DELETE /filters/1.json
  def destroy
    @filter.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_filter
      @filter = Filter.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def filter_params
      params.require(:filter).permit(
        :name, :ce, :base_price, :color, :vlt,
        spectrophotometer_data: [:wavelength, :od, :transmittance],
        l_ratings: [:range, :value],
        ods: [:range, :value],
      )
    end
end
