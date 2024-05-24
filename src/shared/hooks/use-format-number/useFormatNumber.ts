

export const useFormatNumber = () => {

    const formatCurrency = (number: string | number, code?: string, currency?: string) => {
        let result = parseFloat(`${number || '0'}`).toLocaleString(code ||'pt-br', { style: 'currency', currency: currency || 'BRL' });
     
        return result;
    }

    return {
        formatCurrency
    }
}
