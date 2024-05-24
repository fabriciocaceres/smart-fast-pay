// @ts-nocheck
import { CurrencyGetResponse, TransactionGetResponse } from '@/@types';
import { useI18n, useStore } from '@/config';
import { CurrencyService, TransactionService } from '@/services';
import { useFormatDateTime, useFormatNumber } from '@/shared';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Helmet from 'react-helmet';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export const options = {
    responsive: true,
    scales: {
        y: {
            ticks: {
                callback: function (value, index, values) {
                    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
                }
            }
        }
    },
    plugins: {
        datalabels: {
            color: '#000',
            display: true,
            align: 'end',
            anchor: 'end',
            formatter: value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
        }
    }
};

export default function Home() {
    const [chartData, setChartData] = useState(null);
    const [transactions, setTransactions] = useState<TransactionGetResponse[]>([]);
    const [currencies, setCurrencies] = useState<Record<string, CurrencyGetResponse>>({});
    const { formatDate } = useFormatDateTime();
    const { formatCurrency } = useFormatNumber();
    const { translate } = useI18n();
    const currencyId = useStore((state) => state.currencyId);

    const fetchTransactions = async () => {
        try {
            const response = await TransactionService.listByCurrency(currencyId);
            setTransactions(response);
            const totalsByDate = response.reduce((totals, transaction) => {
                const date = formatDate(transaction.date);
                const amount = transaction.amount || 0;
                if (!totals[date]) {
                    totals[date] = 0;
                }

                totals[date] += amount;

                return totals;
            }, {});

            const labels = Object.keys(totalsByDate);
            const data = Object.values(totalsByDate);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Total do dia',
                        data: data,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1
                    }
                ]
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCurrencies = async () => {
        try {
            const data = await CurrencyService.list();
            const currencyDict = data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
            setCurrencies(currencyDict);
        } catch (err) {
            // enqueueSnackbar(translate('transaction.message.currency_list_error'), { variant: 'error' });
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [currencyId]);

    return (
        <div className="container-fluid p-0">
            <Helmet title="Smart Fast Pay | Dashboard" />
            <h1 className="h3 mb-3">Dashboard</h1>
            <div className="row">
                <div className="col-12 d-flex">
                    <Card className="flex-fill">
                        <Card.Header>
                            <h5 className="card-title mb-0">Balanço</h5>
                        </Card.Header>
                        <Card.Body className="chart chart-lg d-flex justify-content-center" style={{overflow: 'auto'}}>
                            {chartData && ( //@ts-ignore
                                <Bar options={options} data={chartData} />
                            )}
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 d-flex">
                    <Card className="flex-fill w-100">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Historico de transações</h5>
                        </div>
                        <Card.Body className="d-flex w-100" style={{overflow: 'auto'}}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>{translate('transaction.table.date')}</th>
                                        <th>{translate('transaction.table.amount')}</th>
                                        <th>{translate('transaction.table.currency')}</th>
                                        <th>{translate('transaction.table.description')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td>{formatDate(transaction.date)}</td>
                                            <td>
                                                {formatCurrency(
                                                    transaction.amount,
                                                    currencies[transaction.currency].code,
                                                    currencies[transaction.currency].currency
                                                )}
                                            </td>
                                            <td>
                                                {currencies[transaction.currency]
                                                    ? currencies[transaction.currency].name +
                                                      ' (' +
                                                      currencies[transaction.currency].symbol +
                                                      ')'
                                                    : ''}
                                            </td>
                                            <td>{transaction.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}
