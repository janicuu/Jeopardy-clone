<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    

    <meta name="description" content="Video game trivia" />
    <meta name="author" content="Carlos Farinas" />
    <meta name="keywords" content="Video game trivia" />

    
    <title>Video game trivia</title>

    
    <link href="style.css" rel="stylesheet" media="all" />
  </head>

  <body>
    <div class="app">
   
      <header class="topHeader">
         <h1>Video game trivia</h1>
         <p class="score">Score <span class="scoreCount"></span></p>
      </header>
      
      
       <div class="game">
          
       </div>

       <div class="container">
         <div class=containerInner>
            <h2 class="clueText"></h2>
            <form autocomplete="off">
               <input name="user-answer" type="text" />
               <button type="submit">Answer</button>
            </form>
            <div class="result">
               <p class="resultSuccess">CORRECT</p>
               <p class="resultFail">INCORRECT</p>
               <p class="resultCorrectAnswer">
                  The correct answer is <span class="resultCorrectanswerText"></span>
               </p>
            </div>
         </div>
      </div>
  </div>
  <script src="code.js"></script>
 </body>
 </html>
