![alt text](https://bitbucket-assetroot.s3.amazonaws.com/c/photos/2018/Sep/14/1288517134-6-mpr-logo_avatar.png "MPR - Object Mapper")


#mpr = object mapper

JavaScript/TypeScript library that maps a source object to a destination object.

consider in your Angular/Vue.js app you call a REST service which uses JSON and you need to convert the DTO into a instance of a class, you can map these 2 schema using this library.

Give it a whirl, it may just work for you.

## Features 

* **auto-mapping** (requires registering of typeMeta)
* annotations (Decorators) support
* complete **POJO** support (alternative to annotations)
* support for **es6** classes, **es5**, **json** and **anon types**.
* supports for **arrays** 
* supports mapping **complex types** (no support for bi-directional)
* supports **flattening** and expanding source to destination
* supports **deep copying**, via auto-mapping 
* mapping overriding via **dsl** (loosely based on Automapper from .NET)
* **modular** setup
* many places where default behavior can be **overridden**.
* update object instance within an array (using an id property)

## quick code example:

lets say we have a Todo class, which we want to map to a Todo Dto.

### Install

install into your project

```
npm install @dboneslabs/mpr --save
```

### Todo class

the following is one way to detail your class, hopefully this way will remove a number of magic strings.

```javascript
import { mapClass } from "@dboneslabs/mpr/annotations/map-class";
import { mapProperty } from "@dboneslabs/mpr/annotations/map-property";
import { Types } from "@dboneslabs/mpr/core/types";

//this is one way to inform mpr of your type structure
@mapClass('models.todo')
export class Todo {

    //id's allows us to update an instance of an object within a list
    @mapIdProperty()
    id: string;

    //we tell mpr which properties, it will figure out the type.
    @mapProperty()
    created: Date;

    @mapProperty()
    description: string;

    //enums will be teated accordingly i.e. as numbers
    @mapProperty()
    priority: Priority

    //this works out that we have a Person type.
    @mapProperty()
    owner:Person;

    //passing in a type 
    //informs to the mpr we have a string[].
    @mapProperty(Types.string)
    comments: string[] = [];
}
```

note the Types class its a look up for all the of the box types (string, boolean, etc).

### setup

you can provide many setup classes, which detail all the types and mappings.

```javascript
import { Setup } from "@dboneslabs/mpr/initializing/Setup";
import { Builder } from '@dboneslabs/mpr/initializing/builders/builder';
import { Types } from '@dboneslabs/mpr/core/types';

class MapSetup implements Setup {
    configure(builder: Builder): void {

        //register types, by registering the types mpr can automap
        
        //note as we used annotations we can scan 
        //for the attributes/properties.
        builder.addType(Todo).scanForAttributes();
        builder.addType(Person).scanForAttributes();

        //this is an annon/json type, so we detail what it looks like
        //note by detailing this mpr will know about the structure and be able setup any automappings
        builder.addType("dto.todo")
            .addIdProperty("id", Types.string)
            .addProperty("created", Types.date)
            .addProperty("description", Types.string)
            .addProperty("priority", Types.number)
            .addProperty("comments", Types.AsArray(Types.string))
            .addProperty("owner", "dto.person");

        builder.addType("dto.person")
            .addProperty("name", Types.string);

        //register mappings, and use the dsl to override any automapping.
        //here you can see mpr will automap comments, owner, priority
        //and for the description and created properties it will do these provided actions.
        builder.createMap<Todo, any>(Todo, "dto.todo")
            .forMember("description", opts => opts.mapFrom(src => `desc: ${src.description}`))
            .forMember("created", opts => opts.ignore());

        //note this one uses conventions to auto map the properties by matching name.
        builder.createMap("dto.todo", Todo);

        //as we map the person we can now support deep object hierarchies.
        builder.createMap(Person, "dto.person");
        builder.createMap("dto.person", Person);

    }
}
```

### create a mapper instance 

to create an instance of the mapper, you need to create it via the MapperFactory as follows

remember to reuse your mapper instance, its built that way.

```javascript
import { MapperFactory } from "@dboneslabs/mpr/mapper-factory";

//use the factory, to setup your mappings
let mapperFactory = new MapperFactory();
mapperFactor.addSetup(new MapSetup()); //use your MapSetup class.

//create the mapper from the factory
let mapper = mapperFactor.createMapper();
```

### use it

its simple to use, all you need to do is pass it an instance and the desired types you want to populate.

```javascript
//in this case the source is an anon/json instance
let source = {
    id: "123",
    created: new Date(2017, 9, 17),
    description: "map a anon object to a known type",
    priority: 2,
    comments: [ "comment a", "comment b" ],
    $type: "dto.todo",
    owner: {
        name: "dave",
        $type: "dto.person"
    }
}

//destination is an instance of the todo type, populated accordingly.
let destination = mapper.map(source, Todo);
```

destination will be a Todo object, meaning you have access to any methods which would be on the class instance.

```javascript

{ //<Todo>
    id: "123",
    description: "map a anon object to a known type",
    priority: Priority.high,  // <Priority> enum
    comments: [ "comment a", "comment b" ],
    $type: "models.todo",
    owner: { //<Person>
        name: "dave",
        $type: "models.person"
    }
}
```