/**
 * each class map should have seval property maps
 */
export class PropertyMap {
    
    sourceName: string;
    sourceGetter: (instance: any) => any;
    ignoreSource: boolean = false;

    destinationName: string;
    destinationSetter: (instance: any, value: any) => void;
    ignoreDestination: boolean = false;

}