import { BaseCreateUpdateResponse, TransactionCreateRequest, TransactionGetResponse } from '@/@types';
import { useTransactionCrud } from './TransactionCrud';

export const TransactionService = {
    create: (data: TransactionCreateRequest): Promise<BaseCreateUpdateResponse> => {
        // return axios.post(`${PATH_TRANSACTION}/`, data);
        const { create } = useTransactionCrud();

        const response = create(data);

        // Mock
        return new Promise((resolve) => {
            resolve({
                id: response,
                error: {
                    code: '000',
                    message: 'Success',
                },
            });
        });
    },

    list: (): Promise<TransactionGetResponse[]> => {
        const { list } = useTransactionCrud();

        const response = list();

        // Mock
        return new Promise((resolve) => {
            resolve(response);
        });
    },

    listByCurrency: (currency: string): Promise<TransactionGetResponse[]> => {
        const { listByCurrency } = useTransactionCrud();

        const response = listByCurrency(currency);

        // Mock
        return new Promise((resolve) => {
            resolve(response);
        });
    }
}
