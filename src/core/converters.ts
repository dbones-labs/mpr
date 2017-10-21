import {MappingContext} from './mapping-context';

import { TypeConverter } from "./type-converter";


export class Converts {

    getConverters() {
        return [
            new DateToDateConverter(),
            new NumberToNumberConverter(),
            new NumberToStringConverter(),
            new StringToDateConverter(),
            new StringToNumberConverter(),
            new StringToStringConverter(), 
        ];
    }

}

export class ArrayConverter implements TypeConverter {
    sourceType: string = '*[]';
    destinationType: '*[]';
    execute(ctx: MappingContext) {
        
        if(ctx.destination == null) ctx.destination = [];

        (<any[]>ctx.source).forEach(item=> {
            let value = ctx.mapper.map(item, '');
            ctx.destination.push(value);
        });

        return ctx.destination;
    }
}



export class StringToStringConverter implements TypeConverter {
    sourceType: string = 'string';
    destinationType: 'string';
    execute(ctx: MappingContext) {
        return ctx.source;
    }
}

export class NumberToNumberConverter implements TypeConverter {
    sourceType: string = 'number';
    destinationType: 'number';
    execute(ctx: MappingContext) {
        return ctx.source;
    }
}

export class StringToNumberConverter implements TypeConverter {
    sourceType: string = 'string';
    destinationType: 'number';
    execute(ctx: MappingContext) {
        if(ctx.source == null) return null;
        return parseInt(ctx.source);
    }
}

export class NumberToStringConverter implements TypeConverter {
    sourceType: string = 'number';
    destinationType: 'string';
    execute(ctx: MappingContext) {
        if(ctx.source == null) return null;
        return ctx.source.toString();
    }
}

export class DateToDateConverter implements TypeConverter {
    sourceType: string = 'Date';
    destinationType: 'Date';
    execute(ctx: MappingContext) {
        return ctx.source;
    }
}

export class StringToDateConverter implements TypeConverter {
    sourceType: string = 'string';
    destinationType: 'Date';
    execute(ctx: MappingContext) {
        if(ctx.source == null) return null;
        return new Date(ctx.source);
    }
}

