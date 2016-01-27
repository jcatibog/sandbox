db.restaurants.insert(
    {
        "address": {
            "street" : "2 Avenue",
            "zipcode" : "10075",
            "building" : "1480",
            "coord" : [ -73.9557413, 40.7720266 ]
        },
        "borough" : "Manhattan",
        "cuisine" : "Italian",
        "grades" : [
        {
            "date" : ISODate("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
        },
        {
            "date" : ISODate("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
        }
        ],
        "name" : "Vella",
        "restaurant_id" : "41704620"
    }
)
db.createUser(
    {
        "user": "jcatibog",
        "pwd": "1234asdf",
        "roles": [
            { role: "clusterAdmin", db: "admin" },
            { role: "readAnyDatabase", db: "admin" }
        ]
    },
    { w: "majority", wtimeout: 5000 }
)
db.customers.insert({ first_name: "John", last_name: "Doe" })
db.customers.insert([
    {
        first_name: "Steven",
        last_name: "Johnson"
    },
    {
        first_name: "Bob",
        last_name: "Smith"
    },
    {
        first_name: "Michelle",
        last_name: "Ford"
    },
    {
        first_name: "Jill",
        last_name: "Swanson"
    }
])
db.customers.insert(
    {
        first_name: "William",
        last_name: "Heart",
        gender: "male"
    }
)
db.customers.insert(
    {
        first_name: "Mary",
        last_name: "Jackson",
        gender: "female",
        age: 33,
        birthdate: new Date('Sep 10, 1981')
    }
)
db.customers.update({
    first_name: "Jill",
    {$set { last_name: "Hill" }}
})
db.customers.update(
    { first_name: "Michael" },
    { $set: {
        first_name: "Michael",
        last_name: "Jordan",
        age: 52
    }},
    { upsert: true }
)
