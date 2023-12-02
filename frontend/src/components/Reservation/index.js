import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReservations,
  deleteReservation,
  fetchReservations,
} from "../../store/reservation";
import "./index.css";
import ReservationModal from "./ReservationModal";

const Reservations = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const reservations = useSelector((state) =>
    getReservations(state, currUser?.id)
  );

  useEffect(() => {
   if(currUser)dispatch(fetchReservations());
  }, [currUser, dispatch]);

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

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteReservation(id));
  };

  return (
    <div className="Reservation-pg-container">
      {reservations.map((reservation) => (
        <div className="reservation-data" key={reservation.id}>
          <div id="res-bs-name">{reservation.business.name}</div>
          <div id="res-date">{reservation.date}</div>
          <div id="res-time">
            {convertUtcTo12HourTime(reservation.startTime)}
          </div>
          <div id="res-guests">{reservation.guests}</div>
          <ReservationModal
            // reservationId={reservation.id}
            // date={reservation.date}
            // startTime={reservation.startTime}
            // guests={reservation.guests}
            // businessId={reservation.businessId}
            reservation={reservation}
          />
          <button
            onClick={(e) => handleDelete(e, reservation.id)}
            className="reservation-btn"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Reservations;
