import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../models/User';

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:6969/" }),
	endpoints: (builder) => ({
		login: builder.mutation<User, { email: string; password: string }>({
			query: (loginReq) => ({
				url: "/auth/login",
				method: "POST",
				body: loginReq,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi;
