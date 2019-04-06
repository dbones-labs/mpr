import { Setup } from "./initializing/setup";
import { JsMapper } from "./js-mapper";
import { Mapper } from "./Mapper";
import { Configuration } from "./configuration";
import { DefaultMapCompiler, MapCompiler } from "./strategies/map-compiler";
import { Builder } from "./initializing/builders/builder";

export class MapperFactory {

    private _builder: Builder;
    private _config: Configuration = new Configuration();
    mapCompiler: MapCompiler = new DefaultMapCompiler();

    constructor() {
        this._builder = new Builder(this._config);
    }


    addSetup(setup: Setup) {
        setup.configure(this._builder);
        return this;
    }

    setConfiguration(setupConfig: (config: Configuration) => void) {
        setupConfig(this._config);
        return this;
    }


    createMapper(): Mapper {

        //setup id support.
        this._builder.typeMetas.keys.forEach(metaKey => {
            let meta = this._builder.typeMetas.get(metaKey);
            let getter = this._config.idStrategy.getIdGetter(meta);
            if (getter == null) return;
            this._config.idLocator.setId(meta.name, getter);
        });

        //setup the converters from the user
        let converters = this._builder.mappings.map(mapping => {
            return this.mapCompiler.Build(mapping, this._builder.typeMetas, this._config);
        });

        //get the default converters
        this._config.typeConverters.forEach(converter => {
            converters.push(converter);
        });

        return new JsMapper(this._config, converters);
    }
}