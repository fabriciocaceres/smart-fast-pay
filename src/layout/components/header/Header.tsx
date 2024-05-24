import { CurrencyGetResponse } from '@/@types';
import { I18nLanguages, useI18n } from '@/config';
import { BASE_URL } from '@/router';
import { FC } from 'react';
import { useHeader } from './hooks/useHeader';

const languages = [
    {
        lang: I18nLanguages.PtBr,
        name: 'portuguese',
        flag: '/media/flags/brasil.svg'
    },
    {
        lang: I18nLanguages.Es,
        name: 'spanish',
        flag: '/media/flags/spain.svg'
    },
    {
        lang: I18nLanguages.En,
        name: 'english',
        flag: '/media/flags/united-states.svg'
    }
];

interface SelectCurrencyProps {
    currencies: CurrencyGetResponse[];
    currency: CurrencyGetResponse | null;
    handleCurrencyChange: (newCurrencyId: string) => void;
}

const SelectCurrency: FC<SelectCurrencyProps> = ({ currencies, currency, handleCurrencyChange }) => (
    <ul className="navbar-nav navbar-align">
        <li className="nav-item dropdown">
            {currency?.country && (
                <a className="nav-link dropdown-toggle d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                    <span className="symbol me-2" style={{ width: 18 }}>
                        <img
                            className="rounded-1"
                            src={`${BASE_URL}/media/flags/${currency?.country?.toLocaleLowerCase()}.svg`}
                        />
                    </span>
                    {currency?.name} ({currency?.symbol}){' '}
                </a>
            )}
            <div className="dropdown-menu dropdown-menu-end dropdown-currency-menu-end">
                {currencies.map(currency => (
                    <a
                        key={currency.id}
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleCurrencyChange(currency.id)}
                    >
                        <span className="symbol me-2" style={{ width: 18 }}>
                            <img
                                className="rounded-1"
                                src={`${BASE_URL}/media/flags/${currency.country?.toLocaleLowerCase()}.svg`}
                            />
                        </span>
                        {currency.country} ({currency.symbol})
                    </a>
                ))}
            </div>
        </li>
    </ul>
);

const SelectLanguage: FC = () => {
    const { translate, lang, changeLanguage } = useI18n();
    const currentLanguage = languages.find(x => x.lang === lang);
    
    return (
        <ul className="navbar-nav navbar-align">
            <li className="nav-item dropdown">
                {currentLanguage && (
                    <a className="nav-link dropdown-toggle d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                        <span className="symbol me-2" style={{ width: 18 }}>
                            <img className="rounded-1" src={BASE_URL + currentLanguage?.flag} />
                        </span>
                        {translate(`header.suported_languages.${currentLanguage?.name}`)}{' '}
                    </a>
                )}
                <div className="dropdown-menu dropdown-menu-end">
                    {languages.map(language => (
                        <a
                            key={language.lang}
                            className="dropdown-item"
                            href="#"
                            onClick={() => changeLanguage(language.lang)}
                        >
                            <span className="symbol me-2" style={{ width: 18 }}>
                                <img className="rounded-1" src={BASE_URL + language?.flag} />
                            </span>
                            {translate(`header.suported_languages.${language?.name}`)}{' '}
                        </a>
                    ))}
                </div>
            </li>
        </ul>
    );
};

export const Header: FC = () => {
    const { currencies, currency, handleCurrencyChange, handleSidebarCollapseToggle } = useHeader();
    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg d-flex">
            <span className="sidebar-toggle js-sidebar-toggle" onClick={() => handleSidebarCollapseToggle()}>
                <i className="hamburger align-self-center"></i>
            </span>

            <div className="navbar-collapse collapse">
                <SelectCurrency
                    currencies={currencies}
                    currency={currency}
                    handleCurrencyChange={handleCurrencyChange}
                />
                <SelectLanguage />
            </div>
        </nav>
    );
};
