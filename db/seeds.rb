require "open-uri"


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
    ApplicationRecord.connection.reset_pk_sequence!('businesses')
  
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

    
    
    business_1 = Business.create!(
      name: "Nobu",
      city: "New York City",
      state: "New York",
      zip_code: "10013",
      latitude: 40.716675,
      longitude: -74.009610,
      price_range: "$$$$",
      phone_number: "212-757-3000",
      category: "Japanese",
      rating: 4.8
    )

    business_1.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/nobu.jpeg"),
      filename: "nobu.jpeg"
    )

  
    business_2 = Business.create!(
      name: "Sushi Nakazawa",
      city: "New York City",
      state: "New York",
      zip_code: "10014",
      latitude: 40.731797,
      longitude: -74.0045140,
      price_range: "$$$$",
      phone_number: "212-924-2212",
      category: "Sushi",
      rating: 4.6
    )

    business_2.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/sushi.jpeg"),
      filename: "sushi.jpeg"
    )

    business_3 = Business.create!(
      name: "Joe's Pizza",
      city: "New York City",
      state: "New York",
      zip_code: "10014",
      latitude: 40.730522,
      longitude: -74.002205,
      price_range: "$",
      phone_number: "212-366-1182",
      category: "Pizza",
      rating: 4.5
    )

    business_3.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/joes.webp"),
      filename: "joes.webp"
    )

   
    business_4 = Business.create!(
      name: "Hell's Kitchen",
      city: "New York City",
      state: "New York",
      zip_code: "10019",
      latitude: 40.764579,
      longitude: -73.988739,
      price_range: "$$",
      phone_number: "212-977-1588",
      category: "American",
      rating: 4.5
    )

    business_4.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/Hells.webp"),
      filename: "Hells.webp"
    )
    
    business_5 = Business.create!(
      name: "Top Thai",
      city: "New York City",
      state: "New York",
      zip_code: "10014",
      latitude: 40.7299526,
      longitude: -74.0068115,
      price_range: "$$",
      phone_number: "646-609-2272",
      category: "Thai",
      rating: 4.3
    )

    business_5.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/top-thai.jpeg"),
      filename: "top-thai.jpeg"
    )

    business_6 = Business.create!(
      name: "Ribalta",
      city: "New York City",
      state: "New York",
      zip_code: "10003",
      latitude: 40.733282,
      longitude: -73.994134,
      price_range: "$$",
      phone_number: "212-777-7781",
      category: "Italian",
      rating: 4.4
    )

    business_6.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/ribalta.jpeg"),
      filename: "ribalta.jpeg"
    )

    business_7 = Business.create!(
      name: "L'Artusi",
      city: "New York City",
      state: "New York",
      zip_code: "10014",
      latitude: 40.7335852,
      longitude: -74.0056579,
      price_range: "$$$",
      phone_number: "212-255-5757",
      category: "Italian",
      rating: 4.7
    )
    business_7.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/lart.avif"),
      filename: "lart.avif"
    )

    business_8 = Business.create!(
      name: "Marea",
      city: "New York City",
      state: "New York",
      zip_code: "10019",
      latitude: 40.7671376,
      longitude: -73.9812163,
      price_range: "$$$",
      phone_number: "212-582-5100",
      category: "Italian",
      rating: 4.5
    )
    business_8.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/marea.jpeg"),
      filename: "marea.jpeg"
    )

   
    business_9 = Business.create!(
      name: "Di Fara Pizza",
      city: "New York City",
      state: "New York",
      zip_code: "11230",
      latitude: 40.625422,
      longitude: -73.961565,
      price_range: "$$",
      phone_number: "718-258-1367",
      category: "Pizza",
      rating: 4.7
    )
    business_9.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/pizzzaa.jpeg"),
      filename: "pizzzaa.jpeg"
    )
      
    business_10 = Business.create!(
      name: "Lombardi's Pizza",
      city: "New York City",
      state: "New York",
      zip_code: "10012",
      latitude: 40.721567,
      longitude: -73.995755,
      price_range: "$$",
      phone_number: "212-941-7994",
      category: "Pizza",
      rating: 4.6
    )
    business_10.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/lom.webp"),
      filename: "lom.webp"
    )
  puts "Done!"
end