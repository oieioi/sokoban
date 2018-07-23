Rails.application.routes.draw do
  root 'questions#index'

  resources :questions

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
end
