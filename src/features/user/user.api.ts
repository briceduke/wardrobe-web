import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../models/User';
import { RegisterPayload } from '../../pages/auth/register';

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/users" }),
	endpoints: (builder) => ({
		register: builder.mutation<User, RegisterPayload>({
			query: (registerReq) => ({
				url: "/",
				method: "POST",
				body: registerReq,
			}),
		}),
	}),
});

export const { useRegisterMutation } = userApi;
