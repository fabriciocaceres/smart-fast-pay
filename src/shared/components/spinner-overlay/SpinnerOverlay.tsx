import { FC } from 'react';

interface SpinnerOverlayProps {
    show: boolean;
    hideBorderRadius?: boolean;
    message?: string;
}

export const SpinnerOverlay:FC<SpinnerOverlayProps> = ({show, hideBorderRadius}) => {
    return (
        <div
            className="position-absolute d-flex w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ 
                top: 0,
                left: 0,
                backgroundColor: '#f7f8fca1',
                visibility: show ? 'visible' : 'hidden',
                zIndex: 4,
                borderRadius: hideBorderRadius ? 0 : '16px',
            }}
        >
            <div className="spinner-border text-primary" role="status">
            </div>
        </div>
    );
};
