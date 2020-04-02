import axios from "axios";
import Config from "../../../config";

interface IMakeRequestParams {
    method: "GET" | "POST";
    url: string;
    params?: object;
    headers?: object;
}

abstract class BaseController {

    protected makeRequest<T = any>({ method, params = {}, headers = {}, url }: IMakeRequestParams) {
        return axios.request<T>({
            method,
            url: `${Config.BASE_URL}${url}`,
            data: params,
            headers,
        })
    }
}

export default BaseController;
