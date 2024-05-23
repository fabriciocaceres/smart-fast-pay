import { CurrencyGetResponse } from '@/@types';
import { useStore } from '../store';

export function updateCurrency(currency: CurrencyGetResponse) {
    useStore.setState({ currencyId: currency.id, currency});
    localStorage.setItem("sfp@currency", JSON.stringify(currency));
}
