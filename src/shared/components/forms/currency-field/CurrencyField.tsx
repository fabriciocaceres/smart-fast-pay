import { useI18n } from '@/config';
import clsx from 'clsx';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

interface CurrencyFieldProps {
    name: string;
    label: string;
    inputClassName?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    prefix?: string;
}

const defaultMaskOptions = {
    prefix: '$',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2, 
    allowNegative: false,
    allowLeadingZeroes: false
};

export const CurrencyField: FC<CurrencyFieldProps> = props => {
    const { name, label, inputClassName, required, prefix, ...other } = props;
    const { control, setValue, getFieldState, formState, trigger, register } = useFormContext();
    const { isSubmitted } = useFormState();
    const { translate } = useI18n();

    const maskOptions = {
        ...defaultMaskOptions,
        prefix: prefix || defaultMaskOptions.prefix
    };

    const handleChange = (value: string) => {
        setValue(name, value);
        triggerTextField();
    };

    const triggerTextField = () => {
        if (!isSubmitted) return;

        trigger(name);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Form.Group className="fv-row" style={{ marginBottom: 20 }}>
                    <Form.Label className={`${required ? 'required' : ''}`}>{label}</Form.Label>
                    <MaskedInput
                        mask={createNumberMask(maskOptions)}
                        className={clsx('form-control', inputClassName)}
                        {...other}
                        {...field}
                        placeholder={translate(other.placeholder || '')}
                        disabled={other.disabled}
                        required={required}
                        {...register(name, { required: required })}
                        value={field.value || ''}
                        onChange={e => {
                            handleChange(e.target.value);
                        }}
                    />
                    {error && <Form.Text className="text-danger">{translate(error?.message || '')}</Form.Text>}
                </Form.Group>
            )}
        />
    );
};
