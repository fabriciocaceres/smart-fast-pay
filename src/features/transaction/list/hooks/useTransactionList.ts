import { CurrencyGetResponse, TransactionGetResponse } from '@/@types';
import { useI18n } from '@/config';
import { PATH } from '@/router';
import { CurrencyService, TransactionService } from '@/services';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useTransactionList = () => {
    const { translate } = useI18n();
    const [transactions, setTransactions] = useState<TransactionGetResponse[]>([]);
    const [currencies, setCurrencies] = useState<Record<string, CurrencyGetResponse>>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchTransactions();
        fetchCurrencies();
    }, []);

    const fetchCurrencies = async () => {
        try {
            const data = await CurrencyService.list();
            const currencyDict = data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
            setCurrencies(currencyDict);
        } catch (err) {
            enqueueSnackbar(translate('transaction.message.currency_list_error'), { variant: 'error' });
        }
    };

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const data = await TransactionService.list();
            setTransactions(data);
        } catch (err) {
            enqueueSnackbar(translate('common.message.list_error'), { variant: 'error' });
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    const goToNewTransaction = () => {
        navigate(PATH.transaction.new);
    }

    return { transactions, currencies, loading, goToNewTransaction };
};

export default useTransactionList;
