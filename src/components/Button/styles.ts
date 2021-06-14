import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: `linear-gradient(45deg, ${pink[300]} 30%, ${orange[300]} 90%)`,
    borderRadius: 20,
    height: 40,
    padding: '0 30px',
  },
  disabled: {
    background: `linear-gradient(45deg, ${grey[700]} 30%, ${grey[500]} 90%)`,
  },
  label: {
    color: theme.palette.common.white,
  },
}));
