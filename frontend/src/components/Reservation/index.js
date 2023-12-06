import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservations, deleteReservation, fetchReservations } from "../../store/reservation";
import "./index.css";
import ReservationModal from "./ReservationModal";

function Reservations() {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const reservations = useSelector((state) => getReservations(state, currUser?.id));

  useEffect(() => {
    if (currUser) dispatch(fetchReservations());
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
    <div className="reservation-container">
      {reservations.map((reservation) => (
        <div className="reservation-card" key={reservation.id}>
          <div className="business-name">{reservation.business.name}</div>
          <div className="reservation-details">
            <div className="detail">
              <div className="detail-label">Date:</div>
              <div className="detail-value">{reservation.date}</div>
            </div>
            <div className="detail">
              <div className="detail-label">Time:</div>
              <div className="detail-value">{convertUtcTo12HourTime(reservation.startTime)}</div>
            </div>
            <div className="detail">
              <div className="detail-label">Guests:</div>
              <div className="detail-value">{reservation.guests}</div>
            </div>
          </div>
          <div className="button-container">
            <ReservationModal reservation={reservation} />
            <button
              onClick={(e) => handleDelete(e, reservation.id)}
              className="delete-btn"
            >
              Delete
            </button>
            {/* <button className="edit-btn">Edit</button> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reservations;
