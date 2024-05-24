import { CurrencyGetResponse } from '@/@types';
import { useI18n } from '@/config';
import { CurrencyService } from '@/services';

import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { BalanceChartCard } from './components/BalanceChartCard';
import { TransactionHistoryTable } from './components/TransactionHistoryTable';

export default function Dashboard() {
    const [currencies, setCurrencies] = useState<Record<string, CurrencyGetResponse>>({});
    const { enqueueSnackbar } = useSnackbar();
    const { translate } = useI18n();

    const fetchCurrencies = async () => {
        try {
            const data = await CurrencyService.list();
            const currencyDict = data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
            setCurrencies(currencyDict);
        } catch (err) {
            enqueueSnackbar(translate('common.message.currency_list_error'), { variant: 'error' });
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    return (
        <div className="container-fluid p-0">
            <Helmet title="Smart Fast Pay | Dashboard" />
            <h1 className="h3 mb-3">Dashboard</h1>
            <div className="row">
                <div className="col-12 d-flex">
                    <BalanceChartCard currencies={currencies} />
                </div>
                <div className="col-12 d-flex">
                    <TransactionHistoryTable currencies={currencies} />
                </div>
            </div>
        </div>
    );
}
