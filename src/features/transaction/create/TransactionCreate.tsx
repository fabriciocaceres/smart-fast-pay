import { CurrencyField, FormProvider, SelectField, TextField } from '@/components';
import { useI18n } from '@/config';
import { FC } from 'react';
import { Card, Col } from 'react-bootstrap';
import { useTransactionCreate } from './hooks/useTransactionCreate';

export const TransactionCreate: FC = () => {
    const { translate } = useI18n();

    const { form, onSubmit, currencies } = useTransactionCreate();

    const watchCurrency = form.watch('currency');
    console.log(watchCurrency);

    return (
        <div className="d-flex flex-column flex-column-fluid p-0">
            <div className="mb-3">
                <h1 className="h3 d-inline align-middle">{translate('transaction.new_transaction')}</h1>
            </div>
            <Card className="">
                <FormProvider methods={form} id="forms-form">
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
                            {/* 
                            <WiTextField
                                as="select"
                                name="scope"
                                label={translate('forms.fields.scope')}
                                placeholder={translate('forms.fields.scope')}
                                rows={4}
                            >
                                {Object.values(FormScope).map(value => (
                                    <option value={value}>{translate(`forms.scope.${value.toLowerCase()}`)}</option>
                                ))}
                            </WiTextField>

                            <WiTagField
                                name="labels"
                                label={translate('forms.fields.labels')}
                                placeholder={translate('forms.fields.labels')}
                            /> */}
                        </Col>
                    </Card.Body>
                </FormProvider>
            </Card>
        </div>
    );
};
