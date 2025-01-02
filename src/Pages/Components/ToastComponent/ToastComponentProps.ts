export interface ToastComponentProps {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top' | 'bottom';
    showIcon?: boolean;
    icon?: any;
    style?: React.CSSProperties;
    onClose?: () => void;
    onClick?: () => void;
    transition?: 'fade' | 'slide' | 'zoom' | 'bounce' | string;
    transitionDuration?: number;
    ariaLabel?: string;
  }