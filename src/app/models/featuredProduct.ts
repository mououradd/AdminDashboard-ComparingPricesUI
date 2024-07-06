export interface FeaturedProduct {
    isFavorite: any;
    productId: number;
    productName_Local: string;
    productName_Global: string;
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
}
