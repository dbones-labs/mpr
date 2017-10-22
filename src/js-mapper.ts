import { Mapper } from "./Mapper";
import { Map  } from "./core/map";
import { Configuration } from "./configuration";
import { Dictionary } from "./dictionary";
import { MappingContext } from "./core/mapping-context";

export class JsMapper implements Mapper {

    _configuration: Configuration;

    constructor(configuration:Configuration, mappings: Map[]) {
        mappings.forEach(map => {
            let key = this.getKey(map.sourceType, map.destinationType);
            this._mappings.set(key, map);
        });

        this._configuration = configuration;
    }


    map(source: any, destinationType: string) {
        if(source == null) return source;
        if(destinationType == null) throw new Error("destinationType is null");

        let typeProperty = this._configuration.typeStrategy.getTypeFromTypeProperty(source);
        let sourceType = source[typeProperty];

        var key = this.getKey(sourceType, destinationType);
        var map = this._mappings.get(key);
        if(map == null) throw new Error(`mapping not supported, ${key}`);

        let ctx = this.createContext(source, null);
        map.converter.execute(ctx);
        return ctx.destination;
    }

    mapTo(source: any, destination: any) {
        if(source == null) return;
        if(destination == null) throw new Error("destination is null");

        let typeProperty = this._configuration.typeStrategy.getTypeFromTypeProperty(source);
        let sourceType = source[typeProperty];

        typeProperty = this._configuration.typeStrategy.getTypeFromTypeProperty(destination);
        let destinationType = destination[typeProperty];

        var key = this.getKey(sourceType, destinationType);
        var map = this._mappings.get(key);
        if(map == null) throw new Error(`mapping not supported, ${key}`);

        let ctx = this.createContext(source, null);
        map.converter.execute(ctx);
        return ctx.destination;
    }

    mapIt(sourceType: string, source: any, destinationType: string, destination: any) {
        if(source == null) return;

    }

    private createContext(source: any, destination: any){
        let ctx = new MappingContext();
        ctx.destination = destination;
        ctx.source = source;
        ctx.mapper = this;
        return ctx;
    }

}


class MapSeeker {

    _mappings: Dictionary<Map> = new Dictionary<Map>();

    _configuration: Configuration;

    constructor(configuration: Configuration, mappings: Map[]) {
        mappings.forEach(map => {
            let key = this.getKey(map.sourceType, map.destinationType);
            this._mappings.set(key, map);
        });

        this._configuration = configuration;
        
    }

    getMap(source: any, destinationType: string) {

    }

    private getPossibleType(item: any) {

        let type = typeof item;

        if (type === 'object') return Type.object;
        
        if (Array.isArray(item)) return Type.collection;

        let isValueType = 
            type === 'string'    
            || type === 'number'
            || type === 'boolean';

        if(isValueType) return Type.collection;

        throw new Error("no idea what this item is");
        
    }

    private getKey(source:string, destination: string): string {
        return `${source}->${destination}`;
    }

}

class TypeInfo {

    type: Type;
    name:string;

}

enum Type {
    valueOrString,
    collection,
    object
}
