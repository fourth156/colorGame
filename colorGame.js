var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons() {
    //Mode buttons event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();

        });
    }
}

function setUpSquares(){
    for (var i = 0; i < squares.length; i++) {

        //Add click listeners to squares;
        squares[i].addEventListener("click", function () {
            //Grab color of clicked square
            var clickedColor = this.style.background;
            //Compare color to pickedColored
            if (clickedColor.includes(pickedColor)) {
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                h1.style.background = clickedColor;
                resetButton.textContent = "Play Again?";
            }
            else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
}

function reset() {
    //Generate all new colors 
    colors = generateRandomColors(numSquares);
    //Pick a new random color from array
    pickedColor = pickColor();
    //Change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    //Change color of squares
    for (var i = 0; i < squares.length; i++) {
        // Add initial colors to squares
        if (colors[i])
        {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display =  "none";
        }
    }
    h1.style.background = "steelblue";
}



resetButton.addEventListener("click", function(){
    reset();
});

colorDisplay.textContent = pickedColor.toUpperCase();



function changeColors(color) {
    //Loop through all squares
    for (var i = 0; i < colors.length; i++){
        //Change each color to match given color
        squares[i].style.background = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //Make an array;
    var arr = [];
    //Add num random colors to array
    for (var i = 0; i < num; i++) {
        //Get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor() {
    //Pick a r from 0 to 255
    var r = Math.floor(Math.random()*256);
    //Pick a g from 0 to 255
    var g = Math.floor(Math.random() * 256);
    //Pick a b from 0 to 255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}