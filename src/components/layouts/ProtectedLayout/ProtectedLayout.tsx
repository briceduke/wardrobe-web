import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/auth/auth.slice';
import { DefaultLayout, DefaultLayoutProps } from '../DefaultLayout';

export const ProtectedLayout = ({
	children,
	title,
	description,
}: DefaultLayoutProps) => {
	const user = useAppSelector((state) => selectUser(state));

	if (user) {
		return (
			<DefaultLayout title={title} description={description}>
				{children}
			</DefaultLayout>
		);
	}
};
