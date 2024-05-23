import { useI18n } from '@/config';
import clsx from 'clsx';
import { FC } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import { Controller, useFormContext, useFormState } from 'react-hook-form';

interface DatePickerFieldProps extends FormControlProps {
    name: string;
    label: string;
    inputClassName?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    placeholder?: string;
}

export const DatePickerField: FC<DatePickerFieldProps> = props => {
    const { name, label, inputClassName, required, rows, ...other } = props;
    const { translate } = useI18n();

    const { control, setValue, getFieldState, formState, trigger, register } = useFormContext();
    const { isSubmitted } = useFormState();

    const handleChange = (date: Date) => {
        setValue(name, date);
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
                    {/* <Form.Control
                        className={inputClassName}
                        {...other}
                        rows={rows}
                        // error={!!error}
                        disabled={other.disabled}
                        placeholder={translate(other.placeholder || '')}
                        {...register(name, { required: required })}
                    /> */}
                    <Flatpickr
                        className={clsx('form-control', inputClassName, { 'is-invalid': error })}
                        placeholder={translate(other.placeholder || '')}
                        options={{
                            dateFormat: 'd/m/Y',
                            altInput: true,
                            altFormat: 'd/m/Y',
                            allowInput: true
                        }}
                        onChange={([date1]) => {
                            handleChange(date1);
                        }}
                    />

                    {error && <Form.Text className="text-danger">{translate(error?.message || '')}</Form.Text>}
                </Form.Group>
            )}
        />
    );
};
