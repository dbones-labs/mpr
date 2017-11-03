import 'mocha';
import { MapperFactory } from "../../src/mapper-factory";
import { Setup } from "../../src/initializing/Setup";

import { expect } from "chai";
import { Builder } from '../../src/initializing/builders/builder';
import { Types } from '../../src/core/types';
import { Todo, Person, Priority } from './model';


class MapSetup implements Setup {
    configure(builder: Builder): void {

        builder.addType(Todo).scanForAttributes();
        builder.addType(Person).scanForAttributes();

        builder.addType("dto.todo")
            .addProperty("id", Types.string)
            .addProperty("created", Types.date)
            .addProperty("description", Types.string)
            .addProperty("priority", Types.number)
            .addProperty("comments", Types.AsArray(Types.string))
            .addProperty("owner", "dto.person");

        builder.addType("dto.person")
            .addProperty("name", Types.string);

        builder.createMap(Todo, "dto.todo");
        builder.createMap("dto.todo", Todo);

        builder.createMap(Person, "dto.person");
        builder.createMap("dto.person", Person);


    }
}


describe('automap - given type inforation is provided by annotations', () => {

    let mapperFactor = new MapperFactory();
    mapperFactor.addSetup(new MapSetup());

    let mapper = mapperFactor.createMapper();

    it("map simple object to anon", (done) => {

        let source = new Todo();
        source.id = "123";
        source.created = new Date(2017, 09, 17);
        source.description = "create a mapper";
        source.priority = Priority.medium;
        source.comments.push("comment 1");
        source.comments.push("comment 2");
        source.owner = new Person();
        source.owner.name = "dave";

        let destination = mapper.map(source, "dto.todo");

        expect(destination.id).to.equal(source.id);
        expect(destination.created.getTime()).to.equal(source.created.getTime());
        expect(destination.description).to.equal(source.description);
        expect(destination.priority).to.equal(source.priority);
        expect(destination.comments[0]).to.equal("comment 1");
        expect(destination.comments[1]).to.equal("comment 2");
        expect(destination.owner.name).to.equal(source.owner.name);

        done();

    });


    it("map simple anon to type", (done) => {

        let source = {
            id: "123",
            created: new Date(2017, 09, 17),
            description: "map a anon object to a known type",
            priority: 2,
            comments: ["comment a","comment b"],
            $type: "dto.todo",
            owner: {
                name: "bob",
                $type: "dto.person"
            }
        }

        let destination = mapper.map(source, Todo);

        expect(destination.$type).to.equal("models.todo");
        expect(destination.id).to.equal(source.id);
        expect(destination.created.getTime()).to.equal(source.created.getTime());
        expect(destination.description).to.equal(source.description);
        expect(destination.priority).to.equal(source.priority);
        expect(destination.owner.name).to.equal(source.owner.name)

        done();

    });

});



