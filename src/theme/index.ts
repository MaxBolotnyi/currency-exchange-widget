import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

import type { Theme } from '@material-ui/core/styles';

export const createTheme = (prefersDarkMode: boolean): Theme => createMuiTheme({
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: orange[400],
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: orange[400],
        },
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});
