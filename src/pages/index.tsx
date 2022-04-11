import { NextPage } from 'next';
import Link from 'next/link';

import { DefaultLayout } from '../components/layouts/DefaultLayout';

const HomePage: NextPage = () => {
	return (
		<DefaultLayout title="Home">
			<div>hi</div>

			<Link href={"auth/login"}>
				<button className="btn btn-primary">Login</button>
			</Link>
		</DefaultLayout>
	);
};

export default HomePage;
