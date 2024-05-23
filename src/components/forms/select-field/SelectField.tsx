import { useI18n } from '@/config';
import { useMemo } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import Select from 'react-select';
import { StylesConfig } from "react-select/dist/declarations/src";

export type SelectOption<T> = {
    id: number | string;
    value: T,
    label: string
}

export type SelectProps<T> = {
    name: string;
    label: string;
    placeholder: string;
    inputClassName?: string;
    required?: boolean;
    disabled?: boolean;
    options?: SelectOption<T>[];
}

export const SelectField = <T,>(props: SelectProps<T>) => {

    const { name, label, inputClassName, required, ...other } = props;

    const { control, register } = useFormContext();
    const { translate } = useI18n();

    const styles: StylesConfig = useMemo(() => ({
        container: (_styles) => ({
            ..._styles,
            flex: 1,
        }),
        control: (_styles, state) => ({
            ..._styles, flex: 1,
            minHeight: 0,
            borderRadius: '0',
            boxShadow: 'none',
            border: 'none',
            ':hover': {
                border: 'none',
                boxShadow: 'none'
            },
            ':active': {
                border: 'none',
                boxShadow: 'none'
            },
        }),
        input: (base) => ({ ...base, margin: 0, paddingTop: 0, paddingBottom: 0 }),
        valueContainer: (base) => ({ ...base, padding: 0 }),
        dropdownIndicator: (base) => ({ ...base, padding: '0 8px' }),
        // option: (base) => ({ ...base}),
        menuPortal: (base) => ({ ...base, zIndex: 9999 })
    }), [])

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Form.Group className="fv-row mb-10" style={{marginBottom: 20}}>
                    <Form.Label className={`${required ? 'required' : ''}`}>{label}</Form.Label>
                    <Select
                        menuPortalTarget={document.body}
                        {...other}
                        className={`form-control ${inputClassName}`}
                        // error={!!error}
                        disabled={other.disabled}
                        styles={styles}
                        {...register(name, { required: required })}
                        {...field} />
                    {error && <Form.Text className="text-danger">{translate(error?.message || '')}</Form.Text>}
                </Form.Group>
            )}
        />
    );
}
