import { NextPage } from 'next';
import Link from 'next/link';

import { useAppDispatch } from '../app/hooks';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { useLogoutMutation } from '../features/auth/auth.api';
import { setAuth } from '../features/auth/auth.slice';

const HomePage: NextPage = () => {
	const [logout] = useLogoutMutation();

	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await logout(null);
		dispatch(setAuth({}));
	};

	return (
		<DefaultLayout title="Home">
			<Link href={"auth/login"}>
				<button className="btn btn-primary">Login</button>
			</Link>

			<button className="btn btn-primary" onClick={handleLogout}>
				Logout
			</button>
		</DefaultLayout>
	);
};

export default HomePage;
