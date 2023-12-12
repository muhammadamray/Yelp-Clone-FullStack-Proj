Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    get 'businesses/search', to: 'businesses#search'
    resources :users, only: :create
    resource :session, only: %i[show create destroy]
    resources :businesses, only: %i[index show]
    resources :reviews, only: %i[index create show update destroy]
    resources :reservations, only: %i[index create update destroy]
  end

  post 'api/test', to: 'application#test'

  get '*path', to: 'static_pages#frontend_index'
end
