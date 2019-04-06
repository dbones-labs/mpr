import { MapInformation, MapComponent } from "./map-information";
import { TypeConverter } from "./type-converter";
import { Dictionary } from "../dictionary";
import { Types } from "./types";

export interface TypeConverterLocator {

    Add(typeConverter: TypeConverter): void;

    GetConverter(mapName: MapInformation): TypeConverter;

    GetMapLookup(sourceType: string, destinationType: string): MapInformation;
}



export class DefaultTypeConverterLocator implements TypeConverterLocator {

    private _nameExp = new RegExp("([\\.A-Za-z0-9\\-\\*]*)(\\[\\]){0,1}");
    private _mapsBySrcToDest: Dictionary<TypeConverter> = new Dictionary<TypeConverter>();

    Add(typeConverter: TypeConverter): void {
        let key = this.createKey(typeConverter.sourceType, typeConverter.destinationType);
        this._mapsBySrcToDest.set(key, typeConverter);
    }

    
    GetConverter(lookup: MapInformation): TypeConverter {

        let key = this.createKey(lookup.source.getName(), lookup.destination.getName());

        let converter = this._mapsBySrcToDest.get(key);
        if (converter != null) return converter;

        if (lookup.source.isArray == true && lookup.destination.isArray == true) {
            key = this.createKey(Types.objectArray, Types.objectArray);
            let converter = this._mapsBySrcToDest.get(key);
            if (converter != null) return converter;
        }

        throw new Error(`sorry key not supported ${key}`);
    }


    GetMapLookup(sourceType: string, destinationType: string): MapInformation {

        let source = this.getMapComponent(sourceType);
        let destination = this.getMapComponent(destinationType);

        return new MapInformation(source, destination);
    }

    private createKey(source: string, destination: string): string {
        return `${source}->${destination}`;
    }

    private getMapComponent(type: string) {
        let captures = this._nameExp.exec(type);

        let map = new MapComponent();
        map.type = captures[1];
        map.isArray = captures[2] != null;
        return map;
    }

}