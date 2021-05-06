import React, { useEffect, useState } from 'react';
import {
	makeStyles,
	Typography,
	Grid,
	Paper,
	Box,
	Avatar,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import ChartBar from '../../components/ChartBar/ChartBar';
// import ReactPlayer from 'react-player';
// import Ah from './ah.mp3';

const useStyles = makeStyles((theme) => ({
	root: {
		// display: "flex",
		flexGrow: 1,
	},
	paper: {
		display: 'flex',
		height: 140,
		padding: theme.spacing(4),
		alignItems: 'center',
		justifyContent: 'center',
		// width: 100,
	},
	avatar: {
		width: '48px',
		height: '48px',
	},
}));

const Home = () => {
	const classes = useStyles();

	return (
		<>
			{/* <ReactPlayer url={Ah} width="400px" height="50px" playing /> */}
			<Grid
				container
				spacing={5}
				direction='row'
				justify='center'
				alignItems='center'
				className={classes.root}
				volume={1}
			>
				<Grid item md={6} sm={6} xs={12} lg={3}>
					<Paper variant='outlined' className={classes.paper}>
						<Box className={classes.root}>
							<Typography variant='inherit' color='initial'>
								PAPER
							</Typography>
							<Box display='flex' flexWrap='wrap' alignItems='center'>
								<Typography variant='inherit' color='initial'>
									125
								</Typography>
								<Typography
									style={{ marginLeft: '8px' }}
									variant='inherit'
									color='initial'
								>
									PGPG
								</Typography>
							</Box>
						</Box>
						<Avatar classes={{ root: classes.avatar }}>
							<AttachMoneyIcon />
						</Avatar>
					</Paper>
				</Grid>
				<Grid item md={6} sm={6} xs={12} lg={3}>
					<Paper variant='outlined' className={classes.paper}>
						<Box className={classes.root}>
							<Typography variant='inherit' color='initial'>
								PAPER
							</Typography>
							<Box display='flex' flexWrap='wrap' alignItems='center'>
								<Typography variant='inherit' color='initial'>
									125
								</Typography>
								<Typography
									style={{ marginLeft: '8px' }}
									variant='inherit'
									color='initial'
								>
									PGPG
								</Typography>
							</Box>
						</Box>
						<Avatar classes={{ root: classes.avatar }}>
							<AttachMoneyIcon />
						</Avatar>
					</Paper>
				</Grid>
				<Grid item md={6} sm={6} xs={12} lg={3}>
					<Paper variant='outlined' className={classes.paper}>
						<Box className={classes.root}>
							<Typography variant='inherit' color='initial'>
								PAPER
							</Typography>
							<Box display='flex' flexWrap='wrap' alignItems='center'>
								<Typography variant='inherit' color='initial'>
									125
								</Typography>
								<Typography
									style={{ marginLeft: '8px' }}
									variant='inherit'
									color='initial'
								>
									PGPG
								</Typography>
							</Box>
						</Box>
						<Avatar classes={{ root: classes.avatar }}>
							<AttachMoneyIcon />
						</Avatar>
					</Paper>
				</Grid>
				<Grid item md={6} sm={6} xs={12} lg={3}>
					<Paper variant='outlined' className={classes.paper}>
						<Box className={classes.root}>
							<Typography variant='inherit' color='initial'>
								PAPER
							</Typography>
							<Box display='flex' flexWrap='wrap' alignItems='center'>
								<Typography variant='inherit' color='initial'>
									125
								</Typography>
								<Typography
									style={{ marginLeft: '8px' }}
									variant='inherit'
									color='initial'
								>
									PGPG
								</Typography>
							</Box>
						</Box>
						<Avatar classes={{ root: classes.avatar }}>
							<AttachMoneyIcon />
						</Avatar>
					</Paper>
				</Grid>
				{/* <Grid item xs={12}>
					<Paper variant='outlined'>
			
						<ChartBar />
	
					</Paper>
				</Grid> */}
			</Grid>
		</>
	);
};

export default Home;
