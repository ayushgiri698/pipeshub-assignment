import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for routing
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal and Button
import './LawyerList.css';

const LawyerList = ({ onSelectLawyer }) => {
  const navigate = useNavigate();
  const lawyers = useSelector((state) => state.lawyers); // Access state.lawyers
  const [showErrorModal, setShowErrorModal] = useState(false); // State for error modal
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  const handleShowAppointments = (lawyer) => {
    navigate(`/history/${lawyer.id}`); // Navigate to the appointment history page
  };

  const handleSelectLawyer = (lawyer) => {
    if (lawyer.availability > 0) {
      onSelectLawyer(lawyer); // Proceed with selecting the lawyer
    } else {
      setErrorMessage('No available slots for this lawyer.'); // Set error message
      setShowErrorModal(true); // Show the error modal
    }
  };

  const handleCloseErrorModal = () => setShowErrorModal(false); // Close the modal

  return (
    <div className="container mt-5">
      <h1>LAWYER LIST</h1>
      <ul className="list-group">
        {lawyers.map((lawyer) => (
          <li
            key={lawyer.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong><i className="fas fa-user-tie"></i> {lawyer.name}</strong> - {lawyer.specialty}
              <span className="badge ms-2">Available Slots: {lawyer.availability}</span>
            </div>
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => handleSelectLawyer(lawyer)} // Check availability before selecting
              >
                <i className="fas fa-arrow-right"></i> Select
              </button>
              <button
                className="btn btn-outline-info"
                onClick={() => handleShowAppointments(lawyer)} // Navigate to appointment history
              >
                <i className="fas fa-calendar-alt"></i> Show Appointments
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LawyerList;
