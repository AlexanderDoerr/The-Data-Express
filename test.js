const dal = require('./data/mongoDAL');

const go = async () => {
    questions = [1, 2, 3]
    // await dal.addUser('DoerrAlex', 'FrankHello', 'alexdoerr@me.com', 122, questions);
    // await dal.updateUser('Username', 'DoerrAlex', 'JohnDoe')
    // id = await dal.findUser('Username', 'JohnDoe' )
    // console.log(id);

    // Use findUser to find the user, then put the _id into the variable id.
    id = await dal.findUser('Username', 'JohnDoe') // id is a mongo ObjectId
    console.log(id._id); //this is to grab the objectId from the mongo object


}

go();

// How to get ObjectId from mongo object
// const id = await dal.findUser('Username', 'JohnDoe') // id is a mongo ObjectId
// console.log(id._id); //this is to grab the objectId from the mongo object

