import {FluentTypeMapping} from './fluent-type-mapping';
import { TypeMap } from "./mappings/type-map";

export class Builder {

    mappings: TypeMap[] = [];
    //typeMetas: TypeMeta[] = [];

    createMap<TSrc, TDest>(sourceType: string, destinationType: string): FluentTypeMapping<TSrc, TDest> {
        let map = new TypeMap(sourceType, destinationType);
        let config = new FluentTypeMapping(map);
        this.mappings.push(map);
        return config;
    }

}