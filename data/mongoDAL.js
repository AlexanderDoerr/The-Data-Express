const { MongoClient, ObjectId} = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "Test";
const collectionName = "TheDataExpress";

////////////////////////////////////////////////////////////////////////////////

const updateUser = async (findKey, updateValues) => {
    const client = await MongoClient.connect(uri);
        
    try{
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const filter = {_id: new ObjectId(findKey)};

        var results = await collection.updateOne(filter, {$set: updateValues});

        console.log("updateUser: results");
        console.log(results);

        return results;
    }catch(err){
        console.log("updateUser: Some error happened");
        console.log(err);
    }finally{
        client.close();
    }

}

/////////////////////////////////////////////////////////////////////////////////

const findUser = async (key, value) => {
    const client = await MongoClient.connect(uri);
        
    try{
        const db = client.db(dbName);
        const collection = db.collection(collectionName);


        var query = {};
        query[key] = value;
        console.log(query)

        var results = await collection.findOne(query);

        console.log("findUser: results");
        console.log(results);

        return results;
    }catch(err){
        console.log("findUser: Some error happened");
        console.log(err);
    }finally{
        client.close();
    }
}

//////////////////////////////////////////////////////////////////////////

const addUser = async (username, password, email, age, questions) => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        
        var newUser = {
            Username: username,
            Password: password, 
            Email: email,
            Age: age,
            questions: [
                questions[0],
                questions[1],
                questions[2]
            ]
        }
    const result = await collection.insertOne(newUser);

    console.log("addNewUser: results");
    console.log(result);
    } catch(err){
        console.log("addNewUser: some error happened");
        console.log(err);
    }finally{
        client.close();
    }
}

///////////////////////////////////////////////////////////////////////////

exports.findUser = findUser;
exports.addUser = addUser;
exports.updateUser = updateUser;