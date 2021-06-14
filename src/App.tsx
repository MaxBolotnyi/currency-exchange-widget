import React from 'react';
import './App.css';

import { Provider } from 'react-redux';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './store';

import Converter from './containers/Converter';

import { createTheme } from './theme';

function App(): React.ReactElement {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme: Theme = React.useMemo(
    () => createTheme(prefersDarkMode),
    [prefersDarkMode],
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div
            data-testid="app-test-id"
            className="App"
            style={{ backgroundColor: theme.palette.background.default }}
          >
            <Converter />
          </div>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
