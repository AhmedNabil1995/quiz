import fs from 'fs';
let wordList,scoresList
let numberOfQuesions = 10;

(function(){
    let jsonData=fs.readFileSync('./data.json');
    let data = JSON.parse(jsonData);
    wordList = data.wordList;
    scoresList = data.scoresList;
})()

const getRandomQuesion =()=>{
    let randomIndex = Math.floor(Math.random()*(wordList.length))
    return wordList[randomIndex];
}


const generatequesions=()=>{

    //when this array become empty that mean we get at least 1 adjective, 1 adverb, 1 noun, and 1 verb.
    let pos = ['noun','verb','adverb','adjective'];

    const quesions = [];
    let randomQuesion;

    //generate random quesions and put them in the quesions array if they aren't in it
    // and make sure you don't duplicate any quesion
    do{
        randomQuesion = getRandomQuesion();

        if(!quesions.includes(randomQuesion)){

            quesions.push(randomQuesion);
            
            //The quesion array should include at least 1 adjective, 1 adverb, 1 noun, and 1 verb.
            //so here we remove every pos we find in the random quesion
            pos = pos.filter(el=>el!=randomQuesion['pos']);
        }

    }while( quesions.length < (numberOfQuesions - pos.length) )

    // this step sure we get 10 quesions with at least 1 adjective, 1 adverb, 1 noun, and 1 verb.
    do{
        randomQuesion = getRandomQuesion();

        if(!quesions.includes(randomQuesion) && pos.includes(randomQuesion['pos']) ){

            quesions.push(randomQuesion);

            pos = pos.filter(el=>el!=randomQuesion['pos']);
        }

    }while( pos.length != 0 )

    return quesions;
}

const getRank=(score)=>{
    // convert this number to percentage
    let scoreAsPercentage = Math.round((score/numberOfQuesions)*100);
    //get scoresList that less than the score percentage
    let rankArr = scoresList.filter((el)=>{
        return el < scoreAsPercentage
    })
    // get the rank percentage then return it
    let rank = Math.round((rankArr.length / scoresList.length)*100);
    return rank;
}

export {
    generatequesions,
    getRank,
}