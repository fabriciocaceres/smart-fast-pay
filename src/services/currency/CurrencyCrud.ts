import { useLocalStorage } from '@/helper';
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
