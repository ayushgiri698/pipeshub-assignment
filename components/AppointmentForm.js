import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bookAppointment } from '../redux/lawyerSlice';

const AppointmentForm = ({ lawyer }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(bookAppointment({ date, time, lawyer }));
    setDate('');
    setTime('');

    // Show notification for 3 seconds
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const availableDates = lawyer.availableDates;
  const availableTimes = lawyer.availableTimes;

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
  };

  return (
    <div className="appointment-form">
      {showNotification && (
        <div className="notification">
          Appointment booked successfully with {lawyer.name}!
        </div>
      )}
      <h3>Book Appointment with {lawyer.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={handleDateChange}
            required
            min={availableDates[0]}
            max={availableDates[availableDates.length - 1]}
          />
        </div>

        {/* Display time slots as selectable buttons */}
        {date && (
          <div className="mb-3">
            <label className="form-label">Available Time Slots</label>
            <div className="btn-group d-flex flex-wrap">
              {availableTimes.map((availableTime, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn ${time === availableTime ? 'btn-primary' : 'btn-outline-secondary'} mx-2 mb-2`}
                  onClick={() => handleTimeSelect(availableTime)}
                  disabled={time && time !== availableTime}
                >
                  {availableTime}
                </button>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={!time}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
