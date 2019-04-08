import 'mocha';
import { MapComponent, MapInformation } from '../../src/core/map-information';
import { MappingContext } from '../../src/core/mapping-context';
import { AdvancedMapper } from '../../src/mapper';
import { MapperFactory } from "../../src/mapper-factory";
import { Setup } from "../../src/initializing/Setup";

import { expect } from "chai";
import { Builder } from '../../src/initializing/builders/builder';
import { Types } from '../../src/core/types';
import { mapClass } from '../../src/annotations/map-class';
import { mapProperty } from '../../src/annotations/map-property';


class TodoResourceCollection {

    Data: TodoResource[];

    $type = 'resource.collection.todo'
}


class TodoResource {
    Id: string;

    Created: string;

    Description: string;

    Priority: number;

    $type = 'resource.todo'
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
    static todoResourceCollectionType = "resource.collection.todo";
}

class MapSetup implements Setup {
    configure(builder: Builder): void {

        //register types
        builder.addType(Todo).scanForAttributes();

        builder.addType<TodoResource>(resourceTypes.todoResourceType, TodoResource)
            .addProperty(x => x.Id, Types.string)
            .addProperty(x => x.Created, Types.string)
            .addProperty(x => x.Description, Types.string)
            .addProperty(x => x.Priority, Types.number);

        builder.addType<TodoResourceCollection>(resourceTypes.todoResourceCollectionType, TodoResourceCollection)
            .addProperty(x => x.Data, Types.asArray(resourceTypes.todoResourceType));

        //register maps
        builder.createMap<TodoResourceCollection, Todo[]>(resourceTypes.todoResourceCollectionType, Types.asArray(Todo))
            .withSource(src => src.Data, opt => opt.flattern());

        builder.createMap(resourceTypes.todoResourceType, Todo);

        builder.createMap<Todo[], TodoResourceCollection>(Types.asArray(Todo), resourceTypes.todoResourceCollectionType)
            .forMember(x => x.Data, opt => opt.mapFrom(src => src));

        builder.createMap(Todo, resourceTypes.todoResourceType);
    }
}


describe('flatten', () => {

    let mapperFactor = new MapperFactory();
    mapperFactor.addSetup(new MapSetup());

    let mapper = mapperFactor.createMapper();
    let advancedMapper = <AdvancedMapper>mapper;

    it("map models collection to a resource custom collection", (done) => {

        
        let source = new Todo();
        source.id = "123";
        source.created = new Date(2017, 9, 17);
        source.description = "create a mapper";
        source.priority = Priority.medium;

        let source2 = new Todo();
        source2.id = "2332";
        source2.created = new Date(2007, 9, 17);
        source2.description = "hmmmm";
        source2.priority = Priority.low;

        let src = new MapComponent();
        src.type = (<any>Todo).$$type;
        src.isArray = true;
        
        let dest = new MapComponent()
        dest.type = resourceTypes.todoResourceCollectionType;

        let info = new MapInformation(src, dest);

        let context = new MappingContext();
        context.source = [source, source2];
        context.mapInformation = info;
        context.mapper = advancedMapper;
        
        advancedMapper.mapIt(context);
        let destination = context.destination;

        expect(destination.Data.length).to.equal(2);
        expect(destination.Data[0].Id).to.equal(source.id);
        expect(destination.Data[0].Created).to.equal(source.created.toISOString());
        expect(destination.Data[0].Description).to.equal(source.description);
        expect(destination.Data[0].Priority).to.equal(source.priority);


        expect(destination.Data[1].Id).to.equal(source2.id);
        expect(destination.Data[1].Created).to.equal(source2.created.toISOString());
        expect(destination.Data[1].Description).to.equal(source2.description);
        expect(destination.Data[1].Priority).to.equal(source2.priority);


        done();

    });


    it("map resouce custom collection to todo collection", (done) => {

        let source = new TodoResource();
        source.Id = "123";
        source.Created = new Date(2017, 9, 17).toISOString();
        source.Description = "create a mapper";
        source.Priority = 1;

        let source2 = new TodoResource();
        source2.Id = "2332";
        source2.Created = new Date(2007, 9, 17).toISOString();
        source2.Description = "hmmmm";
        source2.Priority = 0;

        let resourceCollection = new TodoResourceCollection();
        resourceCollection.Data = [source, source2];

        let destination = mapper.map(resourceCollection, Types.asArray(Todo));

        expect(destination.length).to.equal(2);
        expect(destination[0].id).to.equal(source.Id);
        expect(destination[0].created.getTime()).to.equal(new Date(source.Created).getTime());
        expect(destination[0].description).to.equal(source.Description);
        expect(destination[0].priority).to.equal(source.Priority);

        expect(destination[1].id).to.equal(source2.Id);
        expect(destination[1].created.getTime()).to.equal(new Date(source2.Created).getTime());
        expect(destination[1].description).to.equal(source2.Description);
        expect(destination[1].priority).to.equal(source2.Priority);

        done();

    });


});



