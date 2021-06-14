import React from 'react';
import Alert from '@material-ui/lab/Alert';

import { useStyles } from './styles';

import type { TTopToastProps } from './types';

const TopToast = React.memo(({
    children,
    open = false,
    onDelayedClose,
    delay = 1600,
    ...props
}: TTopToastProps) => {
    const classes = useStyles();

    React.useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (open) {
            timeout = setTimeout(() => {
                !!onDelayedClose && onDelayedClose();
            }, delay);
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        };
    }, [open, delay, onDelayedClose]);

    return (
        <Alert
            {...props}
            className={`${classes.root} ${open ? classes.open : ''}`}
            variant="filled"
        >
            {children}
        </Alert>
    );
});

export default TopToast;
