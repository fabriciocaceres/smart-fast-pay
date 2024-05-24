import { CurrencyGetResponse, TransactionGetResponse } from '@/@types';
import { useI18n, useStore } from '@/config';
import { TransactionService } from '@/services';
import { useFormatDateTime } from '@/shared';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useSnackbar } from 'notistack';
import { FC, useEffect, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
    currencies: Record<string, CurrencyGetResponse>;
}

export const BalanceChartCard: FC<Props> = ({ currencies }) => {
    const { translate } = useI18n();
    const currency = useStore(state => state.currency);
    const [chartData, setChartData] = useState(null);
    const chartOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        //@ts-ignore
                        callback: function (value, index, values) {
                            return new Intl.NumberFormat(currency?.code || 'pt-BR', {
                                style: 'currency',
                                currency: currency?.currency || 'BRL'
                            }).format(value);
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
                    //@ts-ignore
                    formatter: value =>
                        new Intl.NumberFormat(currency?.code || 'pt-BR', {
                            style: 'currency',
                            currency: currency?.currency || 'BRL'
                        }).format(value)
                }
            }
        }),
        [currency]
    );
    const { formatDate } = useFormatDateTime();
    const { enqueueSnackbar } = useSnackbar();

    const fetchTransactions = async () => {
        try {
            const response = await TransactionService.listByCurrency(currency?.id as string);
            configChartData(response);
        } catch (error) {
            enqueueSnackbar(translate('common.message.transaction_list_error'), { variant: 'error' });
        }
    };

    const configChartData = (transactions: TransactionGetResponse[]) => {
        const totalsByDate = transactions.reduce((totals: { [key: string]: number }, transaction) => {
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
            //@ts-ignore
            labels: labels,
            datasets: [
                {
                    label: translate('dashboard.chart.total_day'),
                    data: data,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1
                }
            ]
        });
    };

    useEffect(() => {
        fetchTransactions();
    }, [currency]);

    return (
        <Card className="flex-fill">
            <Card.Header>
                <h5 className="card-title mb-0">{translate('dashboard.balance')}</h5>
            </Card.Header>
            <Card.Body className="chart chart-lg d-flex justify-content-center" style={{ overflow: 'auto' }}>
                {chartData && (
                    //@ts-ignore
                    <Bar options={chartOptions} data={chartData} />
                )}
            </Card.Body>
        </Card>
    );
};
