# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Business.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      first_name: 'Demo',
      last_name: 'Login',
      email: 'demologin@gmail.com', 
      password: 'password',
      zip_code: '11510'
    )
  
    # More users
    10.times do
      first_name = Faker::Name.first_name
      last_name = Faker::Name.last_name
      zip_code = Faker::Address.zip_code
    
      User.create!({
        first_name: first_name,
        last_name: last_name,
        zip_code: '11111',
        email: Faker::Internet.unique.email,
        password: 'password'
      })
    end

    # Business 1 - Italian Restaurant
    business_1 = Business.create!(
      name: "Italian Restaurant 1",
      city: "New York City",
      state: "New York",
      zip_code: "10001",
      latitude: 40.730610,
      longitude: -73.935242,
      price_range: "$$",
      phone_number: "212-555-1234",
      category: "Italian",
      rating: 4.5
    )

    # Business 2 - Sushi Bar
    business_2 = Business.create!(
      name: "Sushi Bar 1",
      city: "New York City",
      state: "New York",
      zip_code: "10002",
      latitude: 40.718428,
      longitude: -73.989130,
      price_range: "$$$",
      phone_number: "212-555-5678",
      category: "Sushi",
      rating: 4.8
   
    )

    # Business 3 - Pizza Place
    business_3 = Business.create!(
      name: "Pizza Place 1",
      city: "New York City",
      state: "New York",
      zip_code: "10003",
      latitude: 40.732605,
      longitude: -73.989026,
      price_range: "$",
      phone_number: "212-555-9876",
      category: "Pizza",
      rating: 4.2
      
    )

    # Business 4 - Mexican Restaurant
    business_4 = Business.create!(
      name: "Mexican Restaurant 1",
      city: "New York City",
      state: "New York",
      zip_code: "10004",
      latitude: 40.703617,
      longitude: -74.011282,
      price_range: "$$",
      phone_number: "212-555-6543",
      category: "Mexican",
      rating: 4.6
    )

    # Business 5 - Indian Curry House
    business_5 = Business.create!(
      name: "Indian Curry House 1",
      city: "New York City",
      state: "New York",
      zip_code: "10005",
      latitude: 40.705076,
      longitude: -74.009160,
      price_range: "$$$",
      phone_number: "212-555-7890",
      category: "Indian",
      rating: 4.7
    )

    # Business 6 - BBQ Grill
    business_6 = Business.create!(
      name: "BBQ Grill 1",
      city: "New York City",
      state: "New York",
      zip_code: "10006",
      latitude: 40.710215,
      longitude: -74.011882,
      price_range: "$$$",
      phone_number: "212-555-2345",
      category: "BBQ",
      rating: 4.4
    )

    # Business 7 - Seafood Restaurant
    business_7 = Business.create!(
      name: "Seafood Restaurant 1",
      city: "New York City",
      state: "New York",
      zip_code: "10007",
      latitude: 40.713174,
      longitude: -74.010172,
      price_range: "$$$$",
      phone_number: "212-555-8765",
      category: "Seafood",
      rating: 4.9
    )

    # Business 8 - Burger Joint
    business_8 = Business.create!(
      name: "Burger Joint 1",
      city: "New York City",
      state: "New York",
      zip_code: "10008",
      latitude: 40.718258,
      longitude: -74.012692,
      price_range: "$",
      phone_number: "212-555-3456",
      category: "Burgers",
      rating: 4.3
    )

    # Business 9 - Thai Cuisine
    business_9 = Business.create!(
      name: "Thai Cuisine 1",
      city: "New York City",
      state: "New York",
      zip_code: "10009",
      latitude: 40.726766,
      longitude: -73.981754,
      price_range: "$$",
      phone_number: "212-555-6789",
      category: "Thai",
      rating: 4.6
    )


        
    
  puts "Done!"
end