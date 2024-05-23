import { FC } from 'react';
import { useHeader } from './hooks/useHeader';

export const Header: FC = () => {
    const { currencies, currencyId, currency, handleCurrencyChange } = useHeader();

    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg d-flex">
            <a className="sidebar-toggle js-sidebar-toggle">
                <i className="hamburger align-self-center"></i>
            </a>

            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    {/* <li className="nav-item dropdown">
                        <select value={currencyId} onChange={handleCurrencyChange}>
                            {currencies.map(currency => (
                                <option key={currency.id} value={currency.id}>
                                    {currency.country}
                                </option>
                            ))}
                        </select>
                    </li> */}

                    <li className="nav-item dropdown">
                        <a
                            className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            {currency?.country} ({currency?.code}){' '}
                            <i className="align-middle" data-feather="settings"></i>
                        </a>

                        <a
                            className="nav-link dropdown-toggle d-none d-sm-inline-block"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <span className="symbol me-2" style={{width: 18}}>
                                <img className="rounded-1" src={`media/flags/${currency?.country?.toLocaleLowerCase()}.svg`}/>
                            </span>
                            {currency?.country} ({currency?.symbol}){' '}
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="pages-profile.html">
                                <i className="align-middle me-1" data-feather="user"></i> Profile
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="align-middle me-1" data-feather="pie-chart"></i> Analytics
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="index.html">
                                <i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="align-middle me-1" data-feather="help-circle"></i> Help Center
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                Log out
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
