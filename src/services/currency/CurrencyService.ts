import { CurrencyGetResponse } from '@/@types';
import { useCurrencyCrud } from './CurrencyCrud';

export const CurrencyService = {
    list: (): Promise<CurrencyGetResponse[]> => {
        const { list } = useCurrencyCrud();

        const response = list();

        // Mock
        return new Promise((resolve) => {
            resolve(response);
        });
    }
}
