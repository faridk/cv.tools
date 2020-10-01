import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import BrightnessIcon from '@material-ui/icons/Brightness6';
import MoreIcon from '@material-ui/icons/MoreVert';
import { blue, red } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';


const useStyles = makeStyles(theme => ({
  grow: {
		flexGrow: 1,
  },
  menuButton: {
		marginRight: theme.spacing(2),
  },
  title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
  },
  sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
		display: 'flex',
		},
  }
}));

export default (props) => {
	const { setDarkMode } = props;
	const [anchorEl, setAnchorEl] = useGlobal('appBarThemeMenuAnchorEl');
	const [open, setOpen] = useState(false);
	const handleChange = (event) => {
		setAuth(event.target.checked);
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen(!open);
	}

	const handleClose = (event) => {
		// Set a theme using a function from props
		const theme = event.currentTarget.dataset.theme;
		// console.log(event.currentTarget.outerText);
		setDarkMode(theme == 'dark' ? true : false);
		// Hide the menu
		setAnchorEl(null);
		setOpen(false);
	}

	const classes = useStyles();

	return (<div>
				<IconButton
					aria-label="Light or dark theme"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
				>
					<BrightnessIcon />
				</IconButton>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={open}
					onClose={handleClose}
				>
					<MenuItem data-theme="light" onClick={handleClose}>Light Theme</MenuItem>
					<MenuItem data-theme="dark" onClick={handleClose}>Dark Theme</MenuItem>
				</Menu>
			</div>);
}