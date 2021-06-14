import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import type { TButtonProps } from './types';

const MyButton = React.memo(({
  children,
  ...props
}: TButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      {...props}
      classes={{
        root: classes.root,
        disabled: classes.disabled,
        label: classes.label,
      }}
    >
      { children}
    </Button>
  );
});

export default MyButton;
