"use strict";

//The dataset of JS questions in a JSON format.

// $( function() {
//   $( "input" ).checkboxradio();
// } );

const hypeLines = [
  "You're a god amongst mortals, ",
  "You must be butter, cause you’re on a roll, ",
  "Who’s the boss? You. That’s who, ",
  "You just bodied that question, ",
  "You win the internet today, ",
  "All you do is win, ",
  "You put the I in win, ",
  "You’re unstoppable, ",
  "You’re a force of nature, ",
  "Dream big, work hard, and make it happen, ",
  "Play like you’re first, train like you’re second, ",
];

var hypeline = hypeLines[Math.floor(Math.random() * hypeLines.length)];

// DOM references
const screens = document.querySelectorAll(".screen");
const options = document.querySelectorAll(".option");
let inputStatus = document.getElementById("input-controls");
let loadGameQuestions = document.getElementById("game-screen");

let startGameMenu = document.getElementById("play-game");
let highScoreMenu = document.getElementById("high-scores");
let howToPlayMenu = document.getElementById("how-to-play");
let questionTitle = document.getElementById("question-title");

let correctAnswerTitle = document.getElementById("correct-answer-title");
let correctAnswer = document.getElementById("correct-answer");

let hypeLine = document.getElementById("hype-line");
let correctAnswerText = document.getElementById("correct-answer-text");

let nextQuestion = document.getElementById("next-question");

let incorrectAnswer = document.getElementById("incorrect-answer");

let playerBoardName = document.getElementById("player-name");
let playerScore = document.getElementById("player-score");

let question = document.getElementById("question");
let optionA = document.getElementById("option-a");
let optionB = document.getElementById("option-b");
let optionC = document.getElementById("option-c");
let optionD = document.getElementById("option-d");

// Highest level container for all the behaviour that happens at the top level.

// Write an object literal that will act as your game controller that:
// Has a property to track whether the game is running. 
// Initialize it to false.

const game = {
  players: [],
  currentPlayerName: undefined,
  currentScreen: '#splash-screen',
  isRunning: false,
  currentQuestion: 0,
  difficulty: 0,
  isGameOver: false,

  addNewPlayer(oPlayer) {
    this.players[oPlayer.name] = oPlayer;
  },

  addPlayer() {
    let playerName = document.getElementById("player-name-input").value;
    if (playerName.trim().length==0) {
      $( "#input-check-dialog" ).dialog( "open" );
      return;
    }
    let difficulty = $("input[name='radio-1']:checked").val();
   
    if (difficulty===undefined) {
      $( "#input-check-dialog" ).dialog( "open" );
      return;
    }
    game.difficulty = parseInt(difficulty);
    var player = new Player(playerName);
    game.currentPlayerName = player.name;
    game.addNewPlayer(player);
    game.currentPlayerName = playerName;  
    playerBoardName.innerHTML = "Player: " + player.name;
    playerScore.innerHTML = "Score: " + player.score + "/" + game.currentQuestion;
    // $('#round-name').html('Round One: Spades');
    game.switchScreen("#game-screen");
  },

  isGameOver(){
    if (game.difficulty===1) {
      if (game.players[game.currentPlayerName].score<6 && game.currentQuestion >= 13) {
        game.isGameOver === true;
        console.log("game over!")
        game.switchScreen('#game-over-screen');
      } else {
        game.loadNextGameQuestion();
        loadGameQuestions.classList.remove("hidden");
      }
    }
    if (game.difficulty===2) {
      if (game.players[game.currentPlayerName].score<8 && game.currentQuestion >= 13) {
        game.isGameOver === true;
        console.log("game over!")
        game.switchScreen('#game-over-screen');
      } else {
        game.loadNextGameQuestion();
        loadGameQuestions.classList.remove("hidden");
      }
    }
    if (game.difficulty===3) {
      if (game.players[game.currentPlayerName].score<10 && game.currentQuestion >= 13) {
        game.isGameOver === true;
        console.log("game over!")
        game.switchScreen('#game-over-screen');
      }
      else if (game.players[game.currentPlayerName].score<20 && game.currentQuestion >= 26) {
        game.isGameOver === true;
        console.log("game over!")
        game.switchScreen('#game-over-screen');
      } 
      else if (game.players[game.currentPlayerName].score<30 && game.currentQuestion >= 39) {
        game.isGameOver === true;
        console.log("game over!")
        game.switchScreen('#game-over-screen');
      }
      else if (game.players[game.currentPlayerName].score<40 && game.currentQuestion >= 52) {
        game.isGameOver === true;
        console.log("game over!")
        game.switchScreen('#game-over-screen');
      } 
      else {
        game.loadNextGameQuestion();
        loadGameQuestions.classList.remove("hidden");
      }
    }
  },

  switchScreen(screenid){

    // method that switches the currently displayed screen
    // receives a string argument which corresponds to the id
    // set for each of the screens

        game.currentScreen = screenid;

    //First, hide every screen, and then unhide the screen that is the fn parameter
        $('.screen').each(function(){
            $(this).addClass('hidden');
        })
          $(screenid).removeClass('hidden');

          if (screenid == '#splash-screen') {
            game.isRunning = false;
            $('button#help-dialog').removeClass('hidden');
        }

        if (screenid == '#input-controls') {
          game.isRunning = false;
          $('button#help-dialog').removeClass('hidden');

          // What do you do here?
      }

          if (screenid == '#game-screen') {
              game.isRunning = true;
              $('button#quit-button').removeClass('hidden');
              $('button#help-dialog').removeClass('hidden');
              game.isGameOver();

              
          }
          else {
            $('button#quit-button').addClass('hidden');
          }

        if (screenid == '#correct-answer') {
          correctAnswerTitle.innerHTML = "Correct Answer!";
          hypeLine.innerHTML = hypeline + game.currentPlayerName + "!";
          correctAnswerText.innerHTML = gameQuestions[game.currentQuestion - 1].Answer.Explanation;
          hypeline = hypeLines[Math.floor(Math.random() * hypeLines.length)];
          correctAnswer.classList.remove("hidden");
        }

        if (screenid == '#incorrect-answer') {
          console.log('incorrect-answer');
          $('#incorrect-answer-title').html("Incorrect Answer!");
          $("#question-title").html(gameQuestions[game.currentQuestion].subject);
          $("#question").html(gameQuestions[game.currentQuestion].description);
          $("#option-a").html("A: " + gameQuestions[game.currentQuestion].options[0].description);
          $("#option-b").html("B: " + gameQuestions[game.currentQuestion].options[1].description);
          $("#option-c").html("C: " + gameQuestions[game.currentQuestion].options[2].description);
          $("#option-d").html("D: " + gameQuestions[game.currentQuestion].options[3].description);
          $('#incorrect-answer-text').html(gameQuestions[game.currentQuestion].Answer.Explanation);
          $('#right-option').html("The correct answer is " + gameQuestions[game.currentQuestion].Answer.Option)

          incorrectAnswer.classList.remove("hidden");
        }



          if (screenid == '#game-over') {
              game.isRunning = false;
              $('button#help-dialog').addClass('hidden');
          }
    },

    loadNextGameQuestion() {
      console.log(game.currentQuestion);
      if (game.currentQuestion > gameQuestions.length - 1) {
        
        console.log("game-over");

        return;
      }

      if (game.currentQuestion < 13){
        $('#round-name').html('Round One: Spades');
      }
      if (game.currentQuestion > 13 && game.currentQuestion < 26){
        console.log('should fire now');
        $('#round-name').html('Round Two: Clubs');
      }
      if (game.currentQuestion > 26 && game.currentQuestion < 39){
        $('#round-name').html('Round Three: Diamonds');
      }
      if (game.currentQuestion > 39 && game.currentQuestion < 52){
        $('#round-name').html('Round Four: Hearts');
      }  


      $("#question-title").html(gameQuestions[game.currentQuestion].subject);
      $("#question").html(gameQuestions[game.currentQuestion].description);
      $("#option-a").html("A: " + gameQuestions[game.currentQuestion].options[0].description);
      $("#option-b").html("B: " + gameQuestions[game.currentQuestion].options[1].description);
      $("#option-c").html("C: " + gameQuestions[game.currentQuestion].options[2].description);
      $("#option-d").html("D: " + gameQuestions[game.currentQuestion].options[3].description);
    },

    checkAnswer(answer) {
      if (answer == gameQuestions[game.currentQuestion].Answer.Option) {
        game.players[game.currentPlayerName].updateScore(1);
        game.switchScreen("#correct-answer");
      } else {
        game.switchScreen("#incorrect-answer");
        game.players[game.currentPlayerName].updateScore(0);
      }
    },

    displayAppropriateHelpModal() {
      if (game.currentScreen == '#splash-screen') {
          $( "#setup-help-dialog" ).dialog({
              position: { my: "top", at: "top", of: document }
            });
          $( "#setup-help-dialog" ).dialog( "open" );
      }
      
      if (game.currentScreen == '#game-screen') {
          $( "#gameplay-help-dialog" ).dialog( "open" );
          game.isRunning = false;
          $( "#gameplay-help-dialog" ).dialog(
            {
              buttons: [
                {
                  text: "More info",
                  icon: "ui-icon-heart",
                  click: function() {
                    $( this ).dialog( "close" );
                    $( "#setup-help-dialog" ).dialog( "open" );
                  }
                }
              ],
            close: function( event, ui ) {
              game.isRunning = true;
            }
          });
      }

},

};

