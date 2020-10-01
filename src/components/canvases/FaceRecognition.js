import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FaceRecognitionEngine from './../../engines/FaceRecognitionEngine';
import AbstractEngine from './../../engines/AbstractEngine';
import FaceRecognitionRenderer from './../../renderers/FaceRecognitionRenderer';

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
		let stopEngine;
		let engine = new FaceRecognitionEngine;
		// let test = new AbstractEngine();
		useEffect(() => {
			// Since useEffect is not async define a custom async wrapper function
			(async () => {
				engineCollector(await engine.start("FaceRecognition", video, canvas, width, height));
			})() // And then immediately invoke it
		});
		return (<div className={classes.root}>
					<video hidden id="video" ref={ el => video = el } muted src={file} onEnded={engine.stop} width={width} height={height}></video>
					<canvas ref={ el => canvas = el } width={width} height={height}></canvas>
				</div>)
}