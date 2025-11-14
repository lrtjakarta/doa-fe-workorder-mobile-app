import {
	Badge,
	Box,
	Card,
	Divider,
	Grid,
	Link,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import CardProfile from 'page-sections/Home/cardProfile';
import { decodeToken } from 'react-jwt';

import { useNavigate } from 'react-router-dom';

// custom icons
import AssessmentIcon from 'Component/Icons/Assessment';
import CalendarIcon from 'Component/Icons/Calendar';
import HealthIcon from 'Component/Icons/Health';
import LogbookIcon from 'Component/Icons/Logbook';
import PaidLeaveChangeIcon from 'Component/Icons/PaidLeaveChange';
import TargetIcon from 'Component/Icons/Target';
import WorkOrderIcon from 'Component/Icons/WorkOrder';
import WorkOrderChangeIcon from 'Component/Icons/WorkOrderChange';
import WorkOrderConfirmIcon from 'Component/Icons/WorkOrderConfirm';
import { WorkOrderContext } from 'Context';
import { AssesmentContext } from 'Context/Assesment';
import moment from 'moment';
import CardContent from 'page-sections/Home/cardContent';
import { useContext, useEffect } from 'react';

// token
const decodedToken = decodeToken(localStorage.getItem('access_token'));

const menus = [
	{
		id: 1,
		name: 'Jadwal Bulanan',
		icon: CalendarIcon,
		link: '/app/work-order/monthly',
	},
	{
		id: 2,
		name: 'Jadwal Harian',
		icon: WorkOrderIcon,
		link: '/app/work-order/daily',
	},
	{
		id: 3,
		name: 'Konfirmasi Dinas',
		icon: WorkOrderConfirmIcon,
		link: '/app/work-order/confirmation',
	},
	{
		id: 4,
		name: 'Tukar Dinas',
		icon: WorkOrderChangeIcon,
		badge: true,
		key: 'active',
		link: '/app/work-order/swap/work-order',
	},
	{
		id: 5,
		name: 'Tukar Libur',
		icon: PaidLeaveChangeIcon,
		badge: true,
		key: 'off',
		link: '/app/work-order/swap/off',
	},
	{
		id: 6,
		name: 'Buku Saku',
		icon: LogbookIcon,
		link: '/app/assesment/pocket-book',
	},
];

const aspMenus = [
	{
		id: 7,
		name: 'Status Kesehatan',
		icon: HealthIcon,
		link: '/app/medical',
	},
	{
		id: 8,
		name: 'Penilaian',
		icon: AssessmentIcon,
		link: '/app/assesment',
	},
	{
		id: 9,
		name: 'Pencapaian',
		icon: TargetIcon,
		link: '/app/assesment/achievment',
	},
];

const allowedASPMenus = ['662773cd84d37c2a2f2431f1'];

export default function Home() {
	const navigate = useNavigate();
	const theme = useTheme();

	// context
	const { contents, getContents } = useContext(AssesmentContext);
	const { user, profileById, notificationSwaps, getNotificationSwaps } =
		useContext(WorkOrderContext);

	// fetch data
	useEffect(() => {
		const params = {
			status: 'Publish',
			departement: user.departement, // after
		};
		getContents(params);
	}, []);

	useEffect(() => {
		if (user._id) {
			getNotificationSwaps({
				date: moment().format('YYYY-MM-DD'),
				profileId: user.profileId,
			});
		}

		return () => {};
	}, [user]);

	const isASPUser = allowedASPMenus.includes(user?.departement);

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				gap: 2,
				py: 1,
				flexDirection: 'column',
				// justifyContent: "center",
				overflowY: 'auto',
				alignItems: 'center',
			}}
		>
			<CardProfile />
			<Divider
				sx={{ bgcolor: theme.palette.primary.main, width: 100, height: '2px' }}
			/>
			<Grid container spacing={2}>
				{menus.map(item => {
					let badgeContent = 0;
					const value = notificationSwaps[item.key];
					const hasNotification = item.badge && value;

					return (
						<Grid key={item.id} item xs={4}>
							<Link href={item.link} underline="none">
								{hasNotification ? (
									<Badge badgeContent={value} color="primary">
										<Card sx={{ p: 1, height: '100%' }}>
											<Stack
												spacing={1}
												justifyContent="center"
												alignItems="center"
											>
												<item.icon sx={{ fontSize: 40 }} />
												<Typography
													textAlign="center"
													fontSize={14}
													fontWeight={600}
												>
													{item.name}
												</Typography>
											</Stack>
										</Card>
									</Badge>
								) : (
									<Card sx={{ p: 1, height: '100%' }}>
										<Stack
											spacing={1}
											justifyContent="center"
											alignItems="center"
										>
											<item.icon sx={{ fontSize: 40 }} />
											<Typography
												textAlign="center"
												fontSize={14}
												fontWeight={600}
											>
												{item.name}
											</Typography>
										</Stack>
									</Card>
								)}
							</Link>
						</Grid>
					);
				})}

				{isASPUser &&
					aspMenus.map(item => {
						let badgeContent = 0;
						const value = notificationSwaps[item.key];
						const hasNotification = item.badge && value;

						return (
							<Grid key={item.id} item xs={4}>
								<Link href={item.link} underline="none">
									{hasNotification ? (
										<Badge badgeContent={value} color="primary">
											<Card sx={{ p: 1, height: '100%' }}>
												<Stack
													spacing={1}
													justifyContent="center"
													alignItems="center"
												>
													<item.icon sx={{ fontSize: 40 }} />
													<Typography
														textAlign="center"
														fontSize={14}
														fontWeight={600}
													>
														{item.name}
													</Typography>
												</Stack>
											</Card>
										</Badge>
									) : (
										<Card sx={{ p: 1, height: '100%' }}>
											<Stack
												spacing={1}
												justifyContent="center"
												alignItems="center"
											>
												<item.icon sx={{ fontSize: 40 }} />
												<Typography
													textAlign="center"
													fontSize={14}
													fontWeight={600}
												>
													{item.name}
												</Typography>
											</Stack>
										</Card>
									)}
								</Link>
							</Grid>
						);
					})}
			</Grid>
			<Divider
				sx={{ bgcolor: theme.palette.primary.main, width: 100, height: '2px' }}
			/>
			<Typography variant="h6">Konten</Typography>
			<Box sx={{ height: 'auto', width: '100%', overflowY: 'auto' }}>
				<Grid container spacing={1} py={1}>
					{contents.map((item, index) => (
						<Grid key={index} item xs={12}>
							<CardContent item={item} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
}
