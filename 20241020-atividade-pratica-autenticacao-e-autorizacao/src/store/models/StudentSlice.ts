import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doPost } from '../../services/api';

export interface StudentType {
  email: string;
  password: string;
}

const initialState: StudentType[] = [];

export const postStudent = createAsyncThunk('student/loginStudent', async (data: StudentType) => {
  const response = await doPost('/auth', '', data);

  if (response) {
    return response;
  }

  return [];
});

const StudentSlice = createSlice({
  name: 'studentLogin',
  initialState: { student: initialState, loading: false, token: '' },
  reducers: {
    loginStudent: (state, action: PayloadAction<StudentType>) => {
      state.student.push({ ...action.payload });
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(postStudent.fulfilled, (state, action) => {
      state.student = action.payload;
      state.loading = false;
      state.token = action.payload.data.token;
      return state;
    });
    builder.addCase(postStudent.rejected, (state, action) => {
      console.log(action.error);
      state.loading = false;
      return state;
    });
    builder.addCase(postStudent.pending, state => {
      state.loading = true;
      return state;
    });
  },
});

export const { loginStudent } = StudentSlice.actions;
export default StudentSlice.reducer;
