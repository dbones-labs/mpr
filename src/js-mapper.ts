import { MapInformation } from './core/map-information';
import { AdvancedMapper } from "./Mapper";
import { Configuration } from "./configuration";
import { MappingContext } from "./core/mapping-context";
import { TypeConverter } from "./core/type-converter";
import { TypeConverterLocator } from "./core/type-converter-locator";
import { TypeReflection, DefaultTypeReflection } from "./strategies/type-reflection";
import { Constructor } from './strategies/ctor-strategy';

export class JsMapper implements AdvancedMapper {
    
    private _configuration: Configuration;
    private _typeConverterLocator: TypeConverterLocator;
    private _typeReflection: TypeReflection;

    /**
     * create a mapper, do not use this directly, create this class via the MapperFactory class.
     * @param configuration the configuration to be used by this mapper
     * @param typeConverters the type converters this mapper will use
     */
    constructor(configuration: Configuration, typeConverters: TypeConverter[]) {
        this._configuration = configuration;
        this._typeConverterLocator = configuration.typeConverterLocator;
        this._typeReflection = new DefaultTypeReflection();

        typeConverters.forEach(converter => {
            this._typeConverterLocator.add(converter);
        });
    }


    map(source: any, destinationType: string | Constructor): any {
        if (source == null) return source;
        if (destinationType == null) throw new Error("destinationType is null");

        if(typeof destinationType != "string") {
            destinationType = (<any>destinationType).$$type
        }


        let sourceType = this._typeReflection.getType(source, this._configuration.typeStrategy);
        let mapLookup = this._typeConverterLocator.getMapLookup(sourceType, <string>destinationType);
        let ctx = this.createContext(source, null, mapLookup);

        this.mapIt(ctx);
        return ctx.destination;
    }

    mapUsingTypes(source: any, sourceType: string | Constructor, destinationType: string | Constructor): any {
        
        if(typeof sourceType != "string") {
            sourceType = (<any>sourceType).$$type
        }
        if(typeof destinationType != "string") {
            destinationType = (<any>destinationType).$$type
        }

        let mapLookup = this._typeConverterLocator.getMapLookup(<string>sourceType, <string>destinationType);
        let ctx = this.createContext(source, null, mapLookup);

        this.mapIt(ctx);
        return ctx.destination;
    }

    mapTo(source: any, destination: any) {
        if (source == null) return;
        if (destination == null) throw new Error("destination is null");

        let sourceType = this._typeReflection.getType(source, this._configuration.typeStrategy);
        let destinationType = this._typeReflection.getType(source, this._configuration.typeStrategy);
        let mapLookup = this._typeConverterLocator.getMapLookup(sourceType, destinationType);
        let ctx = this.createContext(source, destination, mapLookup);

        this.mapIt(ctx);
    }

    mapToUsingTypes(source: any, sourceType: string | Constructor, destination: any, destinationType: string | Constructor): void {

        if(typeof sourceType != "string") {
            sourceType = (<any>sourceType).$$type
        }
        if(typeof destinationType != "string") {
            destinationType = (<any>destinationType).$$type
        }

        let mapLookup = this._typeConverterLocator.getMapLookup(<string>sourceType, <string>destinationType);
        let ctx = this.createContext(source, destination, mapLookup);

        this.mapIt(ctx);
    }

    mapIt(context: MappingContext) {
        let mapLookup = context.mapInformation;

        let converter = this._typeConverterLocator.getConverter(mapLookup);
        if (converter == null) throw new Error(`mapping not supported, ${mapLookup.source}->${mapLookup.destination}`);

        converter.execute(context);
        return context.destination;
    }

   

    private createContext(source: any, destination: any, mapInformation: MapInformation) {
        let ctx = new MappingContext();
        ctx.destination = destination;
        ctx.source = source;
        ctx.mapper = this;
        ctx.mapInformation = mapInformation;
        return ctx;
    }

    configuration(): Configuration {
        return this._configuration;
    }

}