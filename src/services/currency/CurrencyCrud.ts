import { useLocalStorage } from '@/helper';

export const useCurrencyCrud = () => {
    const [currencies, setCurrencies] = useLocalStorage('sfp-currencies', [
        {
            id: '5f85b8db-b53f-4e88-9c3b-2acfffd90b59',
            name: 'Real',
            symbol: 'R$',
            code: 'pt-br',
            currency: 'BRL',
            country: 'Brasil'
        },
        {
            id: 'af59e476-be68-4594-9cf3-31712d2d8421',
            name: 'Peso Colombiano',
            symbol: '$',
            code: 'es-CO',
            currency: 'COP',
            country: 'Colombia'
        },
    ]);

    const list = () => {
        return currencies;
    }

    return {
        list,
    }

}
