import { BaseEntityModel } from "./baseEntity.model";

export interface TradeEntity extends BaseEntityModel {
    value: {
        buyer_count?: number;
        close_price?: number;
        close_price_change?: number;
        close_price_change_percent?: number;
        end_date_time?: string;
        high_price?: number;
        instrument?: {
            id: string;
            meta: {
                type: string;
            }
        };
        low_price?: number;
        open_price?: number;
        start_date_time?: string;
        trade_count?: number;
        value?: number;
        volume?: number;
    }
}