// const data = [
//     {
//       question:"How are you?",
//       options: ['Good','Better','Excellent'],
//       answer: 'Good',
//       duration: 10,
//       mark: 4
//     },
//     {
//       question:"When are you going home?",
//       options: ['5pm','6pm','7pm'],
//       answer: '5pm',
//       duration: 5,
//       mark: 2
//     },

//     {
//         question:"Will you marry me?",
//         options: ['Yes','No','Somehow'],
//         answer: 'Somehow',
//         duration: 3,
//         mark: 6
//       }
//   ]

// initialize Data values
let data = []
const body = document.querySelector('body')
const questionSet = document.getElementById('questions');
const submitBtn = document.createElement('button');
const displayScore = document.createElement('div');
displayScore.classList.add('score');
const END_AT = 30;
const START_AT = 0;

const start = document.querySelector('#start');
const countdown = document.querySelector('#countdown');

countdown.innerText = START_AT



const fetchData = async function (){
    try {
        const result = await fetch('./data.json');
        const d = await result.json();
        data = [...d.data]
        displayQuestionsOnScreen(data)
    } catch (error) {
       console.error(error) 
    }
}



// Compute Score
const computeScore =  (d=[]) => {
    const answers = [];

    d.forEach((question, index) => {
        const answer = document.querySelector(`input[name="question${index}"]:checked`);
        answers.push(answer?.value);
    })

    const score = d.reduce((total, question, index) => {
        if(question.answer === answers[index]) {
            total += question.mark;
        }
        return total;
    }
    , 0)

    return score;
}


start.addEventListener('click',() => {
   
    fetchData()
    // reset counter
    countdown.innerText = END_AT

    const s = setInterval(()=>{
     //fetch data

        countdown.innerText -=1;
        let score =computeScore(data) ? computeScore(data) : 0
      
        if(countdown.innerText < 0){
            alert(`Time Up! You Got ${score} Marks`)
            countdown.innerText = 0
            clearInterval(s)
          

        }
    }, 1000)


    
})




const displayQuestionsOnScreen = (data)=>{
    data.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>${question.question}</h3>
            <ul>
            ${question.options.map(option => `<li>
           <input type="radio" name="question${index}" value="${option}"> ${option}
            </li>`).join('')}
            </ul>
        `
        questionSet.appendChild(questionDiv);
    })

    submitBtn.innerHTML = 'Submit';
    questionSet.appendChild(submitBtn);
}






submitBtn.addEventListener('click', () => {
    let score = computeScore(data)
    displayScore.innerHTML = `Your score is ${score}`;
    questionSet.appendChild(displayScore);

    // body.removeChild(questionSet)

})











