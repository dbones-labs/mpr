import 'mocha';
import { MapperFactor } from "../src/mapper-factory";
import { Setup } from "../src/initializing/Setup";

import { TypeConverterBase } from "../src/core/type-converter-base";
import { Mapper } from "../src/Mapper";
import { expect  } from "chai";
import { Builder } from '../src/initializing/builders/builder';

describe('convert via using with typeconverter', () => {

    let mapperFactor = new MapperFactor();
    mapperFactor.addSetup(new MapSetup());

    let mapper = mapperFactor.createMapper();

    it("map simple object", (done) => {

        let source = new Todo();
        source.id = "123";
        source.created = new Date(2017,09,17);
        source.description = "create a mapper";
        source.priority = Priority.medium;

        let destination = mapper.map(source, "dto.todo");
        
        expect(destination.id).to.equal(source.id);
        expect(destination.created).to.equal(source.created);
        expect(destination.description).to.equal(source.description);
        expect(destination.priority).to.equal(source.priority);

        done();

    });


});


class MapSetup implements Setup {
    configure(builder: Builder): void {

        builder.createMap("models.todo", "dto.todo")
            .using(new TodoModelToDtoConverter());

    }

}



class TodoModelToDtoConverter extends TypeConverterBase<Todo, any> {

    sourceType = "models.todo";
    destinationType = "dto.todo";

    convert(source: Todo, destination: any, mapper: Mapper) {
        if(destination == null) destination = {  };

        destination.id = source.id;
        destination.created = source.created;
        destination.description = source.description;
        destination.priority = source.priority;

        return destination;
    }
}


class Todo {

    id: string;

    created: Date;
    description: string;

    priority: Priority

    $type: string = 'models.todo';
}

enum Priority {
    high,
    medium,
    low
}
