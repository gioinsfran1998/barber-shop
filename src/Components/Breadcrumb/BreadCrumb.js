import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '3px',
		marginBottom: theme.spacing(4),
		marginTop: theme.spacing(2),
	},
	breadcrumb: {
		color: theme.palette.primary.main,
	},
}));

const BreadCrumb = (props) => {
	const {
		history,
		location: { pathname },
	} = props;

	const pathnames = pathname.split('/').filter((x) => x);

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Breadcrumbs
				className={classes.breadcrumb}
				separator={<NavigateNextIcon fontSize='small' />}
				aria-label='breadcrumb'
			>
				{pathnames.length > 0 ? (
					<Link color='inherit' href='/' onClick={() => history.push('/')}>
						Home
					</Link>
				) : (
					<Typography> Home</Typography>
				)}
				{pathnames.map((name, index) => {
					const isLast = index === pathnames.length - 1;
					return isLast ? (
						<Typography key={index}>
							{name.charAt(0).toUpperCase() + name.slice(1)}
						</Typography>
					) : (
						<Link color='inherit' onClick={() => history.push('/')} key={index}>
							{name.charAt(0).toUpperCase() + name.slice(1)}
						</Link>
					);
				})}
			</Breadcrumbs>
		</div>
	);
};

export default withRouter(BreadCrumb);
