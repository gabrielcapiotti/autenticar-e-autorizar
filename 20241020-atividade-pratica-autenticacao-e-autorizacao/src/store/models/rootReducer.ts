import { combineReducers } from '@reduxjs/toolkit';
import StudentSlice from './StudentSlice';
import AvaliationSlice from './AvaliationSlice';

export default combineReducers({
  studentLogin: StudentSlice,
  avaliation: AvaliationSlice,
});
