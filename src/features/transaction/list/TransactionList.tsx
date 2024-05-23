import { SpinnerOverlay } from '@/components';
import { useI18n } from '@/config';
import { useFormatDateTime, useFormatNumber } from '@/helper';
import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import useTransactionList from './hooks/useTransactionList';

export interface TransactionCreateRequest {
    description?: string;
    amount: number;
    currency: string;
    date: string;
}
interface TransactionListProps {}

const TransactionList: React.FC<TransactionListProps> = () => {
    const { transactions, currencies, loading, goToNewTransaction } = useTransactionList();
    const { fDate } = useFormatDateTime();
    const {fCurrency} =useFormatNumber();
    const { translate } = useI18n();

    return (
        <div className="d-flex flex-column flex-column-fluid p-0">
            <div className="mb-3 d-flex justify-content-between">
                <h1 className="h3 d-inline align-middle">{translate('transaction.transactions')}</h1>
                <Button variant="primary" onClick={goToNewTransaction}>
                    {translate('transaction.new_transaction')}
                </Button>
            </div>
            <Card className="">
                <SpinnerOverlay show={loading} />
                <Card.Body>
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
                                    <td>{fCurrency(transaction.amount, currencies[transaction.currency].code, currencies[transaction.currency].currency)}</td>
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
                {/* <Pagination>
                {[...Array(Math.ceil(transactions.length / itemsPerPage))].map((e, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handleClick(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination> */}
            </Card>
        </div>
    );
};

export default TransactionList;
