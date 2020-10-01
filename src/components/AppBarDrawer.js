import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FaceIcon from '@material-ui/icons/Face';
import BodyIcon from '@material-ui/icons/Accessibility';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import { blue, red } from '@material-ui/core/colors';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(7) + 1,
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	}
}));

export default (props) => {
	const classes = useStyles();
	const theme = useTheme();	
	const [open, setOpen] = useGlobal('appBarDrawerOpen');
	const [poseDetectionEnabled, setPoseDetectionEnabled] = useGlobal('poseDetectionEnabled');
	const [faceRecognitionEnabled, setFaceRecognitionEnabled] = useGlobal('faceRecognitionEnabled');
	const handleDrawerOpen = () => { setOpen(true); };
	const handleDrawerClose = () => { setOpen(false); };
	const toggleTool = (event, tool) => {
		// Returns true or false so that tools
		// can be toggled from both Checkbox and ListItem
		const toggle = (event, current) => {
			if (event.currentTarget.checked) {
				// Checkbox clicked
				return event.currentTarget.checked;
			} else {
				// List item clicked (not a Checkbox)
				return !current;
			}
		}
		switch (tool) {
			case 'faceRecognition':
				setFaceRecognitionEnabled(toggle(event, faceRecognitionEnabled));
				break;
			case 'poseDetection':
				setPoseDetectionEnabled(toggle(event, poseDetectionEnabled));
				break;
			default:
				console.error('Bad tool choice in AppBarDrawer!')
				break;
		}

	}

	return (
		<div className={classes.root}>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
				open={open}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{/* {['Tool1', 'Tool2', 'Tool3'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon className={classes.iconHover}>{index % 2 === 0 ? <FaceIcon /> : <BodyIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))} */}
					<ListItem button key={"Face Recognition"}
						onClick={ (e) => toggleTool(e, 'faceRecognition') }
						>
						<ListItemIcon className={classes.iconHover}>
							{faceRecognitionEnabled ? <FaceIcon color="secondary" /> : <FaceIcon />}
						</ListItemIcon>
						<ListItemText primary={"Face Recognition"} />
						<Checkbox
							checked={faceRecognitionEnabled}
							onChange={ (e) => toggleTool(e, 'faceRecognition') }
							inputProps={{'aria-label': 'primary checkbox'}}
						/>
					</ListItem>
					<ListItem button key={"Pose Detection"}
						onClick={ (e) => toggleTool(e, 'poseDetection') }
						>
						<ListItemIcon className={classes.iconHover}>
							{poseDetectionEnabled ? <BodyIcon color="secondary" /> : <BodyIcon />}
						</ListItemIcon>
						<ListItemText primary={"Pose Detection"} />
						<Checkbox
							checked={poseDetectionEnabled}
							onChange={ (e) => toggleTool(e, 'poseDetection') }
							inputProps={{'aria-label': 'primary checkbox'}}
						/>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button key={"Help"}>
						<ListItemIcon className={classes.iconHover}>
							<HelpIcon />
						</ListItemIcon>
						<ListItemText primary={"Help"} />
					</ListItem>
					<ListItem button key={"About"}>
						<ListItemIcon className={classes.iconHover}>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary={"About"} />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
}

