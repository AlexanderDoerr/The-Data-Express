const dal = require('./data/mongoDAL');

const go = async () => {
    questions = [1, 2, 3]
    // await dal.addUser('DoerrAlex', 'FrankHello', 'alexdoerr@me.com', 122, questions);
    // await dal.updateUser('Username', 'DoerrAlex', 'JohnDoe')
    // id = await dal.findUser('Username', 'JohnDoe' )
    // console.log(id);

    // Use findUser to find the user, then put the _id into the variable id.
    // id = await dal.findUser('Username', 'JohnDoe') // id is a mongo ObjectId
    // console.log(id._id); //this is to grab the objectId from the mongo object
    findQuestions = await dal.findQuestions();
    console.log(findQuestions[0].questions[0]);
    console.log(findQuestions[0].questions[1]);
    console.log(findQuestions[0].questions[2]);

    let answerToQuestion = await dal.findQuestions();
    console.log(answerToQuestion[0].questions[0]);
    let red = 0;
    let blue = 0;
    let green = 0;
    let dog = 0;
    let cat = 0;
    let fish = 0;
    let pizza = 0;
    let pasta = 0;
    let sushi = 0;

    //Loop through javascript object 
    for(let i = 0; i < answerToQuestion.length; i++){
        for(let j = 0; j < answerToQuestion[i].questions.length; j++){
            console.log(answerToQuestion[i].questions[j]);
            switch(answerToQuestion[i].questions[j]){
                case "red": red++; break;
                case "blue": blue++; break;
                case "green": green++; break;
                case "dog": dog++; break;
                case "cat": cat++; break;
                case "fish": fish++; break;
                case "pizza": pizza++; break;
                case "pasta": pasta++; break;
                case "sushi": sushi++; break;
                default: break;
        }
    }
}
console.log(`red: ${red}, blue: ${blue}, green: ${green}, dog: ${dog}, cat: ${cat}, fish: ${fish}, pizza: ${pizza}, pasta: ${pasta}, sushi: ${sushi}`);
}



go();

// How to get ObjectId from mongo object
// const id = await dal.findUser('Username', 'JohnDoe') // id is a mongo ObjectId
// console.log(id._id); //this is to grab the objectId from the mongo object

