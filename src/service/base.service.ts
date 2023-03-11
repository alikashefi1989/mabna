import Axios, { AxiosInstance } from "axios";

export abstract class BaseService {

    constructor() {
        this.axiosInstance = Axios.create();
        this.axiosInstance.defaults.baseURL = process.env.REACT_APP_ENDPOINT as string;
        this.axiosInstance.defaults.headers['Content-Type'] = 'application/json';
    }

    protected axiosInstance: AxiosInstance;

    get getAxiosInstance(): AxiosInstance {
        delete (this.axiosInstance.defaults.headers['authorization'])

        let _getAxiosInstance: AxiosInstance = this.axiosInstance;

        // this.set_401_interceptors(axiosInstanceWithToken);
        _getAxiosInstance.interceptors.response.use(
            function (response) {
                // Any status code that line within the range of 2xx cause this function to trigger
                // Do something with response data
                return response;
            },
            function (error) {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                return Promise.reject(error);
            }
        );

        return _getAxiosInstance;
    }
}