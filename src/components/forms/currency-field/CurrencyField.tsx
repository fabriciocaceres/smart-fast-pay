import { useI18n } from '@/config';
import clsx from 'clsx';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';
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
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 7, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false
};

export const CurrencyField: FC<CurrencyFieldProps> = props => {
    const { name, label, inputClassName, required, prefix, ...other } = props;
    // const [currencyMask, setCurrencyMask] = useState<any>(
    //     createNumberMask({
    //         ...defaultMaskOptions,
    //         prefix: prefix || defaultMaskOptions.prefix
    //     })
    // );

    const { control, register } = useFormContext();
    const { translate } = useI18n();

    const currencyMask = createNumberMask(defaultMaskOptions);

    // useEffect(() => {
    //     if (prefix) {
    //         setCurrencyMask(
    //             createNumberMask({
    //                 ...defaultMaskOptions,
    //                 prefix: prefix
    //             })
    //         );
    //     }
    // }, [prefix]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Form.Group className="fv-row" style={{ marginBottom: 10 }}>
                    <Form.Label className={`${required ? 'required' : ''}`}>{label}</Form.Label>
                    <MaskedInput
                        prefix={prefix}
                        mask={currencyMask}
                        className={clsx('form-control', inputClassName)}
                        {...other}
                        {...field}
                        placeholder={translate(other.placeholder || '')}
                        disabled={other.disabled}
                        required={required}
                        {...register(name, { required: required })}
                    />
                    {error && <Form.Text className="text-danger">{translate(error?.message || '')}</Form.Text>}
                </Form.Group>
            )}
        />
    );
};
