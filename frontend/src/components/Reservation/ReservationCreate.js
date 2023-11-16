import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReservation } from "../../store/reservation";
import "./Reservation.css";
import { useLocation } from "react-router-dom";

const ReservationCreate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const restId = location.pathname.split("/")[2];
  const currUser = useSelector((state) => state.session.user);

  function formatDate(dateObject) {
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [reservationData, setReservationData] = useState({
    date: formatDate(new Date()),
    start_time: "12:00 PM",
    guests: 2,
    user_id: currUser?.id,
    business_id: Number(restId),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value, "hello");
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation(reservationData));
    // setReservationData({ date: "", time: "12:00 PM", guests: "2" });
  };

  const times = [
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
  ];

  return (
    <div className="reservation-box">
      <h1 id="res-tittle">Make a reservation</h1>
      <input
        type="date"
        id="start"
        name="date"
        value={reservationData.date}
        onChange={handleInputChange}
      />
      <div className="time-guest">
        <select
          id="appt"
          name="start_time"
          value={reservationData.time}
          onChange={handleInputChange}
        >
          {times.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <select
          name="guests"
          id="guest-list"
          value={reservationData.guests}
          onChange={handleInputChange}
        >
          <option value="1">1 person</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4">4 people</option>
          <option value="5">5 people</option>
          <option value="6">6 people</option>
        </select>
      </div>
      {currUser ? (
        <button onClick={handleSubmit} type="reservation-submit">
          Confirm Table
        </button>
      ) : null}
    </div>
  );
};

export default ReservationCreate;
