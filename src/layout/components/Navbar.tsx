import { useI18n } from '@/config/i18n';
import { PATH } from '@/router';
import clsx from 'clsx';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: FC = () => {
    const { translate } = useI18n();
    const {pathname} = useLocation()

    const checkIsActive = (url: string) => {
        const current = window.location.pathname.replace(/^\/[^/]+\//, '');
        const newUrl = url.replace(/^\/[^/]+\//, '');

        if (!current || !url) {
            return false;
        }

        if (current.includes(newUrl)) {
            return true;
        }

        if (current.indexOf(url) > -1) {
            return true;
        }

        return false;
    };
    
    return (
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <span className="sidebar-brand">
                    <span className="align-middle">Smart Fast Pay</span>
                </span>

                <ul className="sidebar-nav">
                    <li className="sidebar-header">{translate('navbar.pages')}</li>

                    <li className={clsx('sidebar-item', {'active': checkIsActive(PATH.dashboard)})} >
                        <Link to={PATH.dashboard} className="sidebar-link">
                            <i className="align-middle bi bi-sliders2-vertical"></i>{' '}
                            <span className="align-middle">Dashboard</span>
                        </Link>
                    </li>

                    <li className={clsx('sidebar-item', {'active': checkIsActive(PATH.transaction.list)})}>
                        <Link to={PATH.transaction.list} className="sidebar-link">
                            <i className="align-middle bi bi-credit-card"></i>{' '}
                            <span className="align-middle">{translate('navbar.transactions')}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
