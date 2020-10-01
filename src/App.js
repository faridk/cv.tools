import React, { useState, setState } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { lightTheme, darkTheme } from './themes';
import Button from '@material-ui/core/Button';
import AppBar from './components/AppBar';
import CanvasContainer from './components/canvases/CanvasContainer.js'
import videoFile from './../video.mp4';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

export default (props) => {
	const width = 600, height = 337;
	const { name } = props;
	// Used in child component AppBarMenu
	const [darkMode, setDarkMode] = useState({darkMode: true});
	const classes = useStyles();
	let canvas, video;
	return (<ThemeProvider theme={darkMode ? createMuiTheme(darkTheme) : createMuiTheme(lightTheme)}>
				<CssBaseline />
				<AppBar appName={name} setDarkMode={setDarkMode}>
					{/* Add main content here so it can slide when AppBarDrawer is open */}
					<CanvasContainer file={videoFile} width={width} height={height} />
				</AppBar>
			</ThemeProvider>)
}