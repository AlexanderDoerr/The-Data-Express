const express = require('express');
const router = express.Router();

const dal = require('../data/mongoDAL');

router.get("/", (req, res) => {
    var resultJson = {
        data: [
            {
                name: "Ark", 
                likes: 50
            }
        ]
    }
    res.json(resultJson);
});

router.get("/getanswers", async (req, res) => {
    let answerToQuestion = await dal.findQuestions();
    let red = 0;
    let blue = 0;
    let green = 0;
    let dog = 0;
    let cat = 0;
    let fish = 0;
    let pizza = 0;
    let pasta = 0;
    let sushi = 0;

    for(let i = 0; i < answerToQuestion.length; i++){
        for(let j = 0; j < answerToQuestion[i].questions.length; j++){
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

    var resultJson = {
        labels: ["Red", "Blue", "Green", "Dog", "Cat", "Fish", "Pizza", "Pasta", "Sushi"],
        data: [red, blue, green, dog, cat, fish, pizza, pasta, sushi]
    }
    res.json(resultJson);
});

module.exports = router;
