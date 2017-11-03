import 'mocha';
import { MapperFactory } from "../src/mapper-factory";
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

        builder.createMap("models.todo", "dto.todo");
        builder.createMap("dto.todo", "models.todo");

    }
}


describe('automap - given type inforation is provided manually', () => {

    let mapperFactor = new MapperFactory();
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
        expect(destination.created.getTime()).to.equal(source.created.getTime());
        expect(destination.description).to.equal(source.description);
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
        expect(destination.created.getTime()).to.equal(source.created.getTime());
        expect(destination.description).to.equal(source.description);
        expect(destination.priority).to.equal(source.priority);

        done();

    });

    it("map simple object to array of anon", (done) => {

        let source = new Todo();
        source.id = "123";
        source.created = new Date(2017, 09, 17);
        source.description = "create a mapper";
        source.priority = Priority.medium;

        let source2 = new Todo();
        source2.id = "1233";
        source2.created = new Date(2017, 09, 18);
        source2.description = "create a mapper 123";
        source2.priority = Priority.low;


        let destination = mapper.map([source, source2], "dto.todo[]");

        expect(Array.isArray(destination)).to.equal(true);
        expect(destination.length).to.equal(2);
        expect(destination[0].id).to.equal(source.id);
        expect(destination[0].created.getTime()).to.equal(source.created.getTime());
        expect(destination[0].description).to.equal(source.description);
        expect(destination[0].priority).to.equal(source.priority);

        expect(destination[1].id).to.equal(source2.id);
        expect(destination[1].created.getTime()).to.equal(source2.created.getTime());
        expect(destination[1].description).to.equal(source2.description);
        expect(destination[1].priority).to.equal(source2.priority);

        done();

    });


});



