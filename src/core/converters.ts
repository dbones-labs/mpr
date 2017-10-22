import {MappingContext} from './mapping-context';

import { TypeConverter } from "./type-converter";
import { Types } from './types';


export class Converts {

    getConverters() {
        return [
            <TypeConverter>new ArrayConverter(),
            <TypeConverter>new ValueArrayConverter(),
            
            <TypeConverter>new StringToStringConverter(),

            <TypeConverter>new NumberToNumberConverter(),
            <TypeConverter>new NumberToStringConverter(),
            <TypeConverter>new StringToNumberConverter(),
            
            <TypeConverter>new DateToDateConverter(),
            <TypeConverter>new StringToDateConverter(),
            
            <TypeConverter>new ValueToValueConverter() 
        ];
    }

}

/**
 * a catch all for a collection of things.
 */
class ArrayConverter implements TypeConverter {
    sourceType: string = Types.objectArray;
    destinationType: string = Types.objectArray;
    execute(ctx: MappingContext) {
        
        if(ctx.destination == null) ctx.destination = [];

        (<any[]>ctx.source).forEach(item=> {
            let value = ctx.mapper.map(item, Types.unknown);
            ctx.destination.push(value);
        });

        return ctx.destination;
    }
}


/**
 * a catch all for a collection of things.
 */
class ValueArrayConverter implements TypeConverter {
    sourceType: string = 'value[]';
    destinationType: string = 'value[]';
    execute(ctx: MappingContext) {
        
        if(ctx.destination == null) ctx.destination = [];

        (<any[]>ctx.source).forEach(item=> {
            let value = ctx.mapper.map(item, Types.value);
            ctx.destination.push(value);
        });

        return ctx.destination;
    }
}


/**
 * this is a catch all for value types, such as boolean, number, string, datetime etc.
 */
class ValueToValueConverter implements TypeConverter {
    sourceType: string = Types.value;
    destinationType: string = Types.value;
    execute(context: MappingContext) {
        return context.source;
    }
    
}


class StringToStringConverter implements TypeConverter {
    sourceType: string = Types.string;
    destinationType: string = Types.string;
    execute(ctx: MappingContext) {
        return ctx.source;
    }
}

class NumberToNumberConverter implements TypeConverter {
    sourceType: string = Types.number;
    destinationType: string = Types.number;
    execute(ctx: MappingContext) {
        return ctx.source;
    }
}

class StringToNumberConverter implements TypeConverter {
    sourceType: string = Types.string;
    destinationType: string = Types.number;
    execute(ctx: MappingContext) {
        if(ctx.source == null) return null;
        return parseInt(ctx.source);
    }
}

class NumberToStringConverter implements TypeConverter {
    sourceType: string = Types.number;
    destinationType: string = Types.string;
    execute(ctx: MappingContext) {
        if(ctx.source == null) return null;
        return ctx.source.toString();
    }
}

class DateToDateConverter implements TypeConverter {
    sourceType: string = Types.date;
    destinationType: string = Types.date;
    execute(ctx: MappingContext) {
        return ctx.source;
    }
}

class StringToDateConverter implements TypeConverter {
    sourceType: string = Types.string;
    destinationType: string = Types.date;
    execute(ctx: MappingContext) {
        if(ctx.source == null) return null;
        return new Date(ctx.source);
    }
}

