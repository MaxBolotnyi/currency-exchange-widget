import type { AlertProps } from '@material-ui/lab/Alert';

export type TTopToastProps = AlertProps & {
    open?: boolean;
    delay?: number; 
    onDelayedClose?: () => void
};
