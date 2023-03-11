import { TradeEntity } from "../models/trade.model";
import { CrudService } from "./crud.service";

export class TradeService extends CrudService<TradeEntity, any, any>{
    crudBaseUrl = '/trades';
}