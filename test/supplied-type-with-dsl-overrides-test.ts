import 'mocha';
import { MapperFactor } from "../src/mapper-factory";
import { Setup } from "../src/initializing/Setup";

import { expect } from "chai";
import { Builder } from '../src/initializing/builders/builder';
import { Types } from '../src/core/types';


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


class MapSetup implements Setup {
    configure(builder: Builder): void {

        builder.addType("models.todo", Todo)
            .addProperty("id", Types.string)
            .addProperty("created", Types.date)
            .addProperty("description", Types.string)
            .addProperty("priority", Types.number);

        builder.addType("dto.todo")
            .addProperty("id", Types.string)
            .addProperty("created", Types.date)
            .addProperty("description", Types.string)
            .addProperty("priority", Types.number);

        builder.createMap<Todo, any>("models.todo", "dto.todo")
            .forMember("description", opts => opts.mapFrom(src => `desc: ${src.description}`))
            .forMember("created", opts => opts.ignore());

        builder.createMap("dto.todo", "models.todo");

    }
}


describe('dsl - given type inforation is provided manually', () => {

    let mapperFactor = new MapperFactor();
    mapperFactor.addSetup(new MapSetup());

    let mapper = mapperFactor.createMapper();

    it("map simple object to anon", (done) => {

        let source = new Todo();
        source.id = "123";
        source.created = new Date(2017, 09, 17);
        source.description = "create a mapper";
        source.priority = Priority.medium;

        let destination = mapper.map(source, "dto.todo");

        expect(destination.id).to.equal(source.id);
        expect(destination.created).to.equal(undefined);
        expect(destination.description).to.equal(`desc: ${source.description}`);
        expect(destination.priority).to.equal(source.priority);

        done();

    });


    it("map simple anon to type", (done) => {

        let source = {
            id: "123",
            created: new Date(2017, 09, 17),
            description: "map a anon object to a known type",
            priority: 2,
            $type: "dto.todo"
        }

        let destination = mapper.map(source, "models.todo");

        expect(destination.$type).to.equal("models.todo");
        expect(destination.id).to.equal(source.id);
        expect(destination.created).to.equal(source.created);
        expect(destination.description).to.equal(source.description);
        expect(destination.priority).to.equal(source.priority);

        done();

    });


});



