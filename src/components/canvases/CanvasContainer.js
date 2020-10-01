import React, { useState, setState } from 'react';
import { useGlobal } from 'reactn';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import FaceRecognition from './FaceRecognition';
import PoseDetection from './PoseDetection';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles(theme => ({
	root: {},
	card: {
		maxWidth: 600,
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 151,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playPauseIcon: {
		height: 38,
		width: 38,
	},
	multiLayer: {
		position: 'relative'
	}
}));

let engines = [];
let video;

/**
 * Gets called by children which populate "engines" array
 */
const addEngine = (engine) => {
	engines.push(engine);
	console.log(`Renderers: ${engines.length}`);
}

const processFrame = () => {
	console.log("Frame processed!");
	for (engine in engines) {
		engine.processFrame();
	}
}

const playVideos = () => {
	// Since processing is slow
	let playbackRate = 0.5;
	// Playing the main (user visible) video triggers processFrame via timeUpdate event
	video.play();
	video.playbackRate = playbackRate;
	for (engine in engines) {
		engine.video.play();
		engine.video.playbackRate = playbackRate;
	}
}

const pauseVideos = () => {
	video.pause();
	for (engine in engines) {
		engines.video.pause();
		engines.stop();
	}
}

export default (props) => {
	const { file, width, height } = props;
	const [toolsEnabled, setToolsEnabled] = useGlobal('toolsEnabled');
	const [videoPlaying, setVideoPlaying] = useGlobal('videoPlaying');
	const [poseDetectionEnabled, setPoseDetectionEnabled] = useGlobal('poseDetectionEnabled');
	const [faceRecognitionEnabled, setFaceRecognitionEnabled] = useGlobal('faceRecognitionEnabled');
	const classes = useStyles();
	// ht	tps://material-ui.com/guides/right-to-left/
	const themeDirection = 'ltr';

	const togglePlayback = () => {
		if (videoPlaying) {
			setVideoPlaying(false);
			pauseVideos();
		} else {
			setVideoPlaying(true);
			playVideos();
		}
	}

	return (<div className={classes.root}>
				<Card className={classes.card}>
					<div className={classes.details}>
						{/* <CardContent className={classes.content}>
							<Typography component="h5" variant="h5">
								Title
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								Description
							</Typography>
						</CardContent> */}
					</div>
					<div className={classes.multiLayer}>
						<video id="video" ref={ el => video = el } muted src={file} width={width} height={height} onTimeUpdate={processFrame}></video>
						{/* Render components enabled in the AppBarDrawer */}
						{faceRecognitionEnabled ? <FaceRecognition file={file} width={width} height={height} engineCollector={addEngine}/> : <div />}
						{poseDetectionEnabled ? <PoseDetection file={file} width={width} height={height} engineCollector={addEngine}/> : <div />}
					</div>
					<div className={classes.controls}>
						<IconButton aria-label="Previous">
							{themeDirection === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
						</IconButton>
						<IconButton aria-label="Play/pause" onClick={togglePlayback}>
							{videoPlaying ? <PauseIcon className={classes.playPauseIcon} /> : <PlayArrowIcon className={classes.playPauseIcon} />}
						</IconButton>
						<IconButton aria-label="Next">
							{themeDirection === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
						</IconButton>
					</div>
				</Card>
			</div>)
}