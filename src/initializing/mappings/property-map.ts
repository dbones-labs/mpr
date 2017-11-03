/**
 * each class map should have seval property maps
 */
export class PropertyMap {
    
    flatternSourceToDestination = false;
    destinationType: string;
    
    sourceName: string;
    sourceGetter: (instance: any) => any;


    destinationName: string;
    destinationSetter: (instance: any, value: any) => void;
    ignoreDestination: boolean = false;

}