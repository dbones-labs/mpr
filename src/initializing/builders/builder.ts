import { FluentTypeMapping } from '../fluent-type-mapping';
import { TypeMap } from "../mappings/type-map";
import { Dictionary } from "../../dictionary";
import { TypeMeta } from "../metas/type-meta";
import { PropertyBuilder } from "../builders/property-builder";
import { Configuration } from '../../configuration';
import { Constructor } from '../../strategies/ctor-strategy';

export class Builder {

    private _configuration: Configuration;

    mappings: TypeMap[] = [];
    typeMetas: Dictionary<TypeMeta> = new Dictionary<TypeMeta>();


    constructor(configuration: Configuration) {
        this._configuration = configuration;
    }

    /**
     * register the types which will be mapped.
     * @param typeName the name of the type i.e. 'models.todo'
     * @param type the types FUNCTION
     */
    addType(typeName: string | Constructor, type: Constructor = null): PropertyBuilder {

        if(typeof typeName != "string") {
            type = <Constructor>typeName;
            typeName = <string>(<any>typeName).$$type;
        }

        let meta = new TypeMeta(typeName);

        if (type != null) {
            meta.setType(type);
        }

        this.typeMetas.set(meta.name, meta);
        this.createMap(meta.name, meta.name);

        return new PropertyBuilder(meta, this._configuration);
    }


    /**
     * create a mapping between 2 classes.
     * @param sourceType the source type, i.e. 'models.Todo'
     * @param destinationType the destination type, i.e. 'resource.todo'
     */
    createMap<TSrc, TDest>(sourceType: string | Constructor, destinationType: string | Constructor): FluentTypeMapping<TSrc, TDest> {

        if(typeof sourceType != "string") {
            sourceType = <string>(<any>sourceType).$$type;
        }

        if(typeof destinationType != "string") {
            destinationType = <string>(<any>destinationType).$$type;
        }

        let map = new TypeMap(sourceType, destinationType);
        let config = new FluentTypeMapping<TSrc, TDest>(map);
        this.mappings.push(map);
        return config;
    }

}

