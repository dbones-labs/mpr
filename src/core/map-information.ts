export class MapInformation {

    constructor(src: MapComponent, dest: MapComponent) {
        this.source = src;
        this.destination = dest;
    }

    source: MapComponent;
    destination: MapComponent;

}

export class MapComponent {
    type: string;
    isArray: boolean = false;

    getName() {
        return (this.isArray)
            ? `${this.type}[]`
            : this.type;
    }
}