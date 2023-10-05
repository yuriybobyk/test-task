import {AxiosResponse} from "axios";
import {IProduct} from "../interfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";

const productService = {
    getAllProduct: (): Promise<AxiosResponse<IProduct[]>> => axiosService.get(urls.products),
    getProducById: (id: number): Promise<AxiosResponse<IProduct>> => axiosService.get(`${urls.products}/${id}`),
    getProductByCategory:(category:string): Promise<AxiosResponse<IProduct[]>> =>axiosService.get(`${urls.products}/category${category}`)

}
export {productService}
