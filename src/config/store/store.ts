import { CurrencyGetResponse } from '@/@types';
import { create } from 'zustand';

interface Store {
    currencyId: string;
    currency: CurrencyGetResponse | null
}

export const useStore = create<Store>(() => ({
    currencyId: '5f85b8db-b53f-4e88-9c3b-2acfffd90b59',
    currency: null
}))
