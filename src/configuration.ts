import {TypeConverterLocator, DefaultTypeConverterLocator} from './core/type-converter-locator';

import { TypeStrategy, DefaultTypeStrategy } from "./strategies/type-strategy";
import { NamingConvention, CamelCaseNamingConvention } from "./strategies/naming-convention";

export class Configuration {
    typeStrategy: TypeStrategy = new DefaultTypeStrategy();

    namingConvention: NamingConvention = new CamelCaseNamingConvention();

    typeConverterLocator: TypeConverterLocator = new DefaultTypeConverterLocator();

}