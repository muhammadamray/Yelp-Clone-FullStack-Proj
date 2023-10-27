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
    user_1 = User.create!(
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
        zip_code: '10013',
        email: Faker::Internet.unique.email,
        password: 'password'
      })
    end

    puts "Creating businesses"
    
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
      io: URI.open("https://newseeds.s3.amazonaws.com/Hells.webp"),
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
      rating: 4.1
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
      rating: 3.4
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
      rating: 4
    )

    business_10.photo.attach(
      io: URI.open("https://yelp-clone-fullstack-proj-seeds.s3.amazonaws.com/lom.webp"),
      filename: "lom.webp"
    )




    puts "Creating review" 


    # User 1 reviews
    review_1 = Review.create!(
      rating: 5,
      body: "Absolutely delicious!",
      user_id: 1,
      business_id: business_1.id
    )

    review_2 = Review.create!(
      rating: 4,
      body: "Great experience!",
      user_id: 1,
      business_id: business_2.id
    )

    # User 2 reviews
    review_3 = Review.create!(
      rating: 5,
      body: "Fantastic service and food.",
      user_id: 2,
      business_id: business_3.id
    )

    review_4 = Review.create!(
      rating: 1,
      body: "Terrible experience.",
      user_id: 2,
      business_id: business_4.id
    )

    # User 3 reviews
    review_5 = Review.create!(
      rating: 4,
      body: "Delightful dining experience.",
      user_id: 3,
      business_id: business_5.id
    )

    review_6 = Review.create!(
      rating: 3,
      body: "Average food, but nice ambiance.",
      user_id: 3,
      business_id: business_6.id
    )

    # User 4 reviews
    review_7 = Review.create!(
      rating: 5,
      body: "Exceptional quality!",
      user_id: 4,
      business_id: business_7.id
    )

    review_8 = Review.create!(
      rating: 2,
      body: "Not worth the visit.",
      user_id: 4,
      business_id: business_8.id
    )

    # User 5 reviews
    review_9 = Review.create!(
      rating: 3,
      body: "Good food, slow service.",
      user_id: 5,
      business_id: business_9.id
    )

    review_10 = Review.create!(
      rating: 4,
      body: "Memorable dining experience.",
      user_id: 5,
      business_id: business_10.id
    )

    # User 6 reviews
    review_11 = Review.create!(
      rating: 5,
      body: "Exquisite flavors and presentation.",
      user_id: 6,
      business_id: business_10.id
    )

    review_12 = Review.create!(
      rating: 2,
      body: "Disappointing overall.",
      user_id: 6,
      business_id: business_9.id
    )

    # User 7 reviews
    review_13 = Review.create!(
      rating: 4,
      body: "Enjoyed the meal and atmosphere.",
      user_id: 7,
      business_id: business_1.id
    )

    review_14 = Review.create!(
      rating: 3,
      body: "Decent food, but nothing extraordinary.",
      user_id: 7,
      business_id: business_2.id
    )

    # User 8 reviews
    review_15 = Review.create!(
      rating: 5,
      body: "Exceptional service and flavors!",
      user_id: 8,
      business_id: business_3.id
    )

    review_16 = Review.create!(
      rating: 1,
      body: "Worst dining experience ever.",
      user_id: 8,
      business_id: business_4.id
    )

    # User 9 reviews
    review_17 = Review.create!(
      rating: 4,
      body: "Great place for a quick meal.",
      user_id: 9,
      business_id: business_5.id
    )

    review_18 = Review.create!(
      rating: 2,
      body: "Disappointing food quality.",
      user_id: 9,
      business_id: business_6.id
    )

    # User 10 reviews
    review_19 = Review.create!(
      rating: 5,
      body: "Absolutely loved the ambiance!",
      user_id: 10,
      business_id: business_7.id
    )

    review_20 = Review.create!(
      rating: 3,
      body: "Average dining experience.",
      user_id: 10,
      business_id: business_8.id
    )




















  puts "Done!"
end