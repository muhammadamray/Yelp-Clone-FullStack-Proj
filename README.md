Not Yelp! - A Yelp Clone

## Introduction
A comprehensive Yelp-inspired Full Stack application designed to empower users in discovering restaurants and effortlessly securing reservations.

## OverView
![Gameplay Screen](images/gamescreen.png)

## Languages & APIs
Frontend — React, Redux, Google Maps Api, Html, Css

Backend — Ruby on Rails, PostgreSQL, AWS

## Features
**Google Map:**
```
useEffect(() => {
    if (!map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: {
            lat: 40.705076, // App Academy NY latitude
            lng: -74.00916, // App Academy NY longitude
          },
          zoom: 15,
          clickableIcons: false,
          ...mapOptions,
          disableDefaultUI: true,
        })
      );
    }
  }, [mapRef, map, mapOptions]);

  // Add event handlers to map
  useEffect(() => {
    if (map) {
      const listeners = Object.entries(mapEventHandlers).map(
        ([event, handler]) =>
          window.google.maps.event.addListener(map, event, (...args) =>
            handler(...args, map)
          )
      );

      return () => listeners.forEach(window.google.maps.event.removeListener);
    }
  }, [map, mapEventHandlers]);
```

The implementation of the `useEffect` hooks in the "Not Yelp!" project plays a pivotal role in ensuring the proper initialization and functionality of the Google Maps feature. The first `useEffect` block is responsible for initializing the map when it's not already present. It checks whether a map instance exists and, if not, creates a new Google Maps object with specific configurations, such as the initial center coordinates and zoom level. This ensures that the map is set up correctly, providing users with an interactive interface to explore restaurant locations.

The second `useEffect` block focuses on adding event handlers to the map. This is crucial for capturing user interactions and updating the application state accordingly. For instance, when a user interacts with the map, clicks on a marker, or performs other actions, these events trigger corresponding handlers. These handlers, defined in `mapEventHandlers`, are executed, allowing for dynamic responses to user input.

The overall significance of these `useEffect` hooks lies in their contribution to a responsive and user-friendly experience. By initializing the map and attaching event handlers, the application ensures that users can seamlessly interact with the map, view restaurant locations, and gather relevant information. It enhances the overall functionality of the project, making it a valuable and user-centric feature for exploring and discovering restaurants.

**Google Map:**
```
const handleInputChange = (e) => {
    const { name, value } = e.target;

    // let err = null;
    if (name === "date") {
      let date = new Date(value);
      for (let i = 0; i < allReservations.length; i++) {
        let res = allReservations[i];
        if (res.businessId === parseInt(restId) && res.date === value) {
          setError("You already have a reservation for this date");

          // err = true;
          break;
        } else if (date < Date.now()) {
          setError("Can't Select Past Date");
          break;
        } else {
          setError(null);
        }
      }
    }

    setReservationData({ ...reservationData, [name]: value });
  };
```

The handleInputChange function in the "Reservation Create" is a critical piece of code that manages the input changes in the reservation form. When a user interacts with the form by entering information, this function captures the event, extracts the name and value of the changed input, and then updates the reservationData state accordingly.

In particular, the function addresses the scenario where the user selects a date for the reservation. It checks if there are existing reservations for the chosen date and if the selected date is in the past. If a reservation already exists for the selected date, or if the date is in the past, it sets an error message in the state using the setError function. This error message can then be displayed to the user, providing immediate feedback on potential issues with their reservation input.

The benefit of having a frontend error handler, as demonstrated here, is twofold. Firstly, it enhances the user experience by providing real-time feedback, preventing unnecessary form submissions that would result in backend validation errors. Users can correct their input before submitting the form, reducing frustration and improving the overall usability of the application. Secondly, it offloads some validation logic to the frontend, minimizing the need for round trips to the server for every user interaction. This results in a more responsive and efficient application, as common errors can be caught and addressed on the client side before reaching the backend.
