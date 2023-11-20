import React, { useState } from "react";
import {Modal} from "../../context/Modal"
import ReservationEdit from "./ReservationEdit"

function ReservationModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReservationEdit />
        </Modal>
      )}
    </>
  );
}

export default ReservationModal;
