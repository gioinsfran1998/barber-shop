import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CallIcon from '@material-ui/icons/Call';
import {
	Box,
	Container,
	IconButton,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import { showLayoutAction } from '../../redux/enviroment';
import Timer from '../../Components/Timer/Timer';
import { DataGrid } from '@material-ui/data-grid';
import { db } from '../../firebase';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .super-app-theme--header': {
			backgroundColor: theme.palette.primary.main,
			color: '#fafafa',
		},
	},
	rootPaper: {
		padding: theme.spacing(6),
	},
}));

export const streamTickets = (observer) => {
	return db.collection('tickets').onSnapshot(observer);
};

const Shifts = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = useTheme();
	const [dataSearched, setDataSearched] = useState([]);
	const [loading, setLoading] = useState(false);
	const [tickets, setTickets] = useState([]);
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const { enqueueSnackbar } = useSnackbar();

	const handleClickPopUp = (variant, message) => {
		console.log(variant, 'variant');
		enqueueSnackbar(message, { variant });
	};

	useEffect(() => {
		const unsubscribe = streamTickets({
			next: (querySnapshot) => {
				const updateTickets = querySnapshot.docs.map((docSnapshot) => {
					return { ...docSnapshot.data(), id: docSnapshot.id };
				});

				setTickets(updateTickets);
			},
			error: () => console.log('grocery-list-item-get-fail'),
		});
		return unsubscribe;
	}, []);

	console.log(tickets, '============');

	const columns = [
		{
			field: 'name',
			headerName: 'Nombre',
			flex: isDesktop ? 1 : 0,
			headerAlign: 'center',
			headerClassName: 'super-app-theme--header',
			align: 'center',
		},

		{
			field: 'number',
			headerName: 'Nº Ticket',
			headerAlign: 'center',
			headerClassName: 'super-app-theme--header',
			flex: isDesktop ? 1 : 0,
			align: 'center',
		},
		{
			field: 'service',
			headerName: 'Servicio',
			headerAlign: 'center',
			headerClassName: 'super-app-theme--header',
			flex: isDesktop ? 1 : 0,
			align: 'center',
		},

		{
			field: 'actions',
			headerName: 'Acciones',
			headerAlign: 'center',
			headerClassName: 'super-app-theme--header',
			flex: isDesktop ? 1 : 0,
			align: 'center',

			renderCell: (params) => (
				<strong>
					<IconButton
						color='primary'
						aria-label='details'
						// onClick={() => history.push('/tickets/detail', params.row)}
						onClick={() => handleCallTicket(params)}
					>
						<CallIcon />
					</IconButton>

					<IconButton
						color='primary'
						aria-label='edit'
						onClick={() => handleCancelTicket(params)}
					>
						<CancelOutlinedIcon />
					</IconButton>
				</strong>
			),
		},
	];

	const handleCallTicket = async ({ row }) => {
		console.log(row.state);
		await db
			.collection('tickets')
			.doc(row.id)
			.update({
				state: 1,
			})
			.then(() => {
				console.log('Ok Editado!!!');
				handleClickPopUp('success', `Llamando a ${row.name} `);
			})
			.catch(() => {
				console.log('CATCHH');
				// setLoading(false);
			});
	};

	const handleCancelTicket = async ({ row }) => {
		console.log(row.state);
		await db
			.collection('tickets')
			.doc(row.id)
			.update({
				state: 0,
			})
			.then(() => {
				console.log('Ok Editado!!!');
				handleClickPopUp('error', 'Ticket Cancelado !!');
			})
			.catch(() => {
				console.log('CATCHH');
				// setLoading(false);
			});
	};

	return (
		<Paper variant='outlined' classes={{ root: classes.rootPaper }}>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				p={3}
				// py={2}
				mb={5}
			>
				<Typography variant='h2' color='initial'>
					Panel de control de turnos
				</Typography>
			</Box>

			<Box style={{ height: 'auto', width: '100%' }} className={classes.root}>
				<DataGrid
					rows={dataSearched.length > 0 ? dataSearched : tickets}
					columns={columns}
					pageSize={10}
					checkboxSelection={false}
					autoHeight={true}
					loading={tickets.length === 0 || loading}
					// className={classes.dataGrid}
				/>
			</Box>
		</Paper>
	);
};

export default Shifts;
