import { Field, Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import Router from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

import { useAppDispatch } from '../../app/hooks';
import { DefaultLayout } from '../../components/layouts/DefaultLayout';
import { setAuth } from '../../features/auth/auth.slice';
import { useRegisterMutation } from '../../features/user/user.api';
import { User } from '../../models/User';

export interface RegisterPayload {
	username: string;
	password: string;
	referralCode: string;
}

const RegisterSchema = Yup.object().shape({
	username: Yup.string().min(4, "Username is too short!").required("Required"),
	password: Yup.string().min(8, "Password is too short!").required("Required"),
	referralCode: Yup.string()
		.length(8, "Referral code must be 8 characters!")
		.required("You must be invited to join!"),
});

const RegisterPage: NextPage = () => {
	const [register] = useRegisterMutation();
	const dispatch = useAppDispatch();

	const [serverError, setServerError] = useState("");

	return (
		<DefaultLayout title="Register">
			<Formik
				initialValues={{ username: "", password: "", referralCode: "" }}
				validationSchema={RegisterSchema}
				onSubmit={(
					values: RegisterPayload,
					{ setSubmitting }: FormikHelpers<RegisterPayload>
				) => {
					setTimeout(async () => {
						const res = (await register(values)) as {
							data?: User;
							error: { statusCode: number; message: string; error: string };
						};

						if (res.error) {
							setServerError("Invalid credentials!");
						}

						if (res.data) {
							dispatch(setAuth({ user: res.data }));

							Router.push("/");
						}

						setSubmitting(false);
					}, 1000);
				}}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form className="w-1/6 h-1/3 flex justify-evenly items-center flex-col">
						<h1 className="text-4xl">Register</h1>

						<div className="w-full">
							<Field
								type="text"
								name="username"
								className="input input-bordered w-full"
								placeholder="Username"
							/>
							{errors.username && touched.username ? (
								<div className="text-error">{errors.username}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="password"
								name="password"
								className="input input-bordered w-full"
								placeholder="Password"
							/>
							{errors.password && touched.password ? (
								<div className="text-error">{errors.password}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="text"
								name="referralCode"
								className="input input-bordered w-full"
								placeholder="Referral Code"
							/>
							{errors.referralCode && touched.referralCode ? (
								<div className="text-error">{errors.referralCode}</div>
							) : null}
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className={`btn ${isSubmitting ? "loading" : ""}`}
						>
							Register
						</button>

						{serverError && (
							<div className="text-error">
								<p>{serverError}</p>
							</div>
						)}
					</Form>
				)}
			</Formik>
		</DefaultLayout>
	);
};

export default RegisterPage;
