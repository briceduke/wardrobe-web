import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../models/User';
import { LoginPayload } from '../../pages/auth/login';
import { RegisterPayload } from '../../pages/auth/register';

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
	endpoints: (builder) => ({
		register: builder.mutation<User, RegisterPayload>({
			query: (registerReq) => ({
				url: '/register',
				method: 'POST',
				body: registerReq,
			})
		}),
		login: builder.mutation<User, LoginPayload>({
			query: (loginReq) => ({
				url: "/login",
				method: "POST",
				body: loginReq,
			}),
		}),
		logout: builder.mutation<null, null>({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
		}),
		isAuth: builder.query<boolean, null>({
			query: () => ({ url: "/" }),
		}),
	}),
});

export const { useLoginMutation, useIsAuthQuery, useLogoutMutation, useRegisterMutation } = authApi;
