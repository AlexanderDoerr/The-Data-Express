const dal = require('./data/mongoDAL');

const go = async () => {
    questions = [1, 2, 3]
    // await dal.addUser('DoerrAlex', 'FrankHello', 'alexdoerr@me.com', 122, questions);
    await dal.updateUser('Username', 'DoerrAlex', 'JohnDoe')
    await dal.findUser('Username', 'JohnDoe' )
}

go();
