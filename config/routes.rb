Rails.application.routes.draw do
  scope '/api' do
    post 'admin_token' => 'admin_token#create'
    resources :suggestions
    resources :schedules
    resources :filters do
      collection do
        get 'find'
      end
    end
  end
end
