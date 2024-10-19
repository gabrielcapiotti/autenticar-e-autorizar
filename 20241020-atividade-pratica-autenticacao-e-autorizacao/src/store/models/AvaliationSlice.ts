import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doGet, doPost, doPut } from '../../services/api';

export interface AvaliationType {
  email: string;
  module: string;
  grade: string;
}

const initialState: AvaliationType[] = [];

export const postAvaliations = createAsyncThunk(
  'avaliation/postAvaliations',
  async (data: AvaliationType, token: string) => {
    const response = await doPost('/avaliations', token, data);

    if (response) {
      return response;
    }

    return [];
  },
);

export const getAvaliations = createAsyncThunk('avaliation/getAvaliations', async (token: string) => {
  const response = await doGet('/avaliations', token);

  if (response) {
    return response;
  }

  return [];
});

export const updateAvaliations = createAsyncThunk(
  'avaliation/updateAvaliations',
  async (data: AvaliationType, token: string, id: string) => {
    console.log('ID', id);
    console.log('TOKEN', token);
    console.log('DATA', data);

    const response = await doPut(`/avaliations/${data.id}`, data.token, data);

    if (response) {
      return response;
    }

    return [];
  },
);

const AvaliationSlice = createSlice({
  name: 'avaliationPost',
  initialState: { avaliations: initialState, loading: false, success: false },
  reducers: {
    avaliations: (state, action: PayloadAction<AvaliationType>) => {
      state.avaliations.push({ ...action.payload });
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(postAvaliations.fulfilled, (state, action) => {
      state.avaliations.push({ ...action.payload });
      state.loading = false;
      return state;
    });
    builder.addCase(postAvaliations.rejected, (state, action) => {
      console.log(action.error);
      state.loading = false;
      return state;
    });
    builder.addCase(postAvaliations.pending, state => {
      state.loading = true;
      return state;
    });
    builder.addCase(getAvaliations.fulfilled, (state, action) => {
      state.avaliations = action.payload;
      state.loading = false;
      return state;
    });
    builder.addCase(getAvaliations.rejected, (state, action) => {
      console.log(action.error);
      state.loading = false;
      return state;
    });
    builder.addCase(getAvaliations.pending, state => {
      state.loading = true;
      return state;
    });
    builder.addCase(updateAvaliations.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      return state;
    });
    builder.addCase(updateAvaliations.rejected, (state, action) => {
      console.log(action.error);
      state.loading = false;
      return state;
    });
    builder.addCase(updateAvaliations.pending, state => {
      state.loading = true;
      return state;
    });
  },
});

export const { avaliations } = AvaliationSlice.actions;
export default AvaliationSlice.reducer;
