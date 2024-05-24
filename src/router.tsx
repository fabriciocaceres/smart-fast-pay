/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Fragment } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { MasterLayout } from './layout/MasterLayout';
import { SnackbarProvider } from './shared';

const PRESERVED = import.meta.globEager('/src/pages/(_app|404).tsx');
const ROUTES = import.meta.globEager('/src/pages/**/[a-z[]*.tsx');

export const BASE_URL = '/smart-fast-pay';

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
    const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');
    // @ts-ignore
    return { ...preserved, [key]: PRESERVED[file].default };
}, {});

const routes = Object.keys(ROUTES).map(route => {
    const path = (BASE_URL+"/"+route)
        .replace(/\/src\/pages|dashboard|index|\.tsx$/g, '')
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1')
        .replace(/\/+/g, '/');
        

    // @ts-ignore
    return { path, component: ROUTES[route].default };
});

export const PATH = {
    dashboard: BASE_URL,
    transaction: {
        new: (BASE_URL+'/transaction/new').replace(/\/+/g, '/'),
        list: (BASE_URL+'/transaction').replace(/\/+/g, '/'),
    }
};


export const Routes = () => {
    // @ts-ignore
    const App = preserved?.['_app'] || Fragment;
    // @ts-ignore
    const NotFound = preserved?.['404'] || Fragment;

    return (
        <SnackbarProvider>
            <App>
                <Switch>
                    <Route element={<MasterLayout />}>
                        {routes.map(({ path, component: Component = Fragment }) => {
                            return  <Route key={path} path={path} Component={Component} />
                        })}
                        <Route path="*" Component={NotFound} />
                    </Route>
                </Switch>
            </App>
        </SnackbarProvider>
    );
};
