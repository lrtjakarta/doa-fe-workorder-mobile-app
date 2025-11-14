import {
	ArrowBackIosNewRounded,
	ChevronLeft,
	ChevronRight,
} from '@mui/icons-material';
import {
	Box,
	Button,
	Grid,
	IconButton,
	Stepper,
	Typography,
} from '@mui/material';
import { useWorkOrder } from 'Context/WorkOrder';
import UseMedical from 'Hooks/Auth/Medical/useMedical';
import moment from 'moment';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import useQuery from 'Utils/QueryParams';

const StatusCondition = ({ status }) => {
	let bgcolor, label;

	switch (status) {
		case '1':
			bgcolor = '#28A745';
			label = 'Fit To Work';
			break;
		case '2':
			bgcolor = '#DCA815';
			label = 'Fit To Work With Note';
			break;
		case '3':
			bgcolor = '#ED1C24';
			label = 'Unfit To Work';
			break;

		default:
			bgcolor = 'ababab';
			label = 'Belum diperiksa';
			break;
	}

	return (
		<Box
			sx={{
				bgcolor,
				width: '100%',
				height: 40,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography sx={{ fontSize: 20, fontWeight: '500', color: '#fff' }}>
				{label}
			</Typography>
		</Box>
	);
};

const MedicalResult = () => {
	const {
		activeStep,
		handleBack,
		handleNext,
		getDetailDataCheckup,
		detailCheckup,
	} = UseMedical();

	const { getProfileByUser } = useWorkOrder();

	const query = useQuery();

	const id = query.get('id');
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [createByData, setCreateByData] = useState({});

	useEffect(() => {
		getDetailDataCheckup(id);
	}, []);

	useEffect(() => {
		if (detailCheckup?.createBy?._id) {
			getProfileByUser(detailCheckup?.createBy?._id)
				.then(data => {
					console.log('data pembuat', data);
					setCreateByData(data);
				})
				.catch(err => console.log(err))
				.finally(() => setLoading(false));
		}
	}, [detailCheckup?.createBy, getProfileByUser]);

	// useEffect(() => {
	// 	if (detailCheckup?.createBy?._id) {
	// 		const data = getProfileByUser(detailCheckup?.createBy?._id);
	// 		console.log('data pembuat', data);
	// 		setCreateByData(data);
	// 		setLoading(false);
	// 	}
	// }, [detailCheckup?.createBy]);

	if (loading) return null;

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<IconButton color="secondary" onClick={() => navigate(-1)}>
						<ArrowBackIosNewRounded sx={{ fontSize: 20 }} />
					</IconButton>
					<Typography
						sx={{ textAlign: 'center', flex: 1, fontWeight: 600 }}
						variant="body1"
					>
						Detail Riwayat Pemeriksaan Kesehatan
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ color: 'primary.greyFont', fontSize: 10, mr: 1 }}>
					Waktu Pemeriksaan
				</Typography>
				<Typography sx={{ fontSize: { md: 16, xs: 12 }, fontWeight: 600 }}>
					{moment(detailCheckup?.createdAt).format('DD MMMM YYYY')}
				</Typography>
				<Typography sx={{ fontSize: { md: 16, xs: 12 }, fontWeight: 600 }}>
					{moment(detailCheckup?.createdAt).format('HH:mm')} -{' '}
					{moment(detailCheckup?.finishAt).format('HH:mm')} WIB
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ color: 'primary.greyFont', fontSize: 10, mr: 1 }}>
					Durasi
				</Typography>
				<Typography sx={{ fontSize: { md: 16, xs: 12 }, fontWeight: 600 }}>
					{Math.floor(
						moment(detailCheckup?.finishAt).diff(
							moment(detailCheckup?.createdAt),
							'seconds'
						) / 60
					) +
						' Menit ' +
						(moment(detailCheckup?.finishAt).diff(
							moment(detailCheckup?.createdAt),
							'seconds'
						) %
							60) +
						' detik'}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<StatusCondition status={detailCheckup.status} />
			</Grid>
			<Grid item xs={12}>
				<Stepper activeStep={activeStep}></Stepper>
				{detailCheckup?.mrData?.map((item, index) => {
					if (index === activeStep) {
						return (
							<>
								<Box
									sx={{
										width: '100%',
										backgroundColor: '#464748',
										display: 'flex',
										padding: '3px 20px',
										textAlign: 'left',
									}}
								>
									<Typography
										sx={{ fontSize: 14, fontWeight: '500', color: '#fff' }}
									>
										{item?.dataDetails[0]?.category?.name}
									</Typography>
								</Box>
								{item?.dataDetails?.map((itemIsi, indexIsi) => (
									<Box
										sx={{
											width: '100%',
											backgroundColor:
												indexIsi % 2 == 1 ? '#E5E5E5' : '#F2F2F2',
											height: 60,
											padding: '7px 20px',
										}}
									>
										<Grid container>
											<Grid item xs={7}>
												<Typography sx={{ fontSize: 10, fontWeight: 'bold' }}>
													{itemIsi.name}
												</Typography>
												<Typography sx={{ fontSize: 10, fontStyle: 'italic' }}>
													{itemIsi.note ? itemIsi.note : '-'}
												</Typography>
											</Grid>
											<Grid
												item
												xs={5}
												sx={{ display: 'flex', justifyContent: 'flex-end' }}
											>
												<Typography sx={{ fontSize: 10, fontWeight: 'bold' }}>
													{itemIsi?.answer?.value}
												</Typography>
												<Typography
													sx={{
														color: 'primary.greyFont',
														fontSize: 10,
														mr: 1,
													}}
												>
													{itemIsi?.unit?.value}
												</Typography>
											</Grid>
										</Grid>
									</Box>
								))}
							</>
						);
					}
				})}
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						margin: '10px 0',
					}}
				>
					<Box sx={{ mb: 1, pl: 1, pr: 1 }}>
						{detailCheckup?.soap && detailCheckup?.soap?.anamnesis ? (
							<Box sx={{ mt: 1 }}>
								<Box sx={{ marginBottom: 5 }}>
									<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
										Anamnesis
									</Typography>
									<Typography sx={{ fontSize: 14, fontWeight: 400 }}>
										{detailCheckup?.soap?.anamnesis}
									</Typography>
								</Box>

								<Box sx={{ marginTop: 5, marginBottom: 5 }}>
									<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
										Pemeriksaan Fisik
									</Typography>
									<Typography
										sx={{ fontSize: 14 }}
										dangerouslySetInnerHTML={{
											__html: `${detailCheckup?.soap?.physical}`,
										}}
									></Typography>
								</Box>
								<Box sx={{ marginTop: 5, marginBottom: 5 }}>
									<Typography sx={{ fontSize: 16, fontWeight: 'bol d' }}>
										Diagnosis
									</Typography>
									{detailCheckup?.soap?.diagnosis.map((item, i) => (
										<Typography key={i} sx={{ fontSize: 14, fontWeight: 400 }}>
											{item.name}
										</Typography>
									))}
								</Box>

								<Box sx={{ marginTop: 5, marginBottom: 5 }}>
									<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
										Farmakologi / Non Farmakologi
									</Typography>
									<Typography
										sx={{ fontSize: 14 }}
										dangerouslySetInnerHTML={{
											__html: `${detailCheckup?.soap?.pharmacology}`,
										}}
									></Typography>
								</Box>
							</Box>
						) : null}
					</Box>
					<Box>
						{activeStep == 1 ? (
							<Button
								sx={{
									backgroundColor: '#BB7E36',
									borderRadius: 3,
									p: '2px 1px',
								}}
								onClick={handleBack}
							>
								<ChevronLeft sx={{ fontSize: 25, color: '#fff' }} />
							</Button>
						) : null}
						{activeStep == 0 ? (
							<Button
								sx={{
									backgroundColor: '#BB7E36',
									borderRadius: 3,
									p: '2px 1px',
								}}
								onClick={handleNext}
							>
								<ChevronRight sx={{ fontSize: 25, color: '#fff' }} />
							</Button>
						) : null}
					</Box>
				</Box>
			</Grid>
			<Grid
				item
				xs={6}
				sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
			>
				<p
					align="center"
					sx={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}
				>
					Masinis
				</p>
				<p align="center">
					{detailCheckup?.profile?.idNumber ? (
						<QRCode
							value={
								detailCheckup?.profile?.idNumber
									? detailCheckup?.profile?.idNumber
									: '-'
							}
							size={100}
						/>
					) : (
						''
					)}
				</p>
				<p align="center">
					{detailCheckup?.profile?.name}
					<br />
					NIK : {detailCheckup?.profile?.idNumber}
				</p>
			</Grid>
			<Grid
				item
				xs={6}
				sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
			>
				<p align="center">Petugas Pemeriksa</p>
				<p align="center">
					{detailCheckup?.createBy?._id ? (
						<QRCode
							value={
								detailCheckup?.createBy?._id
									? detailCheckup?.createBy?._id
									: '-'
							}
							size={100}
						/>
					) : (
						''
					)}
				</p>
				<p align="center">
					{createByData?.name}
					<br />
					NIK : {createByData?.idNumber}
				</p>
			</Grid>
			{/* <Grid item xs={5}>
				<p
					align="center"
					sx={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}
				>
					Masinis
				</p>
				<p align="center">
					{detailCheckup?.trainDriver?.idNumber ? (
						<QRCode
							value={
								detailCheckup?.trainDriver?.idNumber
									? detailCheckup?.trainDriver?.idNumber
									: '-'
							}
							size={80}
						/>
					) : (
						''
					)}
				</p>
				<p align="center" sx={{ fontSize: 11 }}>
					{detailCheckup?.trainDriver?.name}
					<br />
					{detailCheckup?.trainDriver?.idNumber}
				</p>
			</Grid> */}
			{/* <Grid
        item
        xs={2}
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>
          esign
        </Typography>
      </Grid> */}
			{/* <Grid item xs={5}>
				<p
					align="center"
					sx={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}
				>
					Petugas Pemeriksa
				</p>
				<p align="center">
					{createByData?.idNumber ? (
						<QRCode
							value={createByData?.idNumber ? createByData?.idNumber : '-'}
							size={80}
						/>
					) : (
						''
					)}
				</p>
				<p align="center" sx={{ fontSize: 11 }}>
					{detailCheckup?.createBy?.name}
					<br />
					{createByData?.idNumber}
				</p>
			</Grid> */}
			<Grid item xs={12}></Grid>
		</Grid>
	);
};

export default MedicalResult;
