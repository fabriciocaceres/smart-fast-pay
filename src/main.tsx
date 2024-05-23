import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@/index.scss';

import { Routes } from '@/router';
import { I18nProvider } from './config/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <I18nProvider>
                <Routes />
            </I18nProvider>
        </BrowserRouter>
    </React.StrictMode>
);
