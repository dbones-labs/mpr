export interface TypeStrategy {
    getTypeProperty(instance: any): string;
}

export class DefaultTypeStrategy implements TypeStrategy {
    getTypeProperty(instance: any): string {
        let typeName = null;
        typeName = instance['$type'];
        if (typeName != null) return typeName;

        typeName = instance['_type'];
        if (typeName != null) return typeName;

    }
}