import { CurrencyGetResponse } from '@/@types';
import { SelectOption } from '@/components';
import * as Yup from 'yup';

export interface TransactionFormType {
    description?: string;
    amount: string;
    currency: SelectOption<CurrencyGetResponse> | null;
    date: string;
}

export const useTransactionScheme = () => {
    const schema = Yup.object<TransactionFormType>().shape({
        description: Yup.string().notRequired(),
        amount: Yup.string().required('common.error.required_field'),
        currency: Yup.object().required('common.error.required_field')
    });

    return {
        schema
    };
};
