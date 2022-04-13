import { NextPage } from 'next';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { useLogoutMutation } from '../features/auth/auth.api';
import { setAuth } from '../features/auth/auth.slice';

const HomePage: NextPage = () => {
	const { user } = useAppSelector((state) => state.auth);
	const [logout] = useLogoutMutation();

	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await logout(null);
		dispatch(setAuth({}));
	};

	return (
		<DefaultLayout title="Home">
			{user && (
				<div className="flex flex-col justify-evenly items-center w-1/4 h-1/4">
					<h1 className="text-2xl">Your referral code: {user.referralCode}</h1>
					<p>{user.referralUses} uses left</p>

					<button className="btn btn-primary" onClick={handleLogout}>
						Logout
					</button>
				</div>
			)}

			{!user && (
				<>
					<Link href={"auth/login"}>
						<button className="btn btn-primary">Login</button>
					</Link>

					<Link href={"auth/register"}>
						<button className="btn btn-primary">Register</button>
					</Link>
				</>
			)}
		</DefaultLayout>
	);
};

export default HomePage;
