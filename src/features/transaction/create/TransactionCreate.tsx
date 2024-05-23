import { CurrencyField, DatePickerField, FormProvider, SelectField, TextField } from '@/components';
import { useI18n } from '@/config';
import { FC } from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTransactionCreate } from './hooks/useTransactionCreate';

export const TransactionCreate: FC = () => {
    const { translate } = useI18n();
    const navigate = useNavigate();

    const { form, onSubmit, currencies } = useTransactionCreate();

    const watchCurrency = form.watch('currency');

    return (
        <div className="d-flex flex-column flex-column-fluid p-0">
            <div className="mb-3">
                <h1 className="h3 d-inline align-middle">{translate('transaction.new_transaction')}</h1>
            </div>
            <Card className="">
                <FormProvider onSubmit={form.handleSubmit(onSubmit)} methods={form} id="transaction-form">
                    <Card.Body>
                        <Col className="w-50">
                            <SelectField
                                name="currency"
                                label={translate('transaction.field_currency')}
                                placeholder={translate('transaction.field_currency')}
                                options={currencies}
                                required
                            />

                            <CurrencyField
                                name="amount"
                                label={translate('transaction.field_amount')}
                                placeholder={translate('transaction.field_amount')}
                                required
                                prefix={watchCurrency ? watchCurrency?.value.symbol : '$'}
                            />

                            <TextField
                                as="textarea"
                                name="description"
                                label={translate('transaction.field_description')}
                                placeholder={translate('transaction.field_description')}
                                rows={4}
                                inputClassName="resize-none"
                            />
                            <DatePickerField
                                name="date"
                                label={translate('transaction.field_date')}
                                placeholder={translate('transaction.field_date')}
                                required
                            />
                        </Col>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-end">
                        <button type="reset" className="btn btn-secondary" onClick={() => {navigate(-1)}}>
                            {translate('common.cancel')}
                        </button>
                        <button type="submit" className="btn btn-primary ms-2" form="transaction-form">
                            {translate('common.save')}
                        </button>
                    </Card.Footer>
                </FormProvider>
            </Card>
        </div>
    );
};
