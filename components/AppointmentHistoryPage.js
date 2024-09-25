import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Use params to fetch the lawyer ID
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa'; // Back icon from react-icons
import './AppointmentHistoryPage.css';

const AppointmentHistoryPage = () => {
  const { lawyerId } = useParams(); // Get lawyer ID from the route
  const lawyer = useSelector((state) =>
    state.lawyers.find((lawyer) => lawyer.id === parseInt(lawyerId))
  );

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <Link to="/" className="btn btn-outline-primary mb-3">
        <FaArrowLeft /> Back to Lawyer List
      </Link>

      {/* Heading */}
      <h2 className="text-white text-center mb-4">Appointment History for {lawyer?.name}</h2>

      {/* Appointment History */}
      {lawyer?.appointments.length > 0 ? (
        <div className="row justify-content-center">
          {lawyer.appointments.map((appointment, index) => (
            <div className="col-md-8 mb-3" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-calendar-check"></i> {appointment.date}
                  </h5>
                  <p className="card-text">Time: {appointment.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center">
          <i className="fas fa-info-circle"></i> No appointments yet
        </div>
      )}
    </div>
  );
};

export default AppointmentHistoryPage;
