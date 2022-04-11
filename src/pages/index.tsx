import { NextPage } from 'next';

import { DefaultLayout } from '../components/layouts/DefaultLayout';

const HomePage: NextPage = () => {
	return (
		<DefaultLayout title="Home">
			<div>hi</div>
		</DefaultLayout>
	);
};

export default HomePage;
