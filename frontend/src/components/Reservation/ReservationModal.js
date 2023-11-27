import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReservationEdit from "./ReservationEdit";

function ReservationModal({ reservation }) {
  // const reservation = reservation;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReservationEdit
            setShowModal={setShowModal}
            reservation={reservation}
          />
        </Modal>
      )}
    </>
  );
}

export default ReservationModal;
