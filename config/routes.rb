Rails.application.routes.draw do
  scope '/api' do
    resources :suggestions
    resources :schedules
    resources :filters do
      collection do
        get 'find'
      end
    end
  end
end
