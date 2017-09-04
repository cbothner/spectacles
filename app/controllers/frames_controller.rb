# frozen_string_literal: true

class FramesController < ApplicationController
  before_action :set_filter

  def index
    render json: FrameScraper.new(@filter.name).available_frames

    expires_in 3.hours
  end

  private

  def set_filter
    @filter = Filter.find params[:filter_id]
  end
end
