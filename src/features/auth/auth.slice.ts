import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { User } from '../../models/User';

interface AuthState {
	user?: User;
}

const initialState: AuthState = {};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, payload: PayloadAction<AuthState>) => {
			{
				state.user = payload.payload.user;
			}
		},
	},
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
