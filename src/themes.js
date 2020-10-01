import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';
import blueGrey from '@material-ui/core/colors/blueGrey';
import yellow from '@material-ui/core/colors/yellow';
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';

const lightTheme = {
  palette: {
    primary: indigo,
    secondary: orange,
		accent: green,
		error: red,
    type: 'light'
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  status: {
    danger: 'orange'
  }
};

const darkTheme = {
  	palette: {
		primary: purple,
    secondary: green,
		accent: green,
		error: red,
		type: 'dark'
	},
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  status: {
    danger: 'orange',
  }
};

module.exports = {
    lightTheme,
    darkTheme
}