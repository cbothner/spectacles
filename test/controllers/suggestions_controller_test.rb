require 'test_helper'

class SuggestionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @suggestion = suggestions(:one)
  end

  test "should get index" do
    get suggestions_url, as: :json
    assert_response :success
  end

  test "should create suggestion" do
    assert_difference('Suggestion.count') do
      post suggestions_url, params: { suggestion: { filter_id: @suggestion.filter_id, position: @suggestion.position, schedule_id: @suggestion.schedule_id, special_price: @suggestion.special_price, special_price: @suggestion.special_price } }, as: :json
    end

    assert_response 201
  end

  test "should show suggestion" do
    get suggestion_url(@suggestion), as: :json
    assert_response :success
  end

  test "should update suggestion" do
    patch suggestion_url(@suggestion), params: { suggestion: { filter_id: @suggestion.filter_id, position: @suggestion.position, schedule_id: @suggestion.schedule_id, special_price: @suggestion.special_price, special_price: @suggestion.special_price } }, as: :json
    assert_response 200
  end

  test "should destroy suggestion" do
    assert_difference('Suggestion.count', -1) do
      delete suggestion_url(@suggestion), as: :json
    end

    assert_response 204
  end
end
