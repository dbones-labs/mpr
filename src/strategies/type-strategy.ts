export interface TypeStrategy {
    getTypeFromTypeProperty(instance: any): string;
}

export class DefaultTypeStrategy implements TypeStrategy {
    getTypeFromTypeProperty(instance: any): string {
        let typeName = null;

        typeName = instance['$type'];
        if (typeName != null) return typeName;

        typeName = instance['_type'];
        if (typeName != null) return typeName;
        return null;

    }
}

export class DollarTypeStrategy implements TypeStrategy {
    getTypeFromTypeProperty(instance: any): string {
        let typeName = instance['$type'];
        return typeName;
    }
}


export class UnderscoreTypeStrategy implements TypeStrategy {
    getTypeFromTypeProperty(instance: any): string {
        let typeName = instance['_type'];
        return typeName;

    }
}