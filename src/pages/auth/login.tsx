import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import Router from 'next/router';
import * as Yup from 'yup';

import { useAppDispatch } from '../../app/hooks';
import { DefaultLayout } from '../../components/layouts/DefaultLayout';
import { useLoginMutation } from '../../features/auth/auth.api';
import { setAuth } from '../../features/auth/auth.slice';
import { User } from '../../models/User';

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email!").required("Required"),
	password: Yup.string().min(8, "Password is too short!").required("Required"),
});

const LoginPage: NextPage = () => {
	const [login] = useLoginMutation();
	const dispatch = useAppDispatch();

	return (
		<DefaultLayout title="Login">
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={LoginSchema}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(async () => {
						const res = (await login(values)) as { data: User };

						dispatch(setAuth({ user: res.data }));

						Router.push("/");

						setSubmitting(false);
					}, 1000);
				}}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form className="w-1/6 h-1/3 flex justify-evenly items-center flex-col">
						<h1 className="text-4xl">Login</h1>

						<div className="w-full">
							<Field
								type="email"
								name="email"
								className="input input-bordered w-full"
							/>
							{errors.email && touched.email ? (
								<div className="text-error">{errors.email}</div>
							) : null}
						</div>

						<div className="w-full">
							<Field
								type="password"
								name="password"
								className="input input-bordered w-full"
							/>
							{errors.password && touched.password ? (
								<div className="text-error">{errors.password}</div>
							) : null}
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className={`btn ${isSubmitting ? "loading" : ""}`}
						>
							Login
						</button>
					</Form>
				)}
			</Formik>
		</DefaultLayout>
	);
};

export default LoginPage;
