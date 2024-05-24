import { CurrencyGetResponse } from '@/@types';
import { updateCurrency } from '@/config';
import { useStore } from '@/config/store/store';
import { CurrencyService } from '@/services';
import { useEffect, useState } from 'react';

export const useHeader = () => {
    const [currencies, setCurrencies] = useState<CurrencyGetResponse[]>([]);
    const currencyId = useStore(state => state.currencyId);
    const currency = useStore(state => state.currency);

    useEffect(() => {
        getCurrency();
    }, []);

    const getCurrency = async () => {
        try {
            const response = await CurrencyService.list();
            if (!currency) {
                const selectedCurrency = response.find(c => c.id === currencyId);
                useStore.setState({ currency: selectedCurrency });
            }
            setCurrencies(response);
        } catch (error) {
            // enqueueSnackbar(translate('common.message.error'), { variant: 'error' });
        }
    };

    const handleCurrencyChange = (newCurrencyId: string) => {
        const newCurrency = currencies.find(c => c.id === newCurrencyId);

        if (!newCurrency) return;

        updateCurrency(newCurrency);
    };

    const handleSidebarCollapseToggle = () => {
        const sidebarElement = document.getElementsByClassName('js-sidebar')[0];
        const sidebarToggleElement = document.getElementsByClassName('js-sidebar-toggle')[0];

        if (sidebarElement && sidebarToggleElement) {
            sidebarElement.classList.toggle('collapsed');
        }
    };

    return {
        currencies,
        currencyId,
        currency,
        handleCurrencyChange,
        handleSidebarCollapseToggle
    };
};
