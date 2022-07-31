class videoGameTrivia {
    constructor(element, options={}){

        //Allows selection of categories and provides defaults
        //13041 All video games
        //16466 New video games
        //18115 Classic video games
        //13182 We have met the anime
        this.useCategoryIds = options.useCategoryIds || [13041,16466,18115,13182]

        //Current information pulled
        this.categories = []
        this.clues = {}

        //Current information displayed
        this.currentClue = null
        this.score = 0

        //Element selectors (makes sure to select all the elements in the HTML) 
        this.gameElement = element.querySelector(".game")
       this.scoreCountElement = element.querySelector(".scoreCount")
       this.formElement = element.querySelector("form")
       this.inputElement = element.querySelector("input[name=user-answer]")
       this.containerElement = element.querySelector(".container")
       this.clueTextElement = element.querySelector(".clueText")
       this.resultElement = element.querySelector(".result")
       this.resultTextElement = element.querySelector(".resultCorrectanswerText")
       this.successTextElement = element.querySelector(".resultSuccess")
       this.resultFailElement = element.querySelector(".resultFail")
   }

    startGame(){
        //Handles the event listeners
        this.gameElement.addEventListener("click", event => {
            if (event.target.dataset.clueId) {
               this.handleClueClick(event)
            }
         });
         this.formElement.addEventListener("submit", event => {
            this.handleFormSubmit(event)
         });
         //Starts manages score
         this.updateScore(0)
         //Starts fetching categories
         this.fetchCategories()
    }

    
    //Starts fetching categories
    fetchCategories() { 
        const categories = this.useCategoryIds.map(category_id => {
            return new Promise((resolve, reject) => {
               fetch(`https://jservice.kenzie.academy/api/clues?category=${category_id}`)
                  .then(response => response.json()).then(data => {
                     resolve(data)
                  })
            })
         })

         //Manages the data 
         Promise.all(categories).then(results => {
            results.forEach((result, categoryIndex) => {

                var category = {
                    title: result.clues[0].category.title,
                    clues: []
                 }
                 //Manages clues
                 var clues = shuffle(result.clues).splice(0,5).forEach((clue, index) => {
                        
                    var clueId = categoryIndex + "-" + index
                    category.clues.push(clueId)

                    this.clues[clueId] = {
                        question: clue.question,
                        answer: clue.answer,
                        value: (index + 1) * 100
                        }
                    })

                    this.categories.push(category)
                })
                
                //Provides all the questions and their clues
                console.log(this)

                //Starts rendering categories
          this.categories.forEach((i) => {
             this.renderCategory(i)
                })
            })
    }
     //Renders category row
    renderCategory(category) { 
        let column = document.createElement("div")
       column.classList.add("column")

       column.innerHTML = (
        `<header>${category.title}</header><ul></ul>`
        )
        .trim()
        var ul = column.querySelector("ul")
       category.clues.forEach(clueId => {
          var clue = this.clues[clueId]
          ul.innerHTML += `<li><button data-clue-id=${clueId}>${clue.value}</button></li>`
       })
       this.gameElement.appendChild(column)
    }
    //Manages score
    updateScore(change) {
        this.score += change;
        this.scoreCountElement.textContent = this.score
     }

     //Handles all the interaction process for the buttons 
     handleClueClick(event) {
        var clue = this.clues[event.target.dataset.clueId]
  
        event.target.classList.add("used")
        
        this.inputElement.value = ""
    
        this.currentClue = clue
  
        this.clueTextElement.textContent = this.currentClue.question;
        this.resultTextElement.textContent = this.currentClue.answer;
  
        this.containerElement.classList.remove("showing-result")
        
        this.containerElement.classList.add("visible")
        this.inputElement.focus()
     }
     //Handles the submission of information
     handleFormSubmit(event) {
        event.preventDefault()

        var isCorrect = this.cleanAnswer(this.inputElement.value) === this.cleanAnswer(this.currentClue.answer)
       if (isCorrect) {
          this.updateScore(this.currentClue.value);
       }
       this.revealAnswer(isCorrect)
    }
    //Makes sure that the clue information is reduced is displayed correctly
    cleanAnswer(input="") {
        var friendlyAnswer = input.toLowerCase()
        friendlyAnswer = friendlyAnswer.replace("<i>", "")
        friendlyAnswer = friendlyAnswer.replace("</i>", "")
        friendlyAnswer = friendlyAnswer.replace(/ /g, "")
        friendlyAnswer = friendlyAnswer.replace(/"/g, "")
        friendlyAnswer = friendlyAnswer.replace(/^a /, "")
        friendlyAnswer = friendlyAnswer.replace(/^an /, "") 
        return friendlyAnswer.trim()
        }

        //Renders the fail or success pop ups
        revealAnswer(isCorrect) {
      
            
            this.successTextElement.style.display = isCorrect ? "block" : "none"
            this.resultFailElement.style.display = !isCorrect ? "block" : "none"
        
            
            this.containerElement.classList.add("showing-result")
            
            
            setTimeout(() => {
                this.containerElement.classList.remove("visible")
            }, 3000)
        }
         }
        
    
    





function shuffle(a) {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
    }
    return a
}

const game = new videoGameTrivia( document.querySelector(".app"), {})
 game.startGame()


