import {
	Box,
	Button,
	Card,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { WorkOrderContext } from 'Context';
import { AssesmentContext } from 'Context/Assesment';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const PocketBook = () => {
	const navigate = useNavigate();
	// context
	const { pocketBooks, getPocketBooks } = useContext(AssesmentContext);
	const { user } = useContext(WorkOrderContext);

	// state
	const [filterText, setFilterText] = useState('');

	// handle
	const handleSearch = () => {
		const params = {
			isLimit: false,
			departement: user.departement,
			search: filterText,
		};
		getPocketBooks(params);
	};

	// effect
	useEffect(() => {
		const params = {
			isLimit: false,
			departement: user.departement,
		};
		getPocketBooks(params);

		return () => {};
	}, [user.departement]);

	return (
		<Box sx={{ pt: 2, pb: 4, px: 1 }}>
			<Typography gutterBottom variant="h6">
				Buku Saku
			</Typography>
			<Box
				sx={{
					display: 'flex',
					gap: '5px',
					mb: 2,
					width: '100%',
					alignItems: 'center',
				}}
			>
				<TextField
					variant="outlined"
					placeholder="Search"
					sx={{ width: '80%' }}
					value={filterText}
					onChange={e => setFilterText(e.target.value)}
				/>
				<Box sx={{ width: '20%' }}>
					<IconButton size="large" onClick={handleSearch}>
						<SearchIcon sx={{ color: 'blue', fontSize: '32px' }} />
					</IconButton>
				</Box>
			</Box>
			<Stack spacing={1}>
				{pocketBooks.length > 0 ? (
					pocketBooks.map(item => (
						<Card
							component={Button}
							onClick={() => navigate(`/app/assesment/pocket-book/${item._id}`)}
							key={item._id}
							sx={{ p: 2 }}
						>
							<Stack spacing={1}>
								<Typography variant="body1" fontWeight={600}>
									{item.title}
								</Typography>
								<Typography variant="body2">
									{item.description?.length > 230
										? item.description?.slice(0, 230) + '...'
										: item.description}
								</Typography>
								{item.contentText && (
									<Box
										component="div"
										dangerouslySetInnerHTML={{ __html: item.contentText }}
									/>
								)}
							</Stack>
						</Card>
					))
				) : (
					<Card sx={{ p: 2 }}>
						<Typography variant="body1" fontWeight={600}>
							DATA KOSONG
						</Typography>
					</Card>
				)}
			</Stack>
		</Box>
	);
};

export default PocketBook;
