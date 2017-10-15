
import { TypeStrategy, DefaultTypeStrategy } from "./strategies/type-strategy";

export class Configuration {
    typeStrategy: TypeStrategy = new DefaultTypeStrategy();

}