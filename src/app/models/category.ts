// app/models/category.model.ts

// Define the Brand interface
export interface Brand {
    id: number;
    name_Local: string;
    name_Global: string;
    description_Local: string | null;
    description_Global: string | null;
    Logo: string | null;
    logoUrl: string ,
    categoryId: number;
}

// Define the SubCategory interface
export interface SubCategory {
    id: number;
    name_Local: string;
    name_Global: string;
    categoryId: number;
}

// Define the Category interface
export interface Category {
    id: number;
    name_Local: string;
    name_Global: string;
    brands: Brand[];
    subCategories: SubCategory[];
}
