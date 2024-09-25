import { createSlice } from '@reduxjs/toolkit';

const initialLawyers = [
  { 
    id: 1, name: 'John Doe', specialty: 'Criminal Lawyer', availability: 4, appointments: [], 
    availableDates: ['2024-09-25', '2024-09-26', '2024-09-27', '2024-09-28'],
    availableTimes: ['09:00 to 10:00', '11:00 to 12:00']
  },
  { 
    id: 2, name: 'Jane Smith', specialty: 'Divorce Lawyer', availability: 3, appointments: [],
    availableDates: ['2024-09-26', '2024-09-27', '2024-09-28'],
    availableTimes: ['10:00 to 11:00', '13:00 to 14:00']
  },
  { 
    id: 3, name: 'Robert Johnson', specialty: 'Property Lawyer', availability: 2, appointments: [],
    availableDates: ['2024-09-27', '2024-09-28'],
    availableTimes: ['09:00 to 10:00', '11:00 to 12:00']
  },
  { 
    id: 4, name: 'Emily Davis', specialty: 'Corporate Lawyer', availability: 5, appointments: [],
    availableDates: ['2024-09-25', '2024-09-26', '2024-09-27', '2024-09-28', '2024-09-29'],
    availableTimes: ['09:00 to 10:00', '10:00 to 11:00', '11:00 to 12:00']
  },
  { 
    id: 5, name: 'David Lee', specialty: 'Environmental Lawyer', availability: 1, appointments: [],
    availableDates: ['2024-09-25'],
    availableTimes: ['10:00 to 11:00']
  },
  { 
    id: 6, name: 'Megan Clark', specialty: 'Family Lawyer', availability: 0, appointments: [],
    availableDates: [],
    availableTimes: []
  }
];

export const lawyerSlice = createSlice({
  name: 'lawyers',
  initialState: initialLawyers,
  reducers: {
    bookAppointment: (state, action) => {
      const { lawyer, date, time } = action.payload;
      const selectedLawyer = state.find((l) => l.id === lawyer.id);
      if (selectedLawyer && selectedLawyer.availability > 0) {
        selectedLawyer.appointments.push({ date, time });
        selectedLawyer.availability -= 1;

        // Remove the booked date from available dates
        selectedLawyer.availableDates = selectedLawyer.availableDates.filter(
          (availableDate) => availableDate !== date
        );
      }
    },
  },
});

export const { bookAppointment } = lawyerSlice.actions;

export default lawyerSlice.reducer;
