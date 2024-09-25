import React, { useState } from 'react';
import LawyerList from './components/LawyerList';
import AppointmentForm from './components/AppointmentForm';
import AppointmentHistoryPage from './components/AppointmentHistoryPage.js'; // New component
import { Modal, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components

const App = () => {
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleCloseBookingModal = () => setShowBookingModal(false);
  const handleShowBookingModal = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowBookingModal(true);
  };

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <LawyerList onSelectLawyer={handleShowBookingModal} />
              </div>
            }
          />
          <Route path="/history/:lawyerId" element={<AppointmentHistoryPage />} />
        </Routes>
      </div>

      {/* Booking Modal */}
      {selectedLawyer && (
        <Modal show={showBookingModal} onHide={handleCloseBookingModal} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Book Appointment with {selectedLawyer.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AppointmentForm lawyer={selectedLawyer} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseBookingModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Router>
  );
};

export default App;
