export interface Mapper {
    map(source: any, destinationType: string) : any;
    mapTo(source: any, destination: any) : any;
}