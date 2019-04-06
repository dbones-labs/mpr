![alt text](https://bitbucket-assetroot.s3.amazonaws.com/c/photos/2018/Sep/14/1288517134-6-mpr-logo_avatar.png "MPR - Object Mapper")


#mpr = object mapper

JavaScript/TypeScript library that maps a source object to a destination object.

Give it a whirl, it may just work for you.

## Features 

* **auto-mapping** (requires registering of typeMeta)
* annotations (Decorators) support
* complete **POJO** support (alternative to annotations)
* support for **es6** classes, **es5**, and **anon types**.
* supports for **arrays** 
* supports mapping **complex types** (no support for bi-directional)
* supports **flattening** and expanding source to destination
* supports **deep copying**, via auto-mapping 
* mapping overriding via **dsl** (loosely based on Automapper from .NET)
* **modular** setup
* many places where default behavior can be **overridden**.

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

//this is one way to inform mpr of your type structure
@mapClass('models.todo')
export class Todo {

    @mapProperty()
    id: string;

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

    //this informs to the mapper we have a string[].
    @mapProperty(Types.string)
    comments: string[] = [];
}
```



### setup

you can provide many setup classes, which detail all the types and mappings.

```javascript
class MapSetup implements Setup {
    configure(builder: Builder): void {

        //register types, by registering the types mpr can automap
        
        //note as we used annotations we can scan 
        //for the attributes/properties.
        builder.addType(Todo).scanForAttributes();
        builder.addType(Person).scanForAttributes();

        //this is an annon type, so we detail what it looks like
        builder.addType("dto.todo")
            .addProperty("id", Types.string)
            .addProperty("created", Types.date)
            .addProperty("description", Types.string)
            .addProperty("priority", Types.number)
            .addProperty("comments", Types.AsArray(Types.string))
            .addProperty("owner", "dto.person");

        builder.addType("dto.person")
            .addProperty("name", Types.string);

        
        //register mappings, and use the dsl to override any automapping.
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
//use the factory, to setup your mappings
let mapperFactory = new MapperFactory();
mapperFactor.addSetup(new MapSetup());

//create the mapper from the factory
let mapper = mapperFactor.createMapper();
```

### use it

its simple to use, all you need to do is pass it an instance and the desired types you want to populate.

```javascript
//in this case the source is an anon instance
let source = {
    id: "123",
    created: new Date(2017, 9, 17),
    description: "map a anon object to a known type",
    priority: 2,
    comments: ["comment a","comment b"],
    $type: "dto.todo",
    owner: {
        name: "dave",
        $type: "dto.person"
    }
}

//destination is an instance of the todo type, populated accordingly.
let destination = mapper.map(source, Todo);
```