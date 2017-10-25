#mpr = object mapper

JavaScript/TypeScript library that maps a source object to a destination object.

Give it a whirl, it may just work for you.

##Features 

* auto-mapping (requires registering of typeMeta)
* mapping overriding via dsl (loosely based on Automapper from .NET)
* modular setup
* support for es6 classes, and anon types **{ name: "anon object" }**
* supports an array and single instance of your mappings
* many places where default behavior can be overriden.

##quick code example:

lets say we have a Todo class, which we want to map to a Todo Dto.


###setup

```javascript
class MapSetup implements Setup {
    configure(builder: Builder): void {

        //tell the mapper about your types
        //working on a way to make this use annotations.
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

        //register mappings, and use the dsl to override any automapping.
        builder.createMap<Todo, any>("models.todo", "dto.todo")
            .forMember("description", opts => opts.mapFrom(src => `desc: ${src.description}`))
            .forMember("created", opts => opts.ignore());

        //note this one uses conventions to auto map the properties by matching name.
        builder.createMap("dto.todo", "models.todo");

    }
}
```

###create a mapper instance (note this should be a singleton)

```javascript
//use the factory, to setup your mappings
let mapperFactor = new MapperFactor();
mapperFactor.addSetup(new MapSetup());

//create the mapper from the factory
let mapper = mapperFactor.createMapper();
```

###use it

```javascript
//in this case the source is an anon instance
let source = {
    id: "123",
    created: new Date(2017, 09, 17),
    description: "map a anon object to a known type",
    priority: 2,
    $type: "dto.todo"
}

//destination is an instacne of the todo type, populated accordingly.
let destination = mapper.map(source, "models.todo");
```