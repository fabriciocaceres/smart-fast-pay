import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Header } from './components/header/Header';

export const MasterLayout: FC = () => (
    <div className="wrapper">
        <Navbar />

        <div className="main d-flex flex-column flex-column-fluid">
            <Header />

            <main className="content d-flex flex-column flex-column-fluid">
                <Outlet />
            </main>
        </div>
    </div>
);
