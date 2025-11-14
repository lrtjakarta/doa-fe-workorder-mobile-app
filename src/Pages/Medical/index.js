import { ArrowBackIosNewRounded, Search } from '@mui/icons-material';
import {
	Box,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { useWorkOrder } from 'Context/WorkOrder';
import UseMedical from 'Hooks/Auth/Medical/useMedical';
import _ from 'lodash';
import moment from 'moment';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StatusCondition = ({ status }) => {
	let color, label;
	switch (status) {
		case '1':
			color = '#28A745';
			label = 'Fit To Work';
			break;
		case '2':
			color = '#DCA815';
			label = 'Fit To Work With Note';
			break;
		case '3':
			color = '#ED1C24';
			label = 'Unfit To Work';
			break;

		default:
			color = '#ababab';
			label = 'Belum diperiksa';
			break;
	}

	return (
		<Typography sx={{ fontWeight: 'bold', color: color, fontSize: 14 }}>
			{label}
		</Typography>
	);
};

const MedicalPage = () => {
	const navigate = useNavigate();
	const {
		checkupStatus,
		handleFilterMedicalStatus,
		dateMedical,
		filterCheckup,
		handleFilterDate,
		searchText,
		setDateMedical,
		handleChange,
		getDataCheckup,
	} = UseMedical();

	const { profileById } = useWorkOrder();

	useEffect(() => {
		if (dateMedical) {
			let createBy = profileById?.idNumber;
			getDataCheckup(createBy, dateMedical);
		} else {
			let createAt = moment().format('YYYY-MM');
			let createBy = profileById?.idNumber;
			getDataCheckup(createBy, createAt);
			setDateMedical(createAt);
		}
	}, [dateMedical]);

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
						Riwayat Pemeriksaan Kesehatan
					</Typography>
				</Box>
			</Grid>

			<Grid item xs={6}>
				<TextField
					size="small"
					fullWidth
					type="date"
					value={dateMedical}
					onChange={handleFilterDate}
					InputProps={{
						style: {
							width: '100%',
							fontSize: 12,
							height: 33,
							backgroundColor: '#fff',
							border: 'none',
							borderRadius: 7,
						},
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					size="small"
					fullWidth
					select
					label="Pilih Status"
					value={checkupStatus}
					onChange={e => {
						handleFilterMedicalStatus(e.target.value);
					}}
					InputProps={{
						style: {
							width: '100%',
							fontSize: 12,
							height: 33,
							backgroundColor: '#fff',
							border: 'none',
							borderRadius: 7,
						},
					}}
				>
					<MenuItem value={'10'}>Semua</MenuItem>
					<MenuItem value={'1'}>Fit to Work</MenuItem>
					<MenuItem value={'2'}>Fit to Work with Note</MenuItem>
					<MenuItem value="3">Unfit to Work</MenuItem>
				</TextField>
			</Grid>
			<Grid item xs={12}>
				<TextField
					fullWidth
					value={searchText}
					placeholder="Pencarian"
					onChange={e => handleChange(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<IconButton>
									<Search sx={{ fontSize: 15, color: 'gray' }} />
								</IconButton>
							</InputAdornment>
						),
						style: {
							width: '100%',
							fontSize: 12,
							height: 33,
							backgroundColor: '#fff',
							border: 'none',
							borderRadius: 7,
						},
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				{filterCheckup.length > 0 ? (
					_.orderBy(filterCheckup, ['createdAt'], ['desc']).map(
						(item, index) => (
							<Button
								component={Link}
								to={'/app/medical/result?id=' + item._id}
								sx={{
									flex: 1,
									display: 'flex',
									textTransform: 'none',
									p: 0,
									flexDirection: 'column',
								}}
							>
								<Paper
									sx={{
										padding: '10px 7px',
										marginBottom: '10px',
										flex: 1,
										flexDirection: 'row',
										display: 'flex',
										width: '100%',
									}}
									key={index}
								>
									<Grid container>
										<Grid item xs={9}>
											<div style={{ display: 'flex' }}>
												<Typography>
													{moment(item.createdAt).format('YYYY-MM-DD')}
												</Typography>
												<Typography>
													{moment(item.createdAt).format('HH:mm')} -{' '}
													{moment(item.finishAt).format('HH:mm')}
												</Typography>
											</div>
											<StatusCondition status={item.status} />
										</Grid>
										<Grid item xs={3}>
											<Typography>Pemeriksa</Typography>
											<Typography>{item.createBy?.name}</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography>
												{item.note === '' ? '-' : item.note}
											</Typography>
										</Grid>
										{/* <Grid item xs={2} sx={{display: 'flex', alignItems: 'center'}}>
                  <Button sx={{bgcolor: '#BB7E36',color:'#fff', textTransform:'none',fontSize: 11}}>
                    Lihat Hasil
                  </Button>
                </Grid> */}
									</Grid>
								</Paper>
							</Button>
						)
					)
				) : (
					<Paper
						sx={{
							padding: '10px 7px',
							display: 'flex',
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<Typography sx={{ fontSize: 13, fontWeight: 600 }}>
							Tidak Ada Data
						</Typography>
					</Paper>
				)}
			</Grid>
			<Grid item xs={12}></Grid>
		</Grid>
	);
};

export default MedicalPage;
