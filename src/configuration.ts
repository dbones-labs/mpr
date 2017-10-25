import {TypeConverterLocator, DefaultTypeConverterLocator} from './core/type-converter-locator';

import { TypeStrategy, DefaultTypeStrategy } from "./strategies/type-strategy";
import { NamingConvention, CamelCaseNamingConvention } from "./strategies/naming-convention";
import { TypeConverter } from './core/type-converter';
import { Converts } from './core/converters';

export class Configuration {
    typeStrategy: TypeStrategy = new DefaultTypeStrategy();

    namingConvention: NamingConvention = new CamelCaseNamingConvention();

    typeConverterLocator: TypeConverterLocator = new DefaultTypeConverterLocator();

    typeConverters: TypeConverter[] = new Converts().getConverters();

}