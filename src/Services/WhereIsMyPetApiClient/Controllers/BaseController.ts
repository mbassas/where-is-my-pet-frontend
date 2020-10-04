import axios from "axios";
import Config from "../../../config";
import $WhereIsMyPetApiClient from "../WhereIsMyPetApiClient";

interface IMakeRequestParams {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    url: string;
    params?: object;
    queryParams?: object;
    headers?: object;
}

abstract class BaseController {
    private authHeader() {
        const token = $WhereIsMyPetApiClient.getToken();

        if (!token) {
            return {};
        }

        return {
            authorization: `Bearer ${token}`,
        };
    }

    protected makeRequest<T = any>({ method, params = {}, headers = {}, url, queryParams = {} }: IMakeRequestParams) {
        return axios.request<T>({
            method,
            url: `${Config.BASE_URL}${url}`,
            data: params,
            params: queryParams,
            headers: {
                ...headers,
                ...this.authHeader()
            },
        })
    }
}

export default BaseController;
