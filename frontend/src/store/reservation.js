import csrfFetch from "./csrf";

export const RECEIVE_RESERVATIONS = "reservations/receiveReservations";
export const RECEIVE_RESERVATION = "reservations/receiveReservation";
export const REMOVE_RESERVATION = "reservations/removeReservation";

export const receiveReservations = (data) => ({
  type: RECEIVE_RESERVATIONS,
  data,
});

export const receiveReservation = (data) => ({
  type: RECEIVE_RESERVATION,
  data,
});

export const removeReservation = (reservationId) => ({
  type: REMOVE_RESERVATION,
  reservationId,
});

export const getReservation = (reservationId) => (state) => {
  if (state.reservations[reservationId])
    return state.reservations[reservationId];
  return null;
};

export const getReservations = (state, userId) => {
  if (state.reservation) {
    let allReservations = Object.values(state.reservation);

    let filtered = allReservations.filter(
      (reservation) => reservation.userId === userId
    );

    return filtered;
  }
  return [];
};

export const fetchReservations = () => async (dispatch) => {
  const res = await csrfFetch("/api/reservations");
  if (res.ok) {
    const data = await res.json();

    dispatch(receiveReservations(data));
  }
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reservations/${reservationId}`);
  const data = await response.json();

  dispatch(receiveReservation(data));
};

export const createReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch("/api/reservations", {
    method: "POST",
    body: JSON.stringify(reservation),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const newReservation = await res.json();
    dispatch(receiveReservation(newReservation));
    return res;
  }
};

export const updateReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: "PATCH",
    body: JSON.stringify(reservation),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const updatedReservation = await res.json();
    dispatch(receiveReservation(updatedReservation));
  }
};

export const deleteReservation = (reservationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeReservation(reservationId));
  }
};

const reservationsReducer = (state = {}, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      for (let i = 0; i < action.data.length; i++) {
        nextState[action.data[i].id] = action.data[i];
      }
      return { ...nextState };
    case RECEIVE_RESERVATION:
      return { ...state, ...action.data.reservations };
    case REMOVE_RESERVATION:
      delete nextState[action.reservationId];
      return { ...nextState };
    default:
      return state;
  }
};

export default reservationsReducer;
