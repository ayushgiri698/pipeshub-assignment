import { configureStore } from '@reduxjs/toolkit';
import lawyerReducer from './lawyerSlice';

export const store = configureStore({
  reducer: {
    lawyers: lawyerReducer,
  },
});

{/*  developed by AYUSH GIRI
     ayushgiri698@gmail.com
     contact : 9914165162 
  
*/}