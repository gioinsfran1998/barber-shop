import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import Theme from './assets/theme/Theme';
import { SnackbarProvider } from 'notistack';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		minHeight: '100vh',
		display: 'flex',
	},
}));

function App() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Theme>
				<SnackbarProvider>
					<Routes />
				</SnackbarProvider>
			</Theme>
		</div>
	);
}

export default App;
