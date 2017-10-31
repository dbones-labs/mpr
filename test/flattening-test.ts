import 'mocha';
import { MapperFactory } from "../src/mapper-factory";
import { Setup } from "../src/initializing/Setup";

import { expect } from "chai";
import { Builder } from '../src/initializing/builders/builder';
import { Types } from '../src/core/types';
import { mapClass } from '../src/annotations/map-class';
import { mapProperty } from '../src/annotations/map-property';


class TodoResourceCollection {

    Data: TodoResource[];

    $type= 'resource.collection<todo>'
}


class TodoResource {
    Id: string;
    
    Created: string;

    Description: string;

    Priority: number;

    $type= 'resource.todo'
}

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

class resourceTypes {
    static todoResourceType = "resource.todo";
    static todoResourceCollectionType = "resource.collection<todo>";
}

class MapSetup implements Setup {
    configure(builder: Builder): void {

        //register types
        builder.addType(Todo).scanForAttributes();

        

        builder.addType(resourceTypes.todoResourceType, TodoResource)
            .addProperty("Id", Types.string)
            .addProperty("Created", Types.date)
            .addProperty("Description", Types.string)
            .addProperty("Priority", Types.number);
        
        builder.addType(resourceTypes.todoResourceCollectionType, TodoResourceCollection)
            .addProperty("Data", Types.asArray("resource.todo"));

        //register maps
        builder.createMap<TodoResourceCollection, Todo[]>(resourceTypes.todoResourceCollectionType, Types.asArray(Todo))
            .withSource(src => src.Data, opt => opt.flattern());

        builder.createMap(TodoResource, Todo);

        builder.createMap<Todo[], TodoResourceCollection>(Types.asArray(Todo), resourceTypes.todoResourceCollectionType)
            .forMember("Data", opt => opt.mapFrom(src => src));

            builder.createMap(Todo, TodoResource);    
    }
}


describe('flatten', () => {

    let mapperFactor = new MapperFactory();
    mapperFactor.addSetup(new MapSetup());

    let mapper = mapperFactor.createMapper();

    it("map models collection to a resouce custom collection", (done) => {

        let source = new Todo();
        source.id = "123";
        source.created = new Date(2017, 09, 17);
        source.description = "create a mapper";
        source.priority = Priority.medium;

        let source2 = new Todo();
        source.id = "2332";
        source.created = new Date(2007, 09, 17);
        source.description = "hmmmm";
        source.priority = Priority.low;

        let destination = mapper.map([source, source2], resourceTypes.todoResourceCollectionType);

        expect(destination.Data.length).to.equal(2);
        expect(destination.Data[0].Id).to.equal(source.id);
        expect(destination.Data[0].Created).to.equal(source.created.toISOString());
        expect(destination.Data[0].Description).to.equal(source.description);
        expect(destination.Data[0].Priority).to.equal(source.priority);

        done();

    });


    it("map resouce custom collection to todo collection", (done) => {

        let source = new TodoResource();
        source.Id = "123";
        source.Created = new Date(2017, 09, 17).toISOString();
        source.Description = "create a mapper";
        source.Priority = 1;

        let source2 = new TodoResource();
        source.Id = "2332";
        source.Created = new Date(2007, 09, 17).toISOString();
        source.Description = "hmmmm";
        source.Priority = 0;

        let resouceCollection = new TodoResourceCollection();
        resouceCollection.Data = [source, source2];

        let destination = mapper.map(resouceCollection, Types.asArray(Todo));

        expect(destination.length).to.equal(2);
        expect(destination[0].id).to.equal(source.Id);
        expect(destination[0].created).to.equal(new Date(source.Created));
        expect(destination[0].description).to.equal(source.Description);
        expect(destination[0].priority).to.equal(source.Priority);

        done();

    });


});



