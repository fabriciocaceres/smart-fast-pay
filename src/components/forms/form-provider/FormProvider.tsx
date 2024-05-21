import { FC, ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

interface FormProviderProps {
    id: string;
    children: ReactNode;
    methods: UseFormReturn<any>;
    onSubmit?: VoidFunction;
};

export const FormProvider: FC<FormProviderProps> = (props) => {

    const { 
        id,
        children, 
        methods,
        onSubmit
    } = props;

    return (
        <Form {...methods}>
            <form id={id} onSubmit={onSubmit} noValidate>{children}</form>
        </Form>
    );
}
