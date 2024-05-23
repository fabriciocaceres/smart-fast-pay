import numeral from "numeral";


export const useFormatNumber = () => {

    const fCurrency = (number: string | number, code?: string, currency?: string) => {
        let result = parseFloat(`${number || '0'}`).toLocaleString(code ||'pt-br', { style: 'currency', currency: currency || 'BRL' });
     
        return result;
    }

    const fPercent = (number: number) => {
        return numeral(number / 100).format('0.0%');
    }

    const fNumber = (number: string | number) => {
        return numeral(number).format();
    }

    const fShortenNumber = (number: string | number) => {
        return numeral(number).format('0.00a').replace('.00', '');
    }

    const fData = (number: string | number) => {
        return numeral(number).format('0.0 b');
    }

    const fCurrencyToNumber = (value: string) => {
        return parseFloat(value.split(' ')[1].replaceAll('.', '').replaceAll(',', '.'));
    }

    return {
        fCurrency,
        fPercent,
        fNumber,
        fShortenNumber,
        fData,
        fCurrencyToNumber
    }
}
