export interface FeaturedProduct {
    productId: number;
    productName_Local: string;
    productName_Global: string;
    productDescription_Local: string;
    productDescription_Global: string;
    subCategoryName: string;
    brandName: string;
    lastUpdated: string;
    lastScraped: string;
    images: string;
    links: Link[];
    minPrice: number;
    minPriceDomainLogo: string;
    minPriceBrandName: string;
    domainCount: number;
}

export interface Link {
    domainName: string;
    domainLogo: string;
    productLink: string;
    price: number;
    rating: number;
}
