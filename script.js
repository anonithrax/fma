var digit = 1; // Default digit count
var question = 5; // Default number of questions
var speed = 0.5; // Default speed in seconds
var numbers = [];
var currentQuestionIndex = 0;
var startTime;
var endTime;
var score = 0;

function startGame() {
    // Hide settings and show game screen
    document.getElementById("settings").style.display = "none";
    document.getElementById("game").style.display = "block";

    // Generate numbers
    generateNumbers();

    // Start displaying numbers
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
            clearInterval(intervalId); // Stop the interval
            promptUser();
        }
    }, speed * 1000); // Convert seconds to milliseconds
}

function promptUser() {
    // Prompt user for the sum of the displayed numbers
    var userSum = parseInt(prompt("Enter the sum of the displayed numbers:"));

    // Calculate the actual sum of the numbers
    var actualSum = numbers.reduce(function(acc, curr) {
        return acc + curr;
    }, 0);

    // Check if the user's input matches the actual sum
    if (userSum === actualSum) {
        score += 10; // Increment score for correct answer
    }

    // End the game
    endGame();
}

function endGame() {
    document.getElementById("game").innerHTML = "<h2>Game Over!</h2><p>Your final score is: " + score + "</p>";
}
