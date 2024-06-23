// Define the Brand interface
export interface Brand {
  id:number;
  name_Local: string;
  name_Global: string;
  description_Local: string;
  description_Global: string;
  logo: string;
  categories: Category[];
}

// Define the Category interface
export interface Category {
  name_Local: string;
  name_Global: string;
  brands: Brand[];
}