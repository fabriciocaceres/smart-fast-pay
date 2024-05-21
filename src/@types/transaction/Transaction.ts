import { BaseGetResponse } from '../base/BaseCrud';

export interface TransactionCreateRequest { 
    description?: string;
    amount: number;
    currency: string;
    date: string;
}

export interface TransactionGetResponse extends BaseGetResponse, TransactionCreateRequest { }

