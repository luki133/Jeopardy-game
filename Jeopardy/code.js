const game = document.getElementById("game")
const scoreDisplay = document.getElementById("score")
let score = 0

const jeopardyCategories = [
    {
        genre: "WHO",
        questions: [
            {
                question: "Who wrote Saga of witcher?",
                answers: ["Władysław Reymont", "Kamil Baczyński", "Andrzej Sapkowski"],
                correct: "Andrzej Sapkowski",
                level: "medium"
            },
            {
                question: "Who won world cup 2010?",
                answers: ["Hungary", "Spain", "Netherlands"],
                correct: "Spain",
                level: "easy"
            }
        ]
    },
    {
        genre: "WHERE",
        questions: [
            {
                question: "Where is Poland?",
                answers: ["Europe", "North America", "Arctics"],
                correct: "Europe",
                level: "easy"
            },
            {
                question: "Where is the highest summit on the world?",
                answers: ["Asia", "South America", "North America"],
                correct: "Asia",
                level: "easy"
            }
        ]
    },
    {
        genre: "HOW MANY",
        questions: [
            {
                question: "How many people is on the world?",
                answers: ["10mld", "8mld", "4mld"],
                correct: ["8mld"],
                level: "easy"
            },
            {
                question: "How many forests is on the world?",
                answers: ["8mln ha", "4mln ha", "2mln ha"],
                correct: "4mln ha",
                level: "medium"
            }
        ]
    }
]



function addCategory(category) {
    const column = document.createElement("div")
    column.classList.add("genreColumn")

    const genreTitle = document.createElement("div")
    genreTitle.classList.add("genreTitle")
    genreTitle.textContent = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement("div")
        card.classList.add("card")
        column.append(card)

        if(question.level === "easy") card.textContent = 100
        if(question.level === "medium") card.textContent = 200
        if(question.level === "hard") card.textContent = 300

        card.setAttribute("dataQuestion", question.question)
        card.setAttribute("dataAnswer1", question.answers[0])
        card.setAttribute("dataAnswer2", question.answers[1])
        card.setAttribute("dataAnswer3", question.answers[2])
       
        card.setAttribute("dataCorrect", question.correct)
        card.setAttribute("dataValue", card.getInnerHTML())

        card.addEventListener("click", flipCard)
        
    })
}

jeopardyCategories.forEach(category => addCategory(category))

function flipCard(){
    this.textContent = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement("div")
    textDisplay.classList.add("cardText")
    textDisplay.textContent = this.getAttribute("dataQuestion")

    const firstButton = document.createElement("button")
    const secondButton = document.createElement("button")
    const thirdButton = document.createElement("button")
    
    firstButton.classList.add("firstButton")
    secondButton.classList.add("secondButton")
    thirdButton.classList.add("thirdButton")
    firstButton.addEventListener("click", getResult)
    secondButton.addEventListener("click", getResult)
    thirdButton.addEventListener("click", getResult)
   
    firstButton.textContent = this.getAttribute("dataAnswer1")
    secondButton.textContent = this.getAttribute("dataAnswer2")
    thirdButton.textContent = this.getAttribute("dataAnswer3")
  
    this.append(textDisplay, firstButton, secondButton, thirdButton)

    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.removeEventListener("click", flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.addEventListener("click", flipCard))

    const cardOfButton = this.parentElement // to read on website how it works

    if(cardOfButton.getAttribute("dataCorrect") == this.textContent){
        score = score + parseInt(cardOfButton.getAttribute("dataValue"))
        scoreDisplay.textContent = score
        cardOfButton.classList.add("correctAnswer")
        setTimeout(() =>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            
            cardOfButton.textContent = "Good Answer " + cardOfButton.getAttribute("dataValue") + " points"
            
        }, 100)
        
    } else {
        cardOfButton.classList.add("wrongAnswer")
        setTimeout(() =>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            
            cardOfButton.textContent ="Wrong Answer " + 0 + " points"
            
            }, 100)
    }
    cardOfButton.removeEventListener("click", flipCard)
}

