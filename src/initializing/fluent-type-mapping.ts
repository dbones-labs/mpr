import { Map } from "../core/map";
import { TypeConverter } from "../core/type-converter";

export class FluentTypeMapping<TSrc, TDest> {

    private _map: Map;
    constructor(map: Map) {
        this._map = map;
    }

    using(converter: TypeConverter) {
        if(converter == null) throw new Error("converter empty");
        this._map.converter = converter;
    }
    
}