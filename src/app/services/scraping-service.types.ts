export interface ScrapingData {
    productPostDTO: ProductPostDTO;
    productDetailDTO: ProductDetailDTO[];
    // productImageDTO: ProductImageDTO;
}

export interface ProductDetailDTO {
    prodId: number;
    domainId: number;
    productLink1: string;
    status: string;
    lastUpdated: Date;
    lastScraped: Date;
    id: number;
    name_Local: string;
    name_Global: string;
    description_Local: string;
    description_Global: string;
    price: number;
    rating: number;
    isAvailable: boolean;
    brand: string;
    images: string[];
}

export interface ProductImageDTO {
    images: string[];
}

export interface ProductPostDTO {
    name_Local: string;
    name_Global: string;
    description_Local: string;
    description_Global: string;
    subCategoryId: number;
    brandId: number;
}
