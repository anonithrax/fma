var digit = 1;
var question = 5;
var speed = 0.5;
var numbers = [];
var currentQuestionIndex = 0;
var startTime;
var endTime;
var score = 0;

function updateSettings() {
    digit = parseInt(document.getElementById("digit").value);
    question = parseInt(document.getElementById("question").value);
    speed = parseFloat(document.getElementById("speed").value);
}

function startGame() {
    updateSettings();
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
            var digitToAdd = Math.floor(Math.random() * 9) + 1;
            num += digitToAdd;
        }
        numbers.push(parseInt(num));
    }
}


function displayNumbers() {
    var currentIndex = 0;

    var intervalId = setInterval(function () {
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

    var actualSum = numbers.reduce(function (acc, curr) {
        return acc + curr;
    }, 0);

    if (userSum === actualSum) {
        score += 10;
    } else {
        document.getElementById("number").innerText = "Correct answer: " + actualSum;
    }

    endGame();
}


function endGame() {
    document.getElementById("show-score").innerHTML = score;

    var playAgainButton = document.getElementById("play-again-button");
    if (!playAgainButton) {
        playAgainButton = document.createElement("button");
        playAgainButton.textContent = "Play Again";
        playAgainButton.id = "play-again-button";
        playAgainButton.addEventListener("click", startNewGame);
        document.getElementById("game").appendChild(playAgainButton);
    }

    var menuButton = document.getElementById("menu-button");
    if (!menuButton) {
        menuButton = document.createElement("button");
        menuButton.textContent = "Menu";
        menuButton.id = "menu-button";
        menuButton.addEventListener("click", showMenu);
        document.getElementById("game").appendChild(menuButton);
    }
}

function startNewGame() {
    currentQuestionIndex = 0;
    generateNumbers();
    displayNumbers();
}

function showMenu() {
    document.getElementById("settings").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("number").innerText = "";
    document.getElementById("show-score").innerText = "";

    var playAgainButton = document.getElementById("play-again-button");
    if (playAgainButton) {
        playAgainButton.parentNode.removeChild(playAgainButton);
    }

    var menuButton = document.getElementById("menu-button");
    if (menuButton) {
        menuButton.parentNode.removeChild(menuButton);
    }
}
