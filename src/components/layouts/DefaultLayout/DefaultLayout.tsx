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

			<>{children}</>
		</>
	);
};
