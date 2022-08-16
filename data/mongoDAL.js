const { MongoClient, ObjectId} = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "Test";
const collectionName = "TheDataExpress";

const findUser = async (key, value) => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        var query = {key: value};

        var results = await collection.find(query).toArray();

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
            questions: {
                1: question[0],
                2: question[1],
                3: question[2]
            }
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

exports.findUser = findUser;
exports.addUser = addUser;