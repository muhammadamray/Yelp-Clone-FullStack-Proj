// import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
// import ReservationEdit from "./ReservationEdit";
// import "./index.css"

// function ReservationModal({ reservation }) {
//   // const reservation = reservation;

//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button className="edit-btn" onClick={() => setShowModal(true)}>Edit</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <ReservationEdit
//             setShowModal={setShowModal}
//             reservation={reservation}
//           />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default ReservationModal;
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReservationEdit from "./ReservationEdit";
import "./index.css";

function ReservationModal({ reservation }) {
  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Button to open the modal */}
      <button className="edit-btn" onClick={() => setShowModal(true)}>
        Edit
      </button>

      {/* Modal component that opens when showModal is true */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* ReservationEdit component rendered within the modal */}
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