class Player {
  constructor(strName) {
    this.name = strName;
    this.score = 0;
  }
  updateScore(num) {
    this.score = this.score + num;
    game.currentQuestion++;

   

    $('#player-score').html("Score: " + this.score + "/" + game.currentQuestion);
  }
}


function startGame() {
  switchScreen("splash");
}



// function loadNextGameQuestion() {
//   if (game.currentQuestion > gameQuestions.length - 1) {
//     console.log("game-over");
//     return;
//   }

//   questionTitle.innerHTML = gameQuestions[game.currentQuestion].subject;
//   question.innerHTML = gameQuestions[game.currentQuestion].description;
//   optionA.innerHTML =
//     "A: " + gameQuestions[game.currentQuestion].options[0].description;
//   optionB.innerHTML =
//     "B: " + gameQuestions[game.currentQuestion].options[1].description;
//   optionC.innerHTML =
//     "C: " + gameQuestions[game.currentQuestion].options[2].description;
//   optionD.innerHTML =
//     "D: " + gameQuestions[game.currentQuestion].options[3].description;
  

// }



$("#setup-help-dialog").dialog({ autoOpen: false });
$("#gameplay-help-dialog").dialog({ autoOpen: false });
$("#input-check-dialog").dialog({ autoOpen: false });

// _.~"~._.~"~._.~"~._.~"~._
// Event listeners for all the buttons 
// _.~"~._.~"~._.~"~._.~"~._
// 

$( "#start-game" ).click(function() {
  game.addPlayer();
});

$( "#play-game" ).click(function() {
  game.switchScreen('#input-controls');
});

$( "#game-over-button" ).click(function() {
  game.switchScreen('#game-over');
});

$( "#quit-button" ).click(function() {
  game.switchScreen('#splash-screen');
});

$( "#next-question" ).click(function() {
  game.switchScreen('#game-screen');
});


$( "#restart-game" ).click(function() {
  game.switchScreen('#splash-screen');
});

$( "#option-a" ).click(function() {
  game.checkAnswer('A')
});

$( "#option-b" ).click(function() {
  game.checkAnswer('B')
});

$( "#option-c" ).click(function() {
  game.checkAnswer('C')
});

$( "#option-d" ).click(function() {
  game.checkAnswer('D')
});

$( "#incorrect-next-question" ).click(function() {
  game.switchScreen('#game-screen');
});

$( "#help-dialog" ).click(function() {
  game.displayAppropriateHelpModal();
});

$( "#how-to-play" ).click(function() {
  $( "#setup-help-dialog" ).dialog( "open" );
});



// Dataset

