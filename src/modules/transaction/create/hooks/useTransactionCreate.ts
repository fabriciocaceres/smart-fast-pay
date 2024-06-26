import { CurrencyGetResponse, TransactionCreateRequest } from '@/@types';
import { useI18n, useStore } from '@/config';
import { PATH } from '@/router';
import { CurrencyService, TransactionService } from '@/services';
import { SelectOption } from '@/shared';
//@ts-ignore
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TransactionFormType, useTransactionScheme } from './useTransactionScheme';


export const useTransactionCreate = () => {
    const currency = useStore((state) => state.currency);
    const navigate = useNavigate();
    const { translate } = useI18n();
    const { enqueueSnackbar } = useSnackbar();
    const [currencies, setCurrencies] = useState<SelectOption<CurrencyGetResponse>[]>([]);

    const { schema } = useTransactionScheme();

    const defaultValues: TransactionFormType = {
        amount: '',
        description: '',
        currency: currency ? {id: currency.id, label: currency.name+" ("+currency.symbol+")", value: currency } : null,
        date: ''
    }

    const form = useForm<TransactionFormType>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues
    });

    useEffect(() => {
        getCurrency();
    }, []);

    useEffect(() => {
        form.setValue('currency', currency ? {id: currency.id, label: currency.name+" ("+currency.symbol+")", value: currency } : null);
    }, [currency]);

    const getCurrency = async () => {
        try {
            const response = await CurrencyService.list();
            setCurrencies(response.map(item => ({id:item.id, label: item.name+" ("+item.symbol+")", value: item })));
        } catch (error) {
            enqueueSnackbar(translate('common.message.error'), { variant: 'error' });
        }
    }

    function unmaskValue(maskedValue: string): number {
        const unmaskedValue = maskedValue
            .replace(/\./g, '') // remove thousands separator
            .replace(',', '.') // replace decimal separator with a dot
            .replace('$', '') // remove suffix
            .replace('R$', ''); // remove suffix
    
        return Number(unmaskedValue);
    }
   
    const onSubmit = async (values: TransactionFormType) => {

        const body: TransactionCreateRequest = {
            description: values.description,
            amount: unmaskValue(values.amount),
            currency: values.currency?.id as string,
            date: values.date
        };

        try {

            await TransactionService.create(body);
            enqueueSnackbar(translate('common.message.create_success'));
            navigate(PATH.transaction.list);

        } catch (error) {
            enqueueSnackbar(translate('common.message.create_error'), { variant: 'error' });
        }
    }

    return {
        form,
        onSubmit,
        currencies
    }
};
