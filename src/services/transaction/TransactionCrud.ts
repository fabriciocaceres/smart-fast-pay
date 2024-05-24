import { TransactionCreateRequest, TransactionGetResponse } from '@/@types';
import { useLocalStorage } from '@/shared';
import { Guid } from 'guid-typescript';
import { mockTransactions } from '../mock';

export const useTransactionCrud = () => {
    const [transactions, setTransactions] = useLocalStorage('sfp@transactions', mockTransactions);

    const create = (data: TransactionCreateRequest) => {
        const newData = {
            ...data,
            id: Guid.create().toString(),
            createdAt: new Date().toISOString()
        }
        setTransactions([...transactions, newData]);
        return newData.id;
    }

    const list = () => {
        return transactions;
    }

    const listByCurrency = (currency: string) => {
        return transactions.filter((t:TransactionGetResponse) => t.currency === currency);
    }

    return {
        create,
        list,
        listByCurrency
    }

}
