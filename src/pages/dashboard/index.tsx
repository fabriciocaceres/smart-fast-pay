// @ts-nocheck
import { CurrencyGetResponse, TransactionGetResponse } from '@/@types';
import { useI18n, useStore } from '@/config';
import { useFormatDateTime, useFormatNumber } from '@/helper';
import { CurrencyService, TransactionService } from '@/services';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

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
    const { fDate } = useFormatDateTime();
    const { fCurrency } = useFormatNumber();
    const { translate } = useI18n();
    const currencyId = useStore((state) => state.currencyId);

    const fetchTransactions = async () => {
        try {
            const response = await TransactionService.listByCurrency(currencyId);
            setTransactions(response);
            const totalsByDate = response.reduce((totals, transaction) => {
                const date = fDate(transaction.date);
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
            <h1 className="h3 mb-3">Dashboard</h1>

            {/* <div className="row">
                <div className="col-xl-6 col-xxl-5 d-flex">
                    <div className="w-100">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col mt-0">
                                                <h5 className="card-title">Sales</h5>
                                            </div>

                                            <div className="col-auto">
                                                <div className="stat text-primary">
                                                    <i className="align-middle" data-feather="truck"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="mt-1 mb-3">2.382</h1>
                                        <div className="mb-0">
                                            <span className="text-danger">
                                                {' '}
                                                <i className="mdi mdi-arrow-bottom-right"></i> -3.65%{' '}
                                            </span>
                                            <span className="text-muted">Since last week</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col mt-0">
                                                <h5 className="card-title">Visitors</h5>
                                            </div>

                                            <div className="col-auto">
                                                <div className="stat text-primary">
                                                    <i className="align-middle" data-feather="users"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="mt-1 mb-3">14.212</h1>
                                        <div className="mb-0">
                                            <span className="text-success">
                                                {' '}
                                                <i className="mdi mdi-arrow-bottom-right"></i> 5.25%{' '}
                                            </span>
                                            <span className="text-muted">Since last week</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col mt-0">
                                                <h5 className="card-title">Earnings</h5>
                                            </div>

                                            <div className="col-auto">
                                                <div className="stat text-primary">
                                                    <i className="align-middle" data-feather="dollar-sign"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="mt-1 mb-3">$21.300</h1>
                                        <div className="mb-0">
                                            <span className="text-success">
                                                {' '}
                                                <i className="mdi mdi-arrow-bottom-right"></i> 6.65%{' '}
                                            </span>
                                            <span className="text-muted">Since last week</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col mt-0">
                                                <h5 className="card-title">Orders</h5>
                                            </div>

                                            <div className="col-auto">
                                                <div className="stat text-primary">
                                                    <i className="align-middle" data-feather="shopping-cart"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="mt-1 mb-3">64</h1>
                                        <div className="mb-0">
                                            <span className="text-danger">
                                                {' '}
                                                <i className="mdi mdi-arrow-bottom-right"></i> -2.25%{' '}
                                            </span>
                                            <span className="text-muted">Since last week</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-xxl-7">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Recent Movement</h5>
                        </div>
                        <div className="card-body py-3">
                            <div className="chart chart-sm">
                                <canvas id="chartjs-dashboard-line"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div className="row">
                <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Browser Usage</h5>
                        </div>
                        <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                                <div className="py-3">
                                    <div className="chart chart-xs">
                                        <canvas id="chartjs-dashboard-pie"></canvas>
                                    </div>
                                </div>

                                <table className="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td>Chrome</td>
                                            <td className="text-end">4306</td>
                                        </tr>
                                        <tr>
                                            <td>Firefox</td>
                                            <td className="text-end">3801</td>
                                        </tr>
                                        <tr>
                                            <td>IE</td>
                                            <td className="text-end">1689</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Real-Time</h5>
                        </div>
                        <div className="card-body px-4">
                            <div id="world_map" style={{ height: 350 }}></div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
                    <div className="card flex-fill">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Calendar</h5>
                        </div>
                        <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                                <div className="chart">
                                    <div id="datetimepicker-dashboard"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="row">
                <div className="col-12 d-flex">
                    <Card className="flex-fill">
                        <Card.Header>
                            <h5 className="card-title mb-0">Balanço</h5>
                        </Card.Header>
                        <Card.Body className="chart chart-lg">
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
                        <Card.Body className="d-flex w-100">
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
                                            <td>{fDate(transaction.date)}</td>
                                            <td>
                                                {fCurrency(
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
