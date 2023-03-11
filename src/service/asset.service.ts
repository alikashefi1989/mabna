import { AssetEntity } from "../models/asset.model";
import { CrudService } from "./crud.service";

export class AssetService extends CrudService<AssetEntity, any, any>{
    crudBaseUrl = '/assets';
}