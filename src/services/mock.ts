import { TransactionGetResponse } from '@/@types';

const date = new Date();

function addDate(day: number) {
    return new Date(date.setDate(day)).toJSON();
}

export const mockTransactions: TransactionGetResponse[] = [
    {
        id: '1',
        amount: 100,
        currency: '5f85b8db-b53f-4e88-9c3b-2acfffd90b59',
        createdAt: new Date().toJSON(),
        date: addDate(-1)
    },
    {
        id: '2',
        amount: 200,
        currency: '5f85b8db-b53f-4e88-9c3b-2acfffd90b59',
        createdAt: new Date().toISOString(),
        date: addDate(-1)
    },
    {
        id: '3',
        amount: 300,
        currency: '5f85b8db-b53f-4e88-9c3b-2acfffd90b59',
        createdAt: new Date().toISOString(),
        date: addDate(1)
    },
    {
        id: '4',
        amount: 400,
        currency: '5f85b8db-b53f-4e88-9c3b-2acfffd90b59',
        createdAt: new Date().toISOString(),
        date: addDate(1)
    },
    {
        id: '5',
        amount: 500,
        currency: '5f85b8db-b53f-4e88-9c3b-2acfffd90b59',
        createdAt: new Date().toISOString(),
        date: date.toJSON()
    },
    {
        id: '6',
        amount: 500,
        currency: 'af59e476-be68-4594-9cf3-31712d2d8421',
        createdAt: new Date().toISOString(),
        date: date.toJSON()
    },
    {
        id: '7',
        amount: 100,
        currency: 'af59e476-be68-4594-9cf3-31712d2d8421',
        createdAt: new Date().toISOString(),
        date: addDate(1)
    },
    {
        id: '8',
        amount: 300,
        currency: 'af59e476-be68-4594-9cf3-31712d2d8421',
        createdAt: new Date().toISOString(),
        date: addDate(1)
    },
    {
        id: '9',
        amount: 50,
        currency: 'af59e476-be68-4594-9cf3-31712d2d8421',
        createdAt: new Date().toISOString(),
        date: addDate(-1)
    }
];

export const mockCurrencies = [
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
]
