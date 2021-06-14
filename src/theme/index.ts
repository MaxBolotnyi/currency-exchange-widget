import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

export const createTheme = (prefersDarkMode: boolean) => {
    return createMuiTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: orange[400]
            }
        },
        overrides: {
            MuiOutlinedInput: {
                root: {
                    "&:hover $notchedOutline": {
                        borderColor: orange[400]
                    }
                }
            },
            MuiSelect: {
                select: {
                    '&:focus': {
                        backgroundColor: 'transparent'
                    }
                }
            }
        }
    })
};
