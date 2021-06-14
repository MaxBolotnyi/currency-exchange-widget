import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    borderRadius: 20,
    boxShadow: theme.shadows[1],
    width: 350,
    height: 400,
    backgroundColor: `${theme.palette.background.paper}`,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'strech',
    padding: '20px',
    overflow: 'hidden',
  },
}));
