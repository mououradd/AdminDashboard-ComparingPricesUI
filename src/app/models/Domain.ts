// app/models/model.model.ts

// Define the Brand interface
export interface Domain {
    id:number;
  name_Local: string;
  name_Global: string;
  description_Local: string;
  description_Global: string;
  url: string;
  logo: string;


}
 export interface DomainProductsCountDTO{
    domainName: string;
    productCount: number;
 }


