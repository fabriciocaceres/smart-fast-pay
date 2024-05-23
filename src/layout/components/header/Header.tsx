import { BASE_URL } from '@/router';
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
                    <li className="nav-item dropdown">
                        <a
                            className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            {currency?.country} ({currency?.code}){' '}
                            <i className="align-middle" data-feather="settings"></i>
                        </a>

                        {currency?.country && <a
                            className="nav-link dropdown-toggle d-none d-sm-inline-block"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <span className="symbol me-2" style={{width: 18}}>
                                <img className="rounded-1" src={`${BASE_URL}/media/flags/${currency?.country?.toLocaleLowerCase()}.svg`}/>
                            </span>
                            {currency?.country} ({currency?.symbol}){' '}
                        </a>}
                        <div className="dropdown-menu dropdown-menu-end">
                            {currencies.map(currency => (
                                <a
                                    key={currency.id}
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleCurrencyChange(currency.id)}
                                >
                                    <span className="symbol me-2" style={{width: 18}}>
                                        <img className="rounded-1" src={`${BASE_URL}/media/flags/${currency.country?.toLocaleLowerCase()}.svg`}/>
                                    </span>
                                    {currency.country} ({currency.symbol})
                                </a>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
