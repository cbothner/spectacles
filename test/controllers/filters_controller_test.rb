require 'test_helper'

class FiltersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @filter = filters(:one)
  end

  test "should get index" do
    get filters_url, as: :json
    assert_response :success
  end

  test "should create filter" do
    assert_difference('Filter.count') do
      post filters_url, params: { filter: { base_price: @filter.base_price, base_price: @filter.base_price, ce: @filter.ce, color: @filter.color, l_ratings: @filter.l_ratings, name: @filter.name, ods: @filter.ods, spectrophotometer_data: @filter.spectrophotometer_data, vlt: @filter.vlt } }, as: :json
    end

    assert_response 201
  end

  test "should show filter" do
    get filter_url(@filter), as: :json
    assert_response :success
  end

  test "should update filter" do
    patch filter_url(@filter), params: { filter: { base_price: @filter.base_price, base_price: @filter.base_price, ce: @filter.ce, color: @filter.color, l_ratings: @filter.l_ratings, name: @filter.name, ods: @filter.ods, spectrophotometer_data: @filter.spectrophotometer_data, vlt: @filter.vlt } }, as: :json
    assert_response 200
  end

  test "should destroy filter" do
    assert_difference('Filter.count', -1) do
      delete filter_url(@filter), as: :json
    end

    assert_response 204
  end
end
