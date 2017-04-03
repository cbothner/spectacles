Rails.application.routes.draw do
  scope '/api' do
    resources :suggestions
    resources :schedules
    resources :filters
  end
end
