import { CurrencyGetResponse } from '@/@types';
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
            if(!currency) {
                const selectedCurrency = response.find(c => c.id === currencyId);
                useStore.setState({ currency: selectedCurrency });
            }

            setCurrencies(response);
        } catch (error) {
            // enqueueSnackbar(translate('common.message.error'), { variant: 'error' });
        }
    }

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        useStore.setState({ currencyId: event.target.value });
    };

    return {
        currencies,
        currencyId,
        currency,
        handleCurrencyChange
    };
}
