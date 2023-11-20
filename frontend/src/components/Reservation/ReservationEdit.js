import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservation, getReservation, updateReservation } from "../../store/reservation";

const ReservationEdit = () => {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.session.user);
    // const review = useSelector(getReservation(reservationId));



  return (

  <>

  </>


  );
};

export default ReservationEdit;
