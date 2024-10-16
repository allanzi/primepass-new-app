import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '@PrimePassCinema/prime-connector';
import {VerifyLoginParams} from '@PrimePassCinema/prime-connector/dist/services/api/login/login';

import {UserState, SignupPayload} from './types';
import {RootState} from '../..';

export interface VerifyLoginPayload {
  email: string;
  phone?: string;
}

export const verifyLogin = createAsyncThunk(
  'verifyLogin',
  async ({phone}: VerifyLoginPayload, {rejectWithValue}) => {
    try {
      const {
        data: {found, phone: responsePhone},
      }: any = await API.verifyLogin({phone});

      if (found) {
        const payload: any = {phone: responsePhone, type: 'sms'};

        const {
          data: {data},
        } = await API.verify(payload);
        return {
          phone: responsePhone,
          period: data.period,
        };
      }

      return rejectWithValue({
        type: 'phone',
        message: 'Usuário não encontrado',
      });
    } catch (error: any) {
      if (error.response.status === 500) {
        return rejectWithValue({
          type: 'phone',
          message: 'Tente novamente mais tarde',
        });
      }

      if (error.response.data.error.details) {
        return rejectWithValue({
          message: error.response.data.error.details,
        });
      }

      return rejectWithValue({
        type: 'email',
        message: error.response.data.error.message,
      });
    }
  },
);

export const verifySignup = createAsyncThunk(
  'verifySignup',
  async ({email, phone}: VerifyLoginPayload, {rejectWithValue}) => {
    try {
      const {
        data: {found},
      } = await API.verifyLogin({phone});

      if (found) {
        return rejectWithValue({
          type: 'phone',
          message: 'Telefone já utilizado',
        });
      }

      const payload: any = {email, phone, type: 'sms'};

      const {
        data: {
          data: {period},
        },
      } = await API.verify(payload);
      return {
        email,
        phone,
        period,
      };
    } catch (error: any) {
      if (error.response.status === 500) {
        return rejectWithValue({
          type: 'phone',
          message: 'Tente novamente mais tarde',
        });
      }
      return rejectWithValue({
        type: 'phone',
        message: error.response.data.error.message,
      });
    }
  },
);

export const verifyExists = createAsyncThunk(
  'verifyExists',
  async (payload: VerifyLoginParams, {rejectWithValue}) => {
    try {
      const {
        data: {found},
      } = await API.verifyLogin(payload);

      return {
        found,
      };
    } catch (error: any) {
      if (error.response.status === 500) {
        return rejectWithValue({
          type: 'email',
          message: 'Tente novamente mais tarde',
        });
      }

      return rejectWithValue({
        type: 'email',
        message: error.response.data.error.message,
      });
    }
  },
);

export const login = createAsyncThunk(
  'login',
  async (token: string, {getState, rejectWithValue}) => {
    try {
      const {
        user: {
          user: {phone},
        },
      } = getState() as RootState;
      const {
        data: {data},
      } = await API.login({phone, token});

      return data;
    } catch (error: any) {
      if (error.response.status === 500) {
        return rejectWithValue({
          type: 'email',
          message: 'Tente novamente mais tarde',
        });
      }

      return rejectWithValue({
        type: 'code',
        message: error.response.data.error.message,
      });
    }
  },
);

export const signup = createAsyncThunk(
  'signup',
  async (
    {name, document, phone, token}: SignupPayload,
    {getState, rejectWithValue},
  ) => {
    try {
      const {
        user: {
          user: {email},
        },
      } = getState() as RootState;

      const {
        data: {data},
      } = await API.signup({name, document, email, phone, token});

      return data;
    } catch (error: any) {
      if (error.response.status === 500) {
        return rejectWithValue({
          type: 'email',
          message: 'Tente novamente mais tarde',
        });
      }

      if (error.response.data.error.details) {
        return rejectWithValue({
          message: error.response.data.error.details,
        });
      }

      return rejectWithValue({
        type: 'phone',
        message: error.response.data.error.message,
      });
    }
  },
);

const initialState: UserState = {
  error: null,
  loadingIdentifier: false,
  loadingCode: false,
  loadingVerify: false,
  period: 0,
  user: {
    id: '',
    name: '',
    phone: '',
    email: '',
    document: '',
  },
  auth: {
    token: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = initialState.user;
      state.auth = initialState.auth;
    },
  },
  extraReducers: builder => {
    builder.addCase(verifyLogin.pending, state => {
      state.loadingIdentifier = true;
      state.error = null;
    });
    builder.addCase(verifyLogin.rejected, (state, {payload}: any) => {
      state.error = payload;
      state.user.email = '';
      state.user.phone = '';
      state.loadingIdentifier = false;
    });
    builder.addCase(verifyLogin.fulfilled, (state, {payload}) => {
      state.user.email = payload.email;
      state.user.phone = payload.phone;
      state.error = null;
      state.loadingIdentifier = false;
      state.period = payload.period;
    });

    builder.addCase(verifySignup.pending, state => {
      state.loadingIdentifier = true;
      state.error = null;
    });
    builder.addCase(verifySignup.rejected, (state, {payload}: any) => {
      state.error = payload;
      state.user.email = '';
      state.user.phone = '';
      state.loadingIdentifier = false;
    });
    builder.addCase(verifySignup.fulfilled, (state, {payload}) => {
      state.user.email = payload.email;
      state.error = null;
      state.loadingIdentifier = false;
      state.period = payload.period;
    });

    builder.addCase(verifyExists.pending, state => {
      state.loadingVerify = true;
      state.error = null;
    });
    builder.addCase(verifyExists.rejected, (state, {payload}: any) => {
      state.error = payload;
      state.loadingVerify = false;
    });
    builder.addCase(verifyExists.fulfilled, (state, {}) => {
      state.error = null;
      state.loadingVerify = false;
    });

    builder.addCase(login.pending, state => {
      state.loadingCode = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, {payload}: any) => {
      state.error = payload;
      state.loadingCode = false;
    });
    builder.addCase(login.fulfilled, (state, {payload}) => {
      state.loadingCode = false;
      state.user.id = payload.user.id;
      state.user.name = payload.user.name;
      state.user.document = payload.user.document ?? '';
      state.auth.token = payload?.auth.token;
      state.error = null;
    });

    builder.addCase(signup.pending, state => {
      state.loadingCode = true;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, {payload}: any) => {
      state.error = payload;
      state.loadingCode = false;
    });
    builder.addCase(signup.fulfilled, (state, {payload}) => {
      state.user.id = payload.user.id;
      state.user.name = payload.user.name;
      state.user.document = payload.user.document ?? '';
      state.auth.token = payload?.auth.token;
      state.error = null;
      state.loadingCode = false;
    });
  },
});

export const {clearError, logout} = userSlice.actions;
export default userSlice.reducer;
