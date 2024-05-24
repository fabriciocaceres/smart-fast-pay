import { CurrencyGetResponse, TransactionGetResponse } from '@/@types';
import { useI18n, useStore } from '@/config';
import { TransactionService } from '@/services';
import { useFormatDateTime, useFormatNumber } from '@/shared';
import { FC, useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

interface Props {
    currencies: Record<string, CurrencyGetResponse>;
}

export const TransactionHistoryTable: FC<Props> = ({ currencies }) => {
    const { translate } = useI18n();
    const { formatDate } = useFormatDateTime();
    const { formatCurrency } = useFormatNumber();
    const [transactions, setTransactions] = useState<TransactionGetResponse[]>([]);
    const currencyId = useStore(state => state.currencyId);

    const fetchTransactions = async () => {
        try {
            const response = await TransactionService.listHistory(currencyId);
            setTransactions(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [currencyId]);

    return (
        <Card className="flex-fill w-100">
            <div className="card-header">
                <h5 className="card-title mb-0">{translate('dashboard.transaction_history')}</h5>
            </div>
            <Card.Body className="d-flex w-100" style={{ overflow: 'auto' }}>
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
    );
};
