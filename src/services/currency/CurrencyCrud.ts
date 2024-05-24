import { useLocalStorage } from '@/shared';
import { mockCurrencies } from '../mock';

export const useCurrencyCrud = () => {
    const [currencies, setCurrencies] = useLocalStorage('sfp@currencies', mockCurrencies);

    const list = () => {
        return currencies;
    }

    return {
        list,
    }

}
