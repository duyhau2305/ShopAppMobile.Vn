
import axiosBase from '../utils/axiosBase';


//fetch all product filter

export const callFetchProductFilterApi = async (params?: Record<string, any>) => {
      const response = await axiosBase.get<any>('api/v1/product', { params });
      return response.data;
    
  }
  //Tạo resquestID cho các API post vào header của API
  export const callCreateProductAPI = (createData: any) => {  
    return axiosBase.post<any>(`api/v1/product`, { ...createData });
  }
  export const callUpdateProductAPI = (product_id:any,query: any) => {
    const { ...updateData } = query;
    return axiosBase.put<any>(`api/v1/product/${product_id}`, { ...updateData });
  }
  export const callUpdateStatusProductAPI = (product_id:any,query: any) => {
    const { ...updateData } = query;
    return axiosBase.patch<any>(`api/v1/product/${product_id}`, { ...updateData });
  }
  export const callDetailProductAPI = (query: any) => {
    const { product_id } = query; 
    return axiosBase.get<any>(`api/v1/product/${product_id}`, );
  }
  //update price unit
  export const callUpdatePriceUnitProductAPI = (product_id:any,query: any) => {
    const { ...updateData } = query;
    return axiosBase.put<any>(`api/v1/updatetab2product/${product_id}`, { ...updateData });
  }
  //delete product detail
  export const callDeleteProductAPI = (query: any) => {  
    const { product_id } = query; 
    return axiosBase.delete<any>(`api/v1/product-detail/${product_id}`);
  }
  // delte attribute
  export const callDeleteAttributeProductAPI = (query: any) => {
    const { product_attribute_id } = query;
    return axiosBase.delete<any>(`api/v1/delete-product-attributes/${product_attribute_id}`);
  }
  //delete unit
  export const callDeleteUnitProductAPI = (query: any) => {
    const { product_unit_id } = query;
    return axiosBase.delete<any>(`/api/v1/delete-product-unit/${product_unit_id}`);
  }
  //delete row truyền vào là 1 mảng id của các row cần xóa
  export const callDeleteRowProductAPI = (params:Record<string,any>) => {
    return axiosBase.delete<any>(`/api/v1/product`, { params });
  }
  //update patch status
  export const callUpdatePatchStatusProductAPI = (query: any) => {
    return axiosBase.patch<any>(`/api/v1/product/bulk-update-status`, { ...query });
  }
  //update categories
  export const callUpdateCategoriesProductAPI = (query: any) => {
    return axiosBase.patch<any>(`/api/v1/product/bulk-update-categories`, { ...query });
  }
  //update vat
  export const callUpdateVATProductAPI = (query: any) => {
    return axiosBase.patch<any>(`/api/v1/product/bulk-update-vats`, { ...query });
  }
  export const callAddvanceUpdateProductAPI = (product_id:any,query: any) => {
    const { ...updateData } = query;
    return axiosBase.put<any>(`api/v1/product/${product_id}/advanced`, { ...updateData });
  }
  export const callUpdateInformationProductAPI = (product_id:any,query: any) => {
    const { ...updateData } = query;
    return axiosBase.put<any>(`api/v1/product/${product_id}`, { ...updateData });
  }
  export const callUpdatePriceUnitAttributeProductAPI = (product_id:any,query: any) => {
    const { ...updateData } = query;
    return axiosBase.put<any>(`api/v1/product/${product_id}/price-unit-attribute`, { ...updateData });
  }
  export const callUpdateDescriptionProductAPI = (product_id:any,query: any) => {
    const { ...updateData } = query;
    return axiosBase.put<any>(`api/v1/productcontent/${product_id}`, { ...updateData });
  }
  export const callUpdateWarrantyMaintenanceProductAPI = (product_id:any,query: any) => {
    const { ...updateData } = query;
    return axiosBase.put<any>(`api/v1/product/${product_id}/warranty-maintenance`, { ...updateData });
  }
  // Filter Products by search query
  export const callFetchProductSearchApi = (query: string) => {
    return axiosBase.get<any>(`api/v1/product/${query}`);
  }
  export const callDescriptionFetchProductAPI = (product_id:any) => {
    return axiosBase.get<any>(`api/v1/productcontent/${product_id}`);
  }
  

