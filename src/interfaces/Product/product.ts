import { ApiResponse } from "../Common/apiRespone";

// Product API response riêng
export type ProductApiResponse<T> = ApiResponse<T> & {
  total_stock_by_product?: number;
}

export type Attribute = {  
  attribute_id: number;  
  attribute_value: string;
  attribute_name: string;
  is_increase: boolean;
  max_exit_inventory: number;
  min_exit_inventory: number;
  price_adjustment: number; 
}

// Types for GET response data
export type Vat = {
  vat_id: number;
  country_id: number;
  company_id: number | null;
  value: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: number;
}

export type UserCreate = {
  user_id: number;
  company_id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  is_admin: number;
  email_verified_at: string | null;
}

export type MaintenanceResponse = {
  id: number;
  product_id: number;
  name: string;
  period: number;
  type_id: number;
}

export type WarrantyResponse = {
  id: number;
  product_id: number;
  name: string;
  period: number;
  type_id: number;
}

export type CommissionResponse = {
  commission_id: number;
  company_id: number;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    commission_id: number;
    promotion_rate: string;
    type_of_promotion: number;
  };
}

export type UnitInfo = {
  unit_id: number;
  company_id: number;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export type ProductUnit = {
  product_unit_id: number;
  unit_name: string;
  unit_id: number;
  product_id: number;
  is_advance_unit: number;
  conversion_value: number;
  parent_id: number | null;
  price: string;
  sold_price_before_tax: string;
  sold_price_after_tax: string;
  last_price: string | null;
  min_exist_inventory: string;
  max_exist_inventory: string;
  weight_id: number;
  specific_weight_product: string | null;
  status: number;
  is_delete: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  units: UnitInfo;
  inventories: any[];
  product_attributes: any[];
}
export type Commission = {
  commission_id: number;
  promotion_rate: number;
  type_of_promotion: number;
}
export type Maintenances = {
  name: string;
  period: number;
  type: number;
}
export type Warranty = {
  name: string;
  period: number;
  type: number;
}

export type Unit = {
  is_advance_unit: boolean;
  max_exit_inventory: number;
  min_exit_inventory: number;
  price_adjustment: number;
  unit_id: number;
  weight_id: number;
  price: number;
  sold_price_after_tax: number;
  sold_price_before_tax: number;
  attributes: Attribute[];
}
export type Product = {
  id: number;
  product_id: number;
  bar_code: number;
  bill_note: string;
  description: string;
  brand_id: number;
  category_id: number;
  commission: Commission[];
  images: [];
  maintenances: Maintenances[];
  name: string;
  position_id: number;
  product_code: string;
  sale_direct: boolean;
  shopping_points: boolean;
  status: boolean;
  units: Unit[];
  warranties: Warranty[];
  vat_id: number;
}

// Product response for GET API
export type ProductResponse = {
  product_id: number;
  name: string;
  bar_code: string;
  product_code: string;
  images: string[];
  status: number;
  category_id: number;
  company_id: number;
  vat_id: number;
  brand_id: number;
  position_id: number;
  price: number;
  slug: string;
  shopping_points: number;
  user_created_id: number;
  last_user_updated_id: number | null;
  sale_direct: number;
  is_delete: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  vat: Vat;
  user_create: UserCreate;
  user_update: UserCreate | null;
  maintenances: MaintenanceResponse[];
  warrantys: WarrantyResponse[];
  commissions: CommissionResponse[];
}
export type ProductData = {
  id: number;
  product_id: number;
  product_unit_id: number;
  product_attributes_id: number | null;
  product_attribute_id: number | null;
  is_delete: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  on_hand: number;
  products: ProductResponse;
  product_unit: ProductUnit;
  product_attribute: Attribute | null;
}