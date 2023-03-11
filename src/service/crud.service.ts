import { ApiListResponseModel, ApiResponseModel } from '../models/apiResponse.model';
import { BaseService } from './base.service';

export abstract class CrudService<EntityModel, EntityCreateModel, EntityUpdateModel> extends BaseService {
    abstract crudBaseUrl: string;

    create(data: EntityCreateModel): Promise<ApiResponseModel<EntityModel>> {
        return this.getAxiosInstance.post(`${this.crudBaseUrl}`, data);
    }

    getAll(queryString?: string): Promise<ApiListResponseModel<EntityModel>> {
        let uri: string = this.crudBaseUrl;
        if (queryString && queryString !== '') {
            uri = uri + '?' + queryString;
        }
        return this.getAxiosInstance.get(`${uri}`);
    }

    get(id: string): Promise<ApiResponseModel<EntityModel>> {
        return this.getAxiosInstance.get(`${this.crudBaseUrl}/${id}`);
    }

    update(data: EntityUpdateModel, id: string): Promise<ApiResponseModel<EntityModel>> {
        return this.getAxiosInstance.put(`${this.crudBaseUrl}/${id}`, data);
    }

    delete(id: string): Promise<ApiResponseModel<any>> {
        return this.getAxiosInstance.delete(`${this.crudBaseUrl}/${id}`);
    }
}