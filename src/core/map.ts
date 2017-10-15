import { TypeConverter } from "./type-converter";

export class Map {

    converter: TypeConverter;

    sourceType: string;

    destinationType: string;

    constructor(sourceType: string, destinationType: string) {
        this.destinationType = destinationType;
        this.sourceType = sourceType;
    }

}