import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    visibility: 'hidden',
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -100,
    left: 'calc(50% - 75px)',
    transition: 'top 0.3s linear',
  },
  open: {
    top: 10,
    visibility: 'visible',
  },
});
