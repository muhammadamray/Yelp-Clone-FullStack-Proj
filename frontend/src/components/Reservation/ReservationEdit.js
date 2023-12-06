import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateReservation,
} from "../../store/reservation";

const ReservationEdit = ({ reservation, setShowModal }) => {
  // console.log(reservation)

  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  function convertUtcTo12HourTime(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);
    const hours = utcDate.getUTCHours();
    const minutes = utcDate.getUTCMinutes();

    // Convert to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  const [reservationData, setReservationData] = useState({
    id: reservation.id,
    business_id: reservation.businessId,
    user_id: currUser?.id,
    guests: reservation.guests,
    date: reservation.date,
    start_time: convertUtcTo12HourTime(reservation.startTime),
    // start_time: "2:00 PM",
  });
  // console.log(reservation.startTime, "hello");
  console.log(reservationData.start_time);

  // console.log(reservationData)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReservation(reservationData));
    setShowModal(false);
    // setReservationData({ date: "", time: "12:00 PM", guests: "2" });
  };

  const times = [
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
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
          value={reservationData.start_time}
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

      <div id="table-btn" onClick={handleSubmit} type="reservation-submit">
        Confirm Table
      </div>
    </div>
  );
};

export default ReservationEdit;
