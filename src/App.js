import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import Theme from './assets/theme/Theme';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import frLocale from 'date-fns/locale/fr';
import format from 'date-fns/format';

const getDatePickerHeaderText = (date) => {
	return format(date, 'd MMM yyyy');
};

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
			<MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
				<Theme>
					<SnackbarProvider>
						<Routes />
					</SnackbarProvider>
				</Theme>
			</MuiPickersUtilsProvider>
		</div>
	);
}

export default App;
