import { BaseEntityModel } from "./baseEntity.model";

export interface BidaskEntity extends BaseEntityModel {
    value: {
        end_date_time?: string;
        instrument?: {
            id: string;
            meta: {
                type: string;
            }
        };
        orders: Array<{
            ask_count: number;
            ask_price: number;
            ask_volume: number;
            order_rank: number;
        }>;
        start_date_time?: string;
    }
}