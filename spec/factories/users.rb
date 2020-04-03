FactoryBot.define do
  factory :user do
    password = Faker::Internet.password(min_length: 8)
    name {Faker::name.last_name}
    password {password}
    password_confirmation {password}
  end
end