import Head from 'next/head';

import { DefaultLayoutProps } from './props';

export const DefaultLayout = ({
	children,
	description,
	title,
}: DefaultLayoutProps) => {
	return (
		<>
			<Head>
				<title>Wardrobe | {title}</title>
			</Head>

			<div className="flex items-center justify-center w-screen h-screen">
				{children}
			</div>
		</>
	);
};
