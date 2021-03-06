import React from 'react';
import { useGlobal } from 'reactn';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBarDrawer from './AppBarDrawer';
import AppBarMenu from './AppBarMenu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { blue, red } from '@material-ui/core/colors';

// TODO add a button that moves all data from Session Storage to Local Storage

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	content: {
		flexGrow: 1,
		paddingTop: theme.spacing(10),
		padding: theme.spacing(2),
	},
	menuButton: {
		marginRight: 36,
	},
	title: {
		flexGrow: 1,
		'&:hover': {
			// It's not a bug, it's a feature
			// that checks if UI thread is blocked
			// (mostly by tfjs) on Chrome
			display: 'none',
		}
	},
	hide: {
		display: 'none',
	}
}));

export default (props) => {
	const { appName, setDarkMode, children } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useGlobal('appBarDrawerOpen');

	function handleDrawerOpen() {
		setOpen(true);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>{appName}</Typography>

					<AppBarMenu setDarkMode={setDarkMode} />
				</Toolbar>
			</AppBar>
			<AppBarDrawer />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{ children }
			</main>
		</div>
	);
}

