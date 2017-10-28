import { mapClass } from "../../src/annotations/map-class";
import { mapProperty } from "../../src/annotations/map-property";
import { Types } from "../../src/core/types";


@mapClass('models.person')
export class Person {

    @mapProperty()
    name:string;
}

@mapClass('models.todo')
export class Todo {

    @mapProperty()
    id: string;

    @mapProperty()
    created: Date;

    @mapProperty()
    description: string;

    @mapProperty()
    priority: Priority

    @mapProperty()
    owner:Person;

    @mapProperty(Types.string)
    comments: string[] = [];
}



export enum Priority {
    high,
    medium,
    low
}
