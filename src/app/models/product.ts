export interface Link {
    domainName: string;
    domainLogo: string;
    productLink: string;
    price: number;
    rating: number;
}
  
export interface Product {
    productId?: number;
    productName_Global?: string;
    productDescription_Global?: string;
    subCategoryName?: string;
    brandName?: string;
    category?: string;
    lastUpdated?: string;
    lastScraped?: string;
    images?: string[];
    links?: Link[];
}
  