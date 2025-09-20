export interface Attribute {
  id: number;
  name: string;
  value: string;
}

export interface Unit {
  id: number;
  name: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  attributes: Attribute[];
  unit: Unit[]
}
export interface ProductData {
    
}