import { Product, ProductData, ProductResponse, ProductApiResponse } from '../interfaces/Product/product';
import axiosBase from '../utils/axiosBase';
import { ApiResponse } from '../interfaces/Common/apiRespone';


//fetch all product filter

export const callFetchProductFilterApi = async (params?: Record<string, ProductData>) => {
      const response = await axiosBase.get<ProductApiResponse<ProductData[]>>('/product', { params });
      return response.data;
    
  }
  //Tạo resquestID cho các API post vào header của API
  export const callCreateProductAPI = (createData: Product) => {  
    return axiosBase.post<ApiResponse<ProductData>>(`/product`, { ...createData });
  }
  export const callUpdateProductAPI = (product_id:any,query: Product) => {
    const { ...updateData } = query;
    return axiosBase.put<ApiResponse<ProductData>>(`/product/${product_id}`, { ...updateData });
  }
  export const callUpdateStatusProductAPI = (product_id:any,query: Product) => {
    const { ...updateData } = query;
    return axiosBase.patch<ApiResponse<ProductData>>(`/product/${product_id}`, { ...updateData });
  }
  export const callDetailProductAPI = (query: Product) => {
    const { product_id } = query; 
    return axiosBase.get<ApiResponse<ProductData>>(`/product/${product_id}`, );
  }
  //update price unit
  export const callUpdatePriceUnitProductAPI = (product_id:any,query: Product) => {
    const { ...updateData } = query;
    return axiosBase.put<any>(`/updatetab2product/${product_id}`, { ...updateData });
  }
  //delete product detail
  export const callDeleteProductAPI = (query: Product) => {  
    const { product_id } = query; 
    return axiosBase.delete<ApiResponse<ProductData>>(`/product-detail/${product_id}`);
  }
  // delte attribute
  export const callDeleteAttributeProductAPI = (query: ProductData) => {
    const { product_attribute_id } = query;
    return axiosBase.delete<ApiResponse<ProductData>>(`/delete-product-attributes/${product_attribute_id}`);
  }
  //delete unit
  export const callDeleteUnitProductAPI = (query: ProductData) => {
    const { product_unit_id } = query;
    return axiosBase.delete<ApiResponse<ProductData>>(`//delete-product-unit/${product_unit_id}`);
  }
  //delete row truyền vào là 1 mảng id của các row cần xóa
  export const callDeleteRowProductAPI = (params:Record<string,ProductData>) => {
    return axiosBase.delete<ApiResponse<ProductData>>(`//product`, { params });
  }
  //update patch status
  export const callUpdatePatchStatusProductAPI = (query: ProductData) => {
    return axiosBase.patch<ApiResponse<ProductData>>(`//product/bulk-update-status`, { ...query });
  }
  //update categories
  export const callUpdateCategoriesProductAPI = (query: ProductData) => {
    return axiosBase.patch<ApiResponse<ProductData>>(`//product/bulk-update-categories`, { ...query });
  }
  //update vat
  export const callUpdateVATProductAPI = (query: ProductData) => {
    return axiosBase.patch<ApiResponse<ProductData>>(`//product/bulk-update-vats`, { ...query });
  }
  export const callAddvanceUpdateProductAPI = (product_id:any,query: ProductData) => {
    const { ...updateData } = query;
    return axiosBase.put<ApiResponse<ProductData>>(`/product/${product_id}/advanced`, { ...updateData });
  }
  export const callUpdateInformationProductAPI = (product_id:any,query: ProductData) => {
    const { ...updateData } = query;
      return axiosBase.put<ApiResponse<ProductData>>(`/product/${product_id}`, { ...updateData });
  }
  export const callUpdatePriceUnitAttributeProductAPI = (product_id:any,query: ProductData) => {
    const { ...updateData } = query;
    return axiosBase.put<ApiResponse<ProductData>>(`/product/${product_id}/price-unit-attribute`, { ...updateData });
  }
  export const callUpdateDescriptionProductAPI = (product_id:any,query: ProductData) => {
    const { ...updateData } = query;
    return axiosBase.put<ApiResponse<ProductData>>(`/productcontent/${product_id}`, { ...updateData });
  }
  export const callUpdateWarrantyMaintenanceProductAPI = (product_id:any,query: ProductData) => {
    const { ...updateData } = query;
    return axiosBase.put<ApiResponse<ProductData>>(`/product/${product_id}/warranty-maintenance`, { ...updateData });
  }
  // Filter Products by search query
  export const callFetchProductSearchApi = (query: ProductData) => {
    return axiosBase.get<ApiResponse<ProductData>>(`/product/${query}`);
  }

  export const callDescriptionFetchProductAPI = (product_id: ProductData) => {
    return axiosBase.get<ApiResponse<ProductData>>(`/productcontent/${product_id}`);
  }
  

