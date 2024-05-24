import { FC, ReactNode, useRef } from 'react';

import { SnackbarKey, SnackbarProvider as SProvider } from 'notistack';

interface Props {
    children: ReactNode;
}

export const SnackbarProvider: FC<Props> = ({ children }) => {
    const notistackRef = useRef<any>(null);

    const onClose = (key: SnackbarKey) => () => {
        notistackRef.current.closeSnackbar(key);
    };

    return (
        <SProvider
            ref={notistackRef}
            dense
            maxSnack={5}
            preventDuplicate
            autoHideDuration={3000}
            variant="success" // Set default variant
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            // iconVariant={{
            //   info: <SnackbarIcon icon={'eva:info-fill'} color="info" />,
            //   success: <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color="success" />,
            //   warning: <SnackbarIcon icon={'eva:alert-triangle-fill'} color="warning" />,
            //   error: <SnackbarIcon icon={'eva:alert-circle-fill'} color="error" />,
            // }}
            // With close as default
            // action={(key) => (
            //   <IconButtonAnimate size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            //     <Iconify icon={'eva:close-fill'} />
            //   </IconButtonAnimate>
            // )}
        >
            {children}
        </SProvider>
    );
};
