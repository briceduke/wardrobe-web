import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../models/User';
import { LoginPayload } from '../../pages/auth/login';

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:6969/" }),
	endpoints: (builder) => ({
		login: builder.mutation<User, LoginPayload>({
			query: (loginReq) => ({
				url: "/auth/login",
				method: "POST",
				body: loginReq,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi;
