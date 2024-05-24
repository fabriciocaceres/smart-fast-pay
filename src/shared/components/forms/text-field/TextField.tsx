import { useI18n } from '@/config';
import { FC } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';

interface TextFieldProps extends FormControlProps {
    name: string;
    label: string;
    inputClassName?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    placeholder?: string;
};


export const TextField: FC<TextFieldProps> = props => {
    const { name, label, inputClassName, required, rows, ...other } = props;

    const { control, register } = useFormContext();
    const { translate } = useI18n();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Form.Group className="fv-row" style={{marginBottom: 20}}>
                    <Form.Label className={`${required ? 'required' : ''}`}>{label}</Form.Label>
                    <Form.Control
                        className={inputClassName}
                        {...other}
                        rows={rows}
                        // error={!!error}
                        disabled={other.disabled}
                        placeholder={translate(other.placeholder || '')}
                        {...register(name, { required: required })}
                    />

                    {error && <Form.Text className="text-danger">{translate(error?.message || '')}</Form.Text>}
                </Form.Group>
            )}
        />
    );
};
