import 'mocha';
import { MapperFactory } from "../src/mapper-factory";
import { Setup } from "../src/initializing/Setup";

import { expect } from "chai";
import { Builder } from '../src/initializing/builders/builder';
import { Types } from '../src/core/types';
import { mapClass } from '../src/annotations/map-class';
import { mapProperty } from '../src/annotations/map-property';


@mapClass('model.todo')
class Todo {

    @mapProperty()
    id: string;

    @mapProperty()
    created: Date;

    @mapProperty()
    description: string;

    @mapProperty()
    priority: Priority

}

enum Priority {
    low,
    medium,
    high
}


class MapSetup implements Setup {
    configure(builder: Builder): void {

        //register type (in also the mapping to its self)
        builder.addType(Todo).scanForAttributes();
    }
}


describe('copy', () => {

    let mapperFactor = new MapperFactory();
    mapperFactor.addSetup(new MapSetup());

    let mapper = mapperFactor.createMapper();

    it("create copies instances", (done) => {

        
        let source = new Todo();
        source.id = "123";
        source.created = new Date(2017, 09, 17);
        source.description = "create a mapper";
        source.priority = Priority.medium;

        let source2 = new Todo();
        source2.id = "2332";
        source2.created = new Date(2007, 09, 17);
        source2.description = "hmmmm";
        source2.priority = Priority.low;

        let destination = mapper.map([source, source2], Types.asArray(Todo));

        expect(destination.length).to.equal(2);

        expect(destination[0]).not.to.equal(source);
        expect(destination[0].id).to.equal(source.id);
        expect(destination[0].created.getTime()).to.equal(source.created.getTime());
        expect(destination[0].description).to.equal(source.description);
        expect(destination[0].priority).to.equal(source.priority);

        expect(destination[1]).not.to.equal(source2);
        expect(destination[1].id).to.equal(source2.id);
        expect(destination[1].created.getTime()).to.equal(source2.created.getTime());
        expect(destination[1].description).to.equal(source2.description);
        expect(destination[1].priority).to.equal(source2.priority);

        done();

    });


});