const gameQuestions = [
  {
    ID: "1",
    subject: "What's the output?",
    description: "const emojis = ['🥑', ['✨', '✨', ['🍕', '🍕']]];<br><br>console.log(emojis.flat(1));",
    options: [
      {
        ID: "A",
        description: "<div class='code'>['🥑', ['✨', '✨', ['🍕', '🍕']]]</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>['🥑', '✨', '✨', ['🍕', '🍕']]</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>['🥑', ['✨', '✨', '🍕', '🍕']]</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>['🥑', '✨', '✨', '🍕', '🍕']</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation: "With the <div class='code'>flat</div> method, we can create a new, flattened array. The depth of the flattened array depends on the value that we pass. In this case, we passed the value <div class='code'>1</div> (which we didn't have to, that's the default value), meaning that only the arrays on the first depth will be concatenated. <div class='code'>['🥑']</div> and <div class='code'>['✨', '✨', ['🍕', '🍕']]</div> in this case. Concatenating these two arrays results in <div class='code'>['🥑', '✨', '✨', ['🍕', '🍕']]</div>.",
    },
  },

  {
    ID: "2",
    subject: "What's the output?",
    description: "for (var i = 0; i < 3; i++) {<br>  setTimeout(() => console.log(i), 1);<br>}<br><br> for (let i = 0; i < 3; i++) {<br>  setTimeout(() => console.log(i), 1);<br>}",
    options: [
      {
        ID: "A",
        description: "<div class='code'>0 1 2</div> and <div class='code'>0 1 2</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>0 1 2</div> and <div class='code'>3 3 3</div>.",
      },
      {
        ID: "C",
        description: "<div class='code'>3 3 3</div> and <div class='code'>0 1 2</div>",
      },
      {
        ID: "D",
        description: "None of the above",
      },
    ],
    Answer: {
      Option: "C",
      Explanation: "Because of the event queue in JavaScript, the <div class='code'>setTimeout</div> callback function is called after the loop has been executed. Since the variable <div class='code'>i</div> in the first loop was declared using the <div class='code'>var</div> keyword, this value was global. During the loop, we incremented the value of <div class='code'>i</div> by 1 each time, using the unary operator <div class='code'>++</div>. By the time the <div class='code'>setTimeout</div> callback function was invoked, <div class='code'>i</div> was equal to 3 in the first example.<br>In the second loop, the variable <div class='code'>i</div> was declared using the <div class='code'>let</div> keyword: variables declared with the <div class='code'>let</div> (and <div class='code'>const</div>) keyword are block-scoped (a block is anything between { }). During each iteration, <div class='code'>i</div> will have a new value, and each value is scoped inside the loop.",
    },
  },
  {
    ID: "3",
    subject: "What's the output?",
    description: "const shape = {<br>\tradius: 10,<br>\t diameter() {<br>\t\treturn this.radius * 2;<br>},<br>perimeter: () => 2 * Math.PI * this.radius,<br>};<br> console.log(shape.diameter());<br>console.log(shape.perimeter());<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>20</div> and <div class='code'>62.83185307179586</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>20</div> and <div class='code'>NaN</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>20</div> and <div class='code'>63</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>NaN</div> and <div class='code'>63</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation: "Note that the value of <div class='code'>diameter</div> is a regular function, whereas the value of <div class='code'>perimeter</div> is an arrow function.<br>With arrow functions, the <div class='code'>this</div> keyword refers to its current surrounding scope, unlike regular functions! This means that when we call <div class='code'>perimeter</div>, it doesn't refer to the shape object, but to its surrounding scope (window for example).<br>There is no value <div class='code'>radius</div> on that object, which returns <div class='code'>NaN</div>.",
    },
  },
  {
    ID: "4",
    subject: "What's the output?",
    description:
      "function checkAge(data) {<br>\t\t  if (data === { age: 18 }) {<br>\t\t    console.log('You are an adult!');<br>\t\t  } else if (data == { age: 18 }) {<br>\t\t    console.log('You are still an adult.');<br>\t\t  } else {<br>\t\t    console.log('Hmm.. You don't have an age I guess');<br>\t\t  }<br>\t\t}<br>\t\tcheckAge({ age: 18 });",
    options: [
      {
        ID: "A",
        description: "You are an adult!",
      },
      {
        ID: "B",
        description: "You are still an adult.",
      },
      {
        ID: "C",
        description: "Hmm.. You don't have an age I guess",
      },
      {
        ID: "D",
        description: "None of the above",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "When testing equality, primitives are compared by their value, while objects are compared by their reference. JavaScript checks if the objects have a reference to the same location in memory.<br>\t\t\t\t\t\tThe two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality.<br>\t\t\t\t\t\tThis is why both { age: 18 } === { age: 18 } and { age: 18 } == { age: 18 } return false.",
    },
  },
  {
    ID: "5",
    subject: "What's the output?",
    description:
      "+true;<br>!'Lydia';",
    options: [
      {
        ID: "A",
        description: "<div class='code'>1</div> and <div class='code'>False</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>false</div> and <div class='code'>NaN</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>false</div> and <div class='code'>false</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>True</div> and <div class='code'>True</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "The unary plus tries to convert an operand to a number. true is 1, and false is 0.<br><br>The string 'Lydia' is a truthy value. What we're actually asking, is \"is this truthy value falsy?\". This returns false.<br>",
    },
  },
  {
    ID: "6",
    subject: "Which one is true?",
    description:
      "const bird = {<br>\tsize: 'small',<br>};<br>const mouse = {<br>name: 'Mickey',<br>small: true,<br>};",
    options: [
      {
        ID: "A",
        description: "<div class='code'>mouse.bird.size</div> is not valid.",
      },
      {
        ID: "B",
        description: "<div class='code'>mouse[bird.size]</div> is not valid.",
      },
      {
        ID: "C",
        description: "<div class='code'>mouse[bird[\"size\"]]</div> is not valid",
      },
      {
        ID: "D",
        description: "All of them are valid",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood. <br>JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket <div class='code'>[</div> and keeps going until it finds the closing bracket <div class='code'>].</div> Only then, it will evaluate the statement.<br><div class='code'>mouse[bird.size]</div>: First it evaluates <div class='code'>bird</div>.size, which is <div class='code'>\"small\"</div>. <div class='code'>mouse[\"small\"]</div> returns <div class='code'>true</div>.<div class='code'><br></div> However, with dot notation, this doesn't happen. <div class='code'>mouse</div> does not have a key called <div class='code'>bird</div>, which means that <div class='code'>mouse</div>.bird is <div class='code'>undefined</div>. Then, we ask for the <div class='code'>size</div> using dot notation: <div class='code'>mouse</div>.bird.size. Since <div class='code'>mouse.bird</div> is <div class='code'>undefined</div>, we're actually asking <div class='code'>undefined</div>.size. This isn't valid, and will throw an error similar to <div class='code'>Cannot read property \"size\" of undefined.</div>",
    },
  },
  {
    ID: "7",
    subject: "What's the output?",
    description:
      "let c = { greeting: 'Hey!' };<br>let d;<br>d = c;<br>c.greeting = 'Hello';<br>console.log(d.greeting);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>Hello</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>Hey!</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>undefined</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>ReferenceError</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "In JavaScript, all objects interact by reference when setting them equal to each other.<br>First, variable <div class='code'>c</div> holds a value to an object. Later, we assign <div class='code'>d</div> with the same reference that <div class='code'>c</div> has to the object.<br>When you change one object, you change all of them.",
    },
  },
  {
    ID: "8",
    subject: "What's the output?",
    description:
      "let a = 3;<br>let b = new Number(3);<br>let c = 3;<br>console.log(a == b);<br>console.log(a === b);<br>console.log(b === c);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>true</div> <div class='code'>false</div> <div class='code'>true</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>false</div> <div class='code'>false</div> <div class='code'>true</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>true</div> <div class='code'>false</div> <div class='code'>false</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>false</div> <div class='code'>true</div> <div class='code'>true</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "<div class='code'>new Number()</div> is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.<br>When we use the <div class='code'>==</div> operator, it only checks whether it has the same value. They both have the value of <div class='code'>3</div>, so it returns <div class='code'>true</div>.<br>However, when we use the <div class='code'>===</div> operator, both value and type should be the same. It's not: <div class='code'>new Number()</div> is not a number, it's an object. Both return <div class='code'>false</div>.",
    },
  },

  {
    ID: "9",
    subject: "What's the output?",
    description:
      "let greeting;<br>greetign = {}; // Typo!<br>console.log(greetign);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>{}</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>ReferenceError: greetign is not defined</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>undefined</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>TypeError</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "It logs the object, because we just created an empty object on the global object! When we mistyped <div class='code'>greeting</div> as <div class='code'>greetign</div>, the JS interpreter actually saw this as <div class='code'>global.greetign = {}</div> (or window.greetign = {}</div> in a browser).<br>In order to avoid this, we can use <div class='code'>\"use strict\"</div>. This makes sure that you have declared a variable before setting it equal to anything.",
    },
  },
  {
    ID: "10",
    subject: "What happens when we do this?",
    description:
      "function bark() {<br>\tconsole.log('Woof!');<br>}<br><br>bark.animal = 'dog';",
    options: [
      {
        ID: "A",
        description: "Nothing, this is totally fine!",
      },
      {
        ID: "B",
        description: "<div class='code'>SyntaxError</div> You cannot add properties to a function this way.",
      },
      {
        ID: "C",
        description: "<div class='code'>\"Woof\"</div> gets logged",
      },
      {
        ID: "D",
        description: "<div class='code'>ReferenceError</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)<br>A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.",
    },
  },
  {
    ID: "11",
    subject: "What's the output?",
    description:
      "function sum(a, b) {<br>  return a + b;<br>}<br>sum(1, '2');",
    options: [
      {
        ID: "A",
        description: "<div class='code'>NaN</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>TypeError</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>\"12\"</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>3</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "JavaScript is a <strong>dynamically typed language</strong>: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called implicit type coercion. Coercion is converting from one type into another.<br>In this example, JavaScript converts the number <div class='code'>1</div> into a string, in order for the function to make sense and return a value. During the addition of a numeric type <div class='code'>(1)</div> and a string type (<div class='code'>'2'</div>), the number is treated as a string. We can concatenate strings like <div class='code'>\"Hello\" + \"World\"</div>, so what's happening here is <div class='code'>\"1\" + \"2\"</div> which returns <div class='code'>\"12\"</div>.",
    },
  },
  {
    ID: "12",
    subject: "What's the output?",
    description:
      "let number = 0;<br>console.log(number++);<br>console.log(++number);<br>console.log(number);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>1</div> <div class='code'>1</div> <div class='code'>2</div> ",
      },
      {
        ID: "B",
        description: "<div class='code'>1</div> <div class='code'>2</div> <div class='code'>2</div> ",
      },
      {
        ID: "C",
        description: "<div class='code'>0</div> <div class='code'>1</div> <div class='code'>2</div> ",
      },
      {
        ID: "D",
        description: "<div class='code'>0</div> <div class='code'>1</div> <div class='code'>2</div> ",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "The postfix unary operator <div class='code'>++</div>:<br><br>1. Returns the value (this returns <div class='code'>0</div>)<br>2. Increments the value (number is now <div class='code'>1</div>)<br>The prefix unary operator <div class='code'>++</div>:<br>Increments the value (number is now <div class='code'>2</div>)<br>Returns the value (this returns <div class='code'>2</div>)<br>This returns <div class='code'>0 2 2.</div>",
    },
  },

  {
    ID: "13",
    subject: "What's the output?",
    description:
      "function getAge(...args) {<br>  console.log(typeof args);<br>}<br>getAge(21);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>\"number\"</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>\"array\"</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>\"object\"</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>\"NaN\"</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "The rest parameter (<div class='code'>...args</div>) lets us \"collect\" all remaining arguments into an array. An array is an object, so <div class='code'>typeof args</div> returns <div class='code'>\"object\"</div>"},
  },

  {
    ID: "14",
    subject: "What's the output?",
    description:
      "function getAge() {<br> 'use strict';<br> age = 21;<br> console.log(age);}<br><br>getAge();",
    options: [
      {
        ID: "A",
        description: "<div class='code'>21</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>undefined</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>ReferenceError</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>TypeError</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "With <div class='code'>\"use strict\"</div>, you can make sure that you don't accidentally declare global variables. We never declared the variable <div class='code'>age</div>, and since we use <div class='code'>\"use strict\"</div>, it will throw a reference error. If we didn't use <div class='code'>\"use strict\"</div>, it would have worked, since the property <div class='code'>age</div> would have gotten added to the global object."
      },
  },

  {
    ID: "15",
    subject: "What's the value of <div class='code'>sum</div>?",
    description:
      "const sum = eval('10*10+5');",
    options: [
      {
        ID: "A",
        description: "<div class='code'>105</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>\"105\"</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>TypeError</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>\"10*10+5\"</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "<div class='code'>eval</div> evaluates codes that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is <div class='code'>10 * 10 + 5</div>. This returns the number <div class='code'>105</div>."
      },
  },

  {
    ID: "16",
    subject: "How long is cool_secret accessible?",
    description:
      "sessionStorage.setItem('cool_secret', 123);",
    options: [
      {
        ID: "A",
        description: "Forever, the data doesn't get lost.",
      },
      {
        ID: "B",
        description: "When the user closes the tab.",
      },
      {
        ID: "C",
        description: "When the user closes the entire browser, not only the tab.",
      },
      {
        ID: "D",
        description: "When the user shuts off their computer.",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "The data stored in <div class='code'>sessionStorage</div> is removed after closing the tab.<br>If you used <div class='code'>localStorage</div>, the data would've been there forever, unless for example <div class='code'>localStorage.clear()</div> is invoked.."
      },
  },

  {
    ID: "17",
    subject: "What's the output?",
    description:
      "var num = 8;<br>var num = 10;<br>console.log(num);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>8</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>10</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>SyntaxError</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>ReferenceError</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "With the <div class='code'>var</div> keyword, you can declare multiple variables with the same name. The variable will then hold the latest value.<br>You cannot do this with <div class='code'>let</div> or <div class='code'>const</div> since they're block-scoped."
      },
  },

  {
    ID: "18",
    subject: "What's the output?",
    description:
      "const obj = { 1: 'a', 2: 'b', 3: 'c' };<br>const set = new Set([1, 2, 3, 4, 5]);<br>obj.hasOwnProperty('1');<br>obj.hasOwnProperty(1);<br>set.has('1');<br>set.has(1);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>false</div> <div class='code'>true</div> <div class='code'>false</div> <div class='code'>true</div> ",
      },
      {
        ID: "B",
        description: "<div class='code'>false</div> <div class='code'>true</div> <div class='code'>true</div> <div class='code'>true</div> ",
      },
      {
        ID: "C",
        description: "<div class='code'>true</div> <div class='code'>true</div> <div class='code'>false</div> <div class='code'>true</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>true</div> <div class='code'>true</div> <div class='code'>true</div> <div class='code'>true</div> ",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why <div class='code'>obj.hasOwnProperty('1')</div> also returns true.<br>It doesn't work that way for a set. There is no <div class='code'>'1'</div> in our set: <div class='code'>set.has('1')</div> returns <div class='code'>false</div>. It has the numeric type <div class='code'>1</div>, <div class='code'>set.has(1)</div> returns <div class='code'>true</div>."
      },
  },

  {
    ID: "19",
    subject: "What's the output?",
    description:
      "const obj = { a: 'one', b: 'two', a: 'three' };<br>console.log(obj);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>{ a: \"one\", b: \"two\" }</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>{ a: \"two\", b: \"three\" }</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>{ a: \"three\", b: \"two\" }</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>SyntaxError</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value."
      },
  },

  {
    ID: "20",
    subject: "The JavaScript global execution context creates two things for you: the global object, and the \"this\" keyword.",
    description:
      "",
    options: [
      {
        ID: "A",
        description: "True",
      },
      {
        ID: "B",
        description: "False",
      },
      {
        ID: "C",
        description: "It Depends",
      },
      {
        ID: "D",
        description: "Maybe",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "The base execution context is the global execution context: it's what's accessible everywhere in your code."
      },
  },

  {
    ID: "21",
    subject: "What's the output?",
    description:
      "for (let i = 1; i < 5; i++) {<br>if (i === 3) continue;<br>console.log(i);<br>}",
    options: [
      {
        ID: "A",
        description: "<div class='code'>1</div> <div class='code'>2</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>1</div> <div class='code'>2</div> <div class='code'>3</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>1</div> <div class='code'>2</div> <div class='code'>4</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>1</div> <div class='code'>3</div> <div class='code'>4</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "The <div class='code'>continue</div> statement skips an iteration if a certain condition returns true."
      },
  },

  {
    ID: "22",
    subject: "What's the output?",
    description:
      "const a = {};<br>const b = { key: 'b' };<br>const c = { key: 'c' };<br>a[b] = 123;<br>a[c] = 456;<br>console.log(a[b]);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>123</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>456</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>Undefined</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>ReferenceError</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "Object keys are automatically converted into strings. We are trying to set an object as a key to object <div class='code'>a</div>, with the value of <div class='code'>123</div>.<br>However, when we stringify an object, it becomes \"<div class='code'>[object Object]</div>\". So what we are saying here, is that <div class='code'>a[\"[object Object]\"] = 123</div>. Then, we can try to do the same again. c</div> is another object that we are implicitly stringifying. So then, <div class='code'>a[\"[object Object]</div>\"] = 456.<br>Then, we log <div class='code'>a[b]</div>, which is actually <div class='code'>a[\"[object Object]\"]</div>. We just set that to <div class='code'>456</div>, so it returns <div class='code'>456</div>."
      },
  },

  {
    ID: "23",
    subject: "What is the output?",
    description:
      "function sayHi() {<br>return (() => 0)();}<br>console.log(typeof sayHi());<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>object</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>number</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>function</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>undefined</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "The <div class='code'>sayHi</div> function returns the returned value of the immediately invoked function expression (IIFE). This function returned <div class='code'>0</div>, which is type <div class='code'>\"number\"</div>.<br>FYI: there are only 7 built-in types: <div class='code'>null</div>, <div class='code'>undefined</div>, <div class='code'>boolean</div>, <div class='code'>number</div>, <div class='code'>string</div>, <div class='code'>object</div>, and <div class='code'>symbol</div>. <div class='code'>\"function\"</div> is not a type, since functions are objects, it's of type <div class='code'>\"object\"</div>."},
  },

  {
    ID: "24",
    subject: "Which of these values are falsy?",
    description:
      "0;<br>new Number(0);<br>('');<br>(' ');new Boolean(false);<br>undefined;",
    options: [
      {
        ID: "A",
        description: "<div class='code'>0</div> <div class='code'>''</div> <div class='code'>undefined</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>0</div>, <div class='code'>new Number 0</div>, <div class='code'>''</div>,<div class='code'>new Boolean(false),</div> <div class='code'>undefined</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>0</div>, <div class='code'>''</div>,<div class='code'>new Boolean(false),</div> <div class='code'>undefined</div>"
      },
      {
        ID: "D",
        description: "All of them are falsy",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "There are 8 falsy values:<br><div class='code'>undefined</div><br><div class='code'>null</div><br><div class='code'>NaN</div></div><br><div class='code'>false</div><br><div class='code'>''</div> (empty string)<br><div class='code'>0</div><br><div class='code'>-0</div><br><div class='code'>0n (BigInt(0))</div><br>Function constructors, like <div class='code'>new Number</div> and <div class='code'>new Boolean</div> are truthy."},
  },

  {
    ID: "24",
    subject: "What's the output?",
    description:
      "console.log(typeof typeof 1);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>\"number\"</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>\"string\"</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>\"object\"</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>\"undefined\"</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "<div class='code'>typeof 1</div> returns <div class='code'>\"number\"</div>. <div class='code'>typeof \"number\"</div> returns \"<div class='code'>string\"</div>"},
  },

  {
    ID: "25",
    subject: "What's the output?",
    description:
      "const numbers = [1, 2, 3];<br>numbers[10] = 11;<br>console.log(numbers);<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>[1, 2, 3, 7 x null, 11]</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>[1, 2, 3, 11]</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>[1, 2, 3, 7 x empty, 11]</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>SyntaxError</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called \"empty slots\". These actually have the value of <div class='code'>undefined</div>, but you will see something like:<br><div class='code'>[1, 2, 3, 7 x empty, 11]</div><br>depending on where you run it (it's different for every browser, node, etc.)"},
  },

  {
    ID: "27",
    subject: "Pick an answer",
    description:
      "Everything in JavaScript is either a...",
    options: [
      {
        ID: "A",
        description: "primitive or object",
      },
      {
        ID: "B",
        description: "function or object",
      },
      {
        ID: "C",
        description: "trick question! only objects",
      },
      {
        ID: "D",
        description: "number or object",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "JavaScript only has primitive types and objects.<br>Primitive types are <div class='code'>boolean, null, undefined, bigint, number, string, and symbol</div>.<br>What differentiates a primitive from an object is that primitives do not have any properties or methods; however, you'll note that <div class='code'>'foo'.toUpperCase()</div> evaluates to <div class='code'>'FOO'</div> and does not result in a <div class='code'>TypeError</div>. This is because when you try to access a property or method on a primitive like a string, JavaScript will implicitly wrap the primitive type using one of the wrapper classes, i.e. String, and then immediately discard the wrapper after the expression evaluates. All primitives except for <div class='code'>null</div> and <div class='code'>undefined</div> exhibit this behaviour."},
  },

  {
    ID: "28",
    subject: "What does the setInterval method return in the browser?",
    description:
      "setInterval(() => console.log('Hi'), 1000);",
    options: [
      {
        ID: "A",
        description: "a unique id",
      },
      {
        ID: "B",
        description: "the amount of milliseconds specified",
      },
      {
        ID: "C",
        description: "the passed function",
      },
      {
        ID: "D",
        description: "undefined",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "It returns a unique id. This id can be used to clear that interval with the <div class='code'>clearInterval()</div> function."},
  },

  {
    ID: "29",
    subject: "What does this return?",
    description:
      "[...'Lydia'];",
    options: [
      {
        ID: "A",
        description: "<div class='code'>[\"L\", \"y\", \"d\", \"i\", \"a\"]</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>[\"Lydia\"]</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>[[], \"Lydia\"]</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>[[\"L\", \"y\", \"d\", \"i\", \"a\"]]</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "A string is an iterable. The spread operator maps every character of an iterable to one element."},
  },

  {
    ID: "30",
    subject: "What's the value of num?",
    description:
      "const num = parseInt('7*6', 10);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>42</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>\"42\"</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>7</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>NaN</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "Only the first numbers in the string is returned. Based on the radix (the second argument in order to specify what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), the <div class='code'>parseInt</div> checks whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the radix, it stops parsing and ignores the following characters.<div class='code'>*</div> is not a valid number. It only parses <div class='code'>\"7\"</div> into the decimal <div class='code'>7</div>. num now holds the value of <div class='code'>7</div>."},
  },

  {
    ID: "31",
    subject: "What's the output?",
    description:
      "[1, 2, 3].map(num => {<br>  if (typeof num === 'number') return;<br>  return num * 2;<br>});",
    options: [
      {
        ID: "A",
        description: "<div class='code'>[]</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>[null, null, null]</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>[undefined, undefined, undefined]</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>[ 3 x empty ]</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "When mapping over the array, the value of <div class='code'>num</div> is equal to the element it’s currently looping over. In this case, the elements are numbers, so the condition of the if statement <div class='code'>typeof num === \"number\"</div> returns <div class='code'>true</div>. The map function creates a new array and inserts the values returned from the function.<br>However, we don’t return a value. When we don’t return a value from the function, the function returns <div class='code'>undefined</div>. For every element in the array, the function block gets called, so for each element we return <div class='code'>undefined</div>."},
  },

  {
    ID: "32",
    subject: "What's the output?",
    description:
      "function Car() {<br>  this.make = 'Lamborghini';<br>  return { make: 'Maserati' };<br>}<br><br>const myCar = new Car();<br>console.log(myCar.make);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>\"Lamborghini\"</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>\"Maserati\"</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>ReferenceError</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>TypeError</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "When you return a property, the value of the property is equal to the returned value, not the value set in the constructor function. We return the string <div class='code'>\"Maserati\"</div>, so <div class='code'>myCar.make</div> is equal to <div class='code'>\"Maserati\"</div>."},
  },

  {
    ID: "33",
    subject: "What's the output?",
    description:
      "const set = new Set([1, 1, 2, 3, 4]);<br>console.log(set);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>[1, 1, 2, 3, 4]</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>[1, 2, 3, 4]</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>{1, 1, 2, 3, 4}</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>{1, 2, 3, 4}</div>",
      },
    ],
    Answer: {
      Option: "D",
      Explanation:
        "The Set object is a collection of unique values: a value can only occur once in a set.<br>We passed the iterable <div class='code'>[1, 1, 2, 3, 4]</div> with a duplicate value <div class='code'>1</div>. Since we cannot have two of the same values in a set, one of them is removed. This results in <div class='code'>{1, 2, 3, 4}</div>."},
  },

  {
    ID: "34",
    subject: "What's the output?",
    description:
      "console.log(Number(2) === Number(2));<br>console.log(Boolean(false) === Boolean(false));<br>console.log(Symbol('foo') === Symbol('foo'));<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>true</div>, <div class='code'>true</div>, <div class='code'>false</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>false</div>, <div class='code'>true</div>, <div class='code'>false</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>true</div>, <div class='code'>false</div>, <div class='code'>true</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>true</div>, <div class='code'>true</div>, <div class='code'>true</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "Every Symbol is entirely unique. The purpose of the argument passed to the Symbol is to give the Symbol a description. The value of the Symbol is not dependent on the passed argument. As we test equality, we are creating two entirely new symbols: the first <div class='code'>Symbol('foo')</div>, and the second <div class='code'>Symbol('foo')</div>. These two values are unique and not equal to each other, <div class='code'>Symbol('foo') === Symbol('foo')</div> returns <div class='code'>false</div>."},
  },

  {
    ID: "35",
    subject: "What's the output?",
    description:
      "console.log('🥑' + '💻');",
    options: [
      {
        ID: "A",
        description: "<div class='code'>\"🥑💻\"</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>257548</div>",
      },
      {
        ID: "C",
        description: "A string containing their code points",
      },
      {
        ID: "D",
        description: "Error",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "With the <div class='code'>+</div> operator, you can concatenate strings. In this case, we are concatenating the string <div class='code'>\"🥑\"</div> with the string <div class='code'>\"💻\"</div>, resulting in <div class='code'>\"🥑💻\".</div>"},
  },

  {
    ID: "36",
    subject: "What's the output?",
    description:
      "function addToList(item, list) {<br>  return list.push(item);<br>}<br><br>const result = addToList('apple', ['banana']);<br>console.log(result);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>['apple', 'banana']</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>2</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>true</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>undefined</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "The <div class='code'>.push()</div> method returns the length of the new array! Previously, the array contained one element (the string <div class='code'>\"banana\")</div> and had a length of <div class='code'>1</div>. After adding the string <div class='code'>\"apple\"</div> to the array, the array contains two elements, and has a length of <div class='code'>2</div>. This gets returned from the <div class='code'>addToList</div> function. The <div class='code'>push</div> method modifies the original array. If you wanted to return the array from the function rather than the length of the array, you should have returned <div class='code'>list</div> after pushing <div class='code'>item</div> to it."},
  },

  {
    ID: "37",
    subject: "What's the output?",
    description:
      "const { name: myName } = { name: 'Lydia' };<br><br>console.log(name);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>\"Lydia\"</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>\"myName\"</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>\"undefined\"</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>\"ReferenceError\"</div>",
      },
    ],
    Answer: {
      Option: "D",
      Explanation:
        "When we unpack the property <div class='code'>name</div> from the object on the right-hand side, we assign its value <div class='code'>\"Lydia\"</div> to a variable with the name <div class='code'>myName.</div><br>With <div class='code'>{ name: myName }</div>, we tell JavaScript that we want to create a new variable called <div class='code'>myName</div> with the value of the <div class='code'>name</div> property on the right-hand side.<br>Since we try to log <div class='code'>name</div>, a variable that is not defined, a ReferenceError gets thrown."},
  },

  {
    ID: "38",
    subject: "What kind of a function is this?",
    description:
      "function sum(a, b) {<br>  return a + b;<br>}",
    options: [
      {
        ID: "A",
        description: "A pure function",
      },
      {
        ID: "B",
        description: "An impure function ",
      },
      {
        ID: "C",
        description: "A Lambda function ",
      },
      {
        ID: "D",
        description: "None of the above",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "A pure function is a function that always returns the same result, if the same arguments are passed.<br><br>The <div class='code'>sum</div> function always returns the same result. If we pass <div class='code'>1</div> and <div class='code'>2</div>, it will always return <div class='code'>3</div> without side effects. If we pass <div class='code'>5</div> and <div class='code'>10</div>, it will always return <div class='code'>15</div>, and so on. This is the definition of a pure function."},
  },

  {
    ID: "39",
    subject: "What is the output?",
    description:
      "const list = [1 + 2, 1 * 2, 1 / 2];<br>console.log(list);<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>[\"1 + 2\", \"1 * 2\", \"1 / 2\"]</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>[\"12\", 2, 0.5]</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>[3, 2, 0.5]</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>[1, 1, 1]</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "Array elements can hold any value. Numbers, strings, objects, other arrays, null, boolean values, undefined, and other expressions such as dates, functions, and calculations.<br><br>The element will be equal to the returned value. <div class='code'>1 + 2</div> returns <div class='code'>3</div>, <div class='code'>1 * 2</div> returns <div class='code'>2</div>, and <div class='code'>1 / 2</div> returns <div class='code'>0.5.</div><br><br>"},
  },

  {
    ID: "40",
    subject: "What is the output?",
    description:
      "function sayHi(name) {<br>  return `Hi there, ${name}`;<br>}<br><br>console.log(sayHi());",
    options: [
      {
        ID: "A",
        description: "<div class='code'>Hi there,</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>Hi there, undefined</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>Hi there, null</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>ReferenceError</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "By default, arguments have the value of <div class='code'>undefined</div>, unless a value has been passed to the function. In this case, we didn't pass a value for the <div class='code'>name</div> argument. <div class='code'>name</div> is equal to <div class='code'>undefined</div> which gets logged.<br><br>In ES6, we can overwrite this default <div class='code'>undefined</div> value with default parameters. For example:<br><br><div class='code'>function sayHi(name = \"Lydia\") { ... }</div><br><br>In this case, if we didn't pass a value or if we passed <div class='code'>undefined</div>,<div class='code'> name</div> would always be equal to the string <div class='code'>Lydia</div><br><br>"},
  },

  {
    ID: "41",
    subject: "What is the output?",
    description:
    "function checkAge(age) {<br>  if (age < 18) {<br>    const message = \"Sorry, you're too young.\";<br>  } else {<br>    const message = \"Yay! You're old enough!\";<br>  }<br><br>  return message;<br>}<br><br>console.log(checkAge(21));",
    options: [
      {
        ID: "A",
        description: "<div class='code'>\"Sorry, you're too young.\"</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>\"Yay! You're old enough!.\"</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>ReferenceError</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>undefined</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "Variables with the <div class='code'>const</div> and <div class='code'>let</div> keyword are block-scoped. A block is anything between curly brackets (<div class='code'>{ }</div>). In this case, the curly brackets of the if/else statements. You cannot reference a variable outside of the block it's declared in, a ReferenceError gets thrown."},
  },

  {
    ID: "42",
    subject: "What kind of information would get logged?",
    description:
    "fetch('https://www.website.com/api/user/1')<br>  .then(res => res.json())<br>  .then(res => console.log(res));",
    options: [
      {
        ID: "A",
        description: "The result of the <div class='code'>fetch</div> method",
      },
      {
        ID: "B",
        description: "The result of the second invocation of the <div class='code'>fetch</div> method",
      },
      {
        ID: "C",
        description: "The result of the callback in the previous <div class='code'>.then()</div>.",
      },
      {
        ID: "D",
        description: "It would always be undefined.",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "The value of <div class='code'>res</div> in the second <div class='code'>.then</div> is equal to the returned value of the previous <div class='code'>.then</div>. You can keep chaining <div class='code'>.thens</div> like this, where the value is passed to the next handler."},
  },

  {
    ID: "43",
    subject: "What's the output?",
    description:
    "console.log('I want pizza'[0]);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>\"\"\"</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>\"I\"</div>",
      },
      {
        ID: "C",
        description: "SyntaxError",
      },
      {
        ID: "D",
        description: "undefined",
      },
    ],
    Answer: {
      Option: "B",
      Explanation:
        "In order to get an character on a specific index in a string, you can use bracket notation. The first character in the string has index 0, and so on. In this case we want to get the element which index is 0, the character <div class='code'>\"I\"</div>, which gets logged.<br>Note that this method is not supported in IE7 and below. In that case, use <div class='code'>.charAt()</div>"},
  },

  {
    ID: "44",
    subject: "What's the output?",
    description:
    "let newList = [1, 2, 3].push(4);<br><br>console.log(newList.push(5));",
    options: [
      {
        ID: "A",
        description: "<div class='code'>[1, 2, 3, 4, 5]</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>[1, 2, 3, 5]</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>[1, 2, 3, 4]</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>Error</div>",
      },
    ],
    Answer: {
      Option: "D",
      Explanation:
        "The <div class='code'>.push</div> method returns the new length of the array, not the array itself! By setting <div class='code'>newList</div> equal to <div class='code'>[1, 2, 3].push(4)</div>, we set <div class='code'>newList</div> equal to the new length of the array: 4.<br><br>Then, we try to use the <div class='code'>.push</div> method on <div class='code'>newList</div>. Since <div class='code'>newList</div> is the numerical value <div class='code'>4</div>, we cannot use the <div class='code'>.push</div> method: a TypeError is thrown."},
  },

  {
    ID: "45",
    subject: "What's the output?",
    description:
    "const name = 'Lydia';<br><br>console.log(name());<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>SyntaxError</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>ReferenceError</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>TypeError</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>undefined</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "The variable <div class='code'>name</div> holds the value of a string, which is not a function, thus cannot invoke.<br><br>TypeErrors get thrown when a value is not of the expected type. JavaScript expected <div class='code'>name</div> to be a function since we're trying to invoke it. It was a string however, so a TypeError gets thrown: name is not a function!<br><br>SyntaxErrors get thrown when you've written something that isn't valid JavaScript, for example when you've written the word <div class='code'>return</div> as <div class='code'>retrun</div>. ReferenceErrors get thrown when JavaScript isn't able to find a reference to a value that you're trying to access."},
  },

  {
    ID: "46",
    subject: "What's its value?",
    description:
    "Promise.resolve(5);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>5</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>Promise {<pending>: 5}</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>Promise {<fulfilled>: 5}</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>Error</div>",
      },
    ],
    Answer: {
      Option: "C",
      Explanation:
        "We can pass any type of value we want to <div class='code'>Promise.resolve</div>, either a promise or a non-promise. The method itself returns a promise with the resolved value <div class='code'>(<fulfilled></div>). If you pass a regular function, it'll be a resolved promise with a regular value. If you pass a promise, it'll be a resolved promise with the resolved value of that passed promise.<br><br>In this case, we just passed the numerical value <div class='code'>5</div>. It returns a resolved promise with the value <div class='code'>5</div>.<br><br>"},
  },

  {
    ID: "47",
    subject: "Which of these methods modifies the original array?",
    description:
    "const emojis = ['✨', '🥑', '😍'];<br><br>emojis.map(x => x + '✨');<br>emojis.filter(x => x !== '🥑');<br>emojis.find(x => x !== '🥑');<br>emojis.reduce((acc, cur) => acc + '✨');<br>emojis.slice(1, 2, '✨');<br>emojis.splice(1, 2, '✨');<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>All of them</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>map</div> <div class='code'>reduce</div> <div class='code'>slice</div> <div class='code'>splice</div> ",
      },
      {
        ID: "C",
        description: "<div class='code'>map</div> <div class='code'>reduce</div> <div class='code'>slice</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>splice</div>",
      },
    ],
    Answer: {
      Option: "D",
      Explanation:
        "With <div class='code'>splice</div> method, we modify the original array by deleting, replacing or adding elements. In this case, we removed 2 items from index 1 (we removed '🥑' and '😍') and added the ✨ emoji instead.<br><br><div class='code'>map</div>, <div class='code'>filter</div> and <div class='code'>slice</div> return a new array, <div class='code'>find</div> returns an element, and <div class='code'>reduce</div> returns a reduced value.<br><br>"},
  },

  {
    ID: "48",
    subject: "What's the output?",
    description:
    "const food = ['🍕', '🍫', '🥑', '🍔'];<br>const info = { favoriteFood: food[0] };<br><br>info.favoriteFood = '🍝';<br><br>console.log(food);<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>['🍕', '🍫', '🥑', '🍔']</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>['🍝', '🍫', '🥑', '🍔']</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>['🍕', '🍫', '🥑', '🍔']</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>ReferenceError</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation:
        "We set the value of the <div class='code'>favoriteFood</div> property on the <div class='code'>info</div> object equal to the string with the pizza emoji, <div class='code'>'🍕'</div>. A string is a primitive data type. In JavaScript, primitive data types don't interact by reference.<br><br>In JavaScript, primitive data types (everything that's not an object) interact by value. In this case, we set the value of the <div class='code'>favoriteFood</div> property on the <div class='code'>info</div> object equal to the value of the first element in the <div class='code'>food</div> array, the string with the pizza emoji in this case (<div class='code'>'🍕'</div>). A string is a primitive data type, and interact by value (see my blogpost if you're interested in learning more)<br><br>Then, we change the value of the <div class='code'>favoriteFood</div> property on the <div class='code'>info</div> object. The <div class='code'>food</div> array hasn't changed, since the value of <div class='code'>favoriteFood</div> was merely a copy of the value of the first element in the array, and doesn't have a reference to the same spot in memory as the element on <div class='code'>food[0]</div>. When we log food, it's still the original array, <div class='code'>['🍕', '🍫', '🥑', '🍔']</div>.<br><br>"},
  },

  {
    ID: "49",
    subject: "What's the output?",
    description:
    "console.log(`${(x => x)('I love')} to program`);",
    options: [
      {
        ID: "A",
        description: "<div class='code'>I love to program</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>undefined to program</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>${(x => x)('I love') to program</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>TypeError</div>",
      },
    ],
    Answer: {
      Option: "A",
      Explanation: "Expressions within template literals are evaluated first. This means that the string will contain the returned value of the expression, the immediately invoked function <div class='code'>(x => x)('I love')</div> in this case. We pass the value <div class='code'>'I love'</div> as an argument to the <div class='code'>x => x</div> arrow function. <div class='code'>x</div> is equal to <div class='code'>'I love'</div>, which gets returned. This results in <div class='code'>I love to program.</div><br>"},
  },

  {
    ID: "50",
    subject: "What's the output?",
    description:
    "let num = 1;<br>const list = ['🥳', '🤠', '🥰', '🤪'];<br><br>console.log(list[(num += 1)]);<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>🤠</div>",
      },
      {
        ID: "B",
        description: "<div class='code'>🥰</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>SyntaxError</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>ReferenceError</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation: "With the <div class='code'>+=</div> operand, we're incrementing the value of <div class='code'>num</div> by <div class='code'>1</div>. <div class='code'>num</div> had the initial value <div class='code'>1</div>, so <div class='code'>1 + 1</div> is <div class='code'>2</div>. The item on the second index in the <div class='code'>list</div> array is 🥰, <div class='code'>console.log(list[2])</div> prints 🥰."},
  },

  {
    ID: "51",
    subject: "What's the output?",
    description:
    "const groceries = ['banana', 'apple', 'peanuts'];<br><br>if (groceries.indexOf('banana')) {<br>  console.log('We have to buy bananas!');<br>} else {<br>  console.log(`We don't have to buy bananas!`);<br>}",
    options: [
      {
        ID: "A",
        description: "We have to buy bananas!",
      },
      {
        ID: "B",
        description: "We don't have to buy bananas",
      },
      {
        ID: "C",
        description: "<div class='code'>undefined</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>1</div>",
      },
    ],
    Answer: {
      Option: "B",
      Explanation: "We passed the condition <div class='code'>groceries.indexOf(\"banana\")</div> to the if-statement. <div class='code'>groceries.indexOf(\"banana\")</div> returns <div class='code'>0</div>, which is a falsy value. Since the condition in the if-statement is falsy, the code in the <div class='code'>else</div> block runs, and <div class='code'>We don't have to buy bananas!</div> gets logged.<br><br>"},
  },

  {
    ID: "52",
    subject: "What's the output?",
    description:
    "const config = {<br>  languages: [],<br>  set language(lang) {<br>    return this.languages.push(lang);<br>  },<br>};<br><br>console.log(config.language);<br>",
    options: [
      {
        ID: "A",
        description: "<div class='code'>function language(lang) { this.languages.push(lang }</div>",
      },  
      {
        ID: "B",
        description: "<div class='code'>0</div>",
      },
      {
        ID: "C",
        description: "<div class='code'>[]</div>",
      },
      {
        ID: "D",
        description: "<div class='code'>undefined</div>",
      },
    ],
    Answer: {
      Option: "D",
      Explanation: "The <div class='code'>language</div> method is a <div class='code'>setter</div>. Setters don't hold an actual value, their purpose is to modify properties. When calling a <div class='code'>setter</div> method, <div class='code'>undefined</div> gets returned."},
  },





  
];