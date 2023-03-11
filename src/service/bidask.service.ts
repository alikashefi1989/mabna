import { BidaskEntity } from "../models/bidask.model";
import { CrudService } from "./crud.service";

export class BidaskService extends CrudService<BidaskEntity, any, any>{
    crudBaseUrl = '/trades';
}