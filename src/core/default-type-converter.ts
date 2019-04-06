import { MappingContext } from "./mapping-context";
import { TypeConverter } from "./type-converter";
import { CtorStrategy } from "../strategies/ctor-strategy";

export class DefaultTypeConverter implements TypeConverter {
    sourceType: string;
    destinationType: string;

    setters: Setter[];

    ctor: CtorStrategy;

    constructor(sourceType: string, destinationType: string, ctor: CtorStrategy, setters: Setter[]) {
        this.sourceType = sourceType;
        this.destinationType = destinationType;
        this.setters = setters;
        this.ctor = ctor;
    }


    execute(context: MappingContext): void {

        if (context.destination == null)
            context.destination = this.ctor.createInstance();


        this.setters.forEach(setter => {
            let ctx = context;
            try {
                setter(ctx);
            } catch (error) {
                throw new Error(`failed to map ${this.sourceType} => ${this.destinationType}, innerException: ${error}`);
            }

        });

    }
}


export interface Setter {
    (ctx: MappingContext): void;
}