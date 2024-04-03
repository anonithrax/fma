var digit = 1; 
var question = 5;
var speed = 0.5; 
var numbers = [];
var currentQuestionIndex = 0;
var startTime;
var endTime;
var score = 0;

function startGame() {
    document.getElementById("settings").style.display = "none";
    document.getElementById("game").style.display = "block";

   
    generateNumbers();

    displayNumbers();
}

function generateNumbers() {
    numbers = [];
    for (var i = 0; i < question; i++) {
        var num = "";
        for (var j = 0; j < digit; j++) {
            num += Math.floor(Math.random() * 10); // Generate random digit
        }
        numbers.push(parseInt(num)); // Convert string to integer for sum calculation
    }
}

function displayNumbers() {
    var currentIndex = 0;

    var intervalId = setInterval(function() {
        if (currentIndex < numbers.length) {
            document.getElementById("number").innerText = numbers[currentIndex++];
        } else {
            clearInterval(intervalId);
            promptUser();
        }
    }, speed * 1000); 
}

function promptUser() {
    var userSum = parseInt(prompt("Enter the sum of the displayed numbers:"));

    var actualSum = numbers.reduce(function(acc, curr) {
        return acc + curr;
    }, 0);

   
    if (userSum === actualSum) {
        score += 10; // Increment score for correct answer
    }

    endGame();
}

function endGame() {
    document.getElementById("game").innerHTML = "<h2>Game Over!</h2><p>Your final score is: " + score + "</p>";
}
