import { Map } from "../core/map";
import { FluentTypeMapping  } from "./fluent-type-mapping";

export class Builder {

    mappings: Map[] = [];

    createMap<TSrc, TDest>(sourceType: string, destinationType: string): FluentTypeMapping<TSrc, TDest> {
        let map = new Map(sourceType, destinationType);
        let config = new FluentTypeMapping(map);
        this.mappings.push(map);
        return config;
    }

}