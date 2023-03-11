import { BaseEntityModel } from "./baseEntity.model";

export interface AssetEntity extends BaseEntityModel {
    value: {
        english_short_title?: string;
        english_title?: string;
        english_trade_symbol?: string;
        short_title?: string;
        title?: string;
        trade_symbol?: string;
    }
}