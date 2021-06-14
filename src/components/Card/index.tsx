import React from 'react';
import { useStyles } from './styles';

const Card: React.FunctionComponent<{ children: React.ReactNode }> = React.memo(({
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {children}
    </div>
  );
});

export default Card;
