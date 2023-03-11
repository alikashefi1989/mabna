export interface BaseEntityModel {
    entity: {
        id: string;
        meta: {
            type: string;
        }
    }
    id: string;
    meta: {
        insert_date_time: string;
        state: string;
        type: string;
        update_date_time: string;
        version: number;
    };
    type: string;
}