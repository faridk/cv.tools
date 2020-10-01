import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PoseDetectionEngine from './../../engines/PoseDetectionEngine';
import PoseDetectionRenderer from './../../renderers/PoseDetectionRenderer';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: '0px',
		left: '0px',
		zIndex: '0'
	},
}));

export default (props) => {
		// See return 'el's (JSX elements)
		const { file, width, height, engineCollector } = props;
		const classes = useStyles();
		let canvas, video;
		let engine = new PoseDetectionEngine();
		useEffect(() => {
			// Since useEffect is not async define a custom async wrapper function
			(async () => {
				const name = "PoseDetection";
				// Start a cacher with the current video's URL / name
				// TODO make it a MD5 hash based on contents of the file
				// instead of a current plaintext name
				engineCollector(await engine.start(name, video, canvas, width, height));
			})() // And then immediately invoke it
		});
		return (<div className={classes.root}>
							<video hidden id="video" ref={ el => video = el } muted src={file} onEnded={engine.stop} width={width} height={height}></video>
							<canvas ref={ el => canvas = el } width={width} height={height}></canvas>
						</div>)
}



