let player1 = prompt("Player One: Enter your name. You will be Green");
let player1Color = "rgb(86, 255, 71)";
let player2 = prompt("Player Two: Enter your name. You will be Red");
let player2Color = "rgb(237, 45, 73)";
let gameOn = true;
let table = $("table tr");

function reportWin(rowNum, colNum) {
	console.log("You won starting at this row,col");
	console.log(rowNum);
	console.log(colNum);
}
// Change the color of a button
function changeColor(rowIndex, colIndex, color) {
	return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color", color);
}

// Report Back to current color of a button
function returnColor(rowIndex, colIndex) {
	return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color");
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
	let colorReport = returnColor(5, colIndex);
	for (let row = 5; row > -1; row--) {
		colorReport = returnColor(row, colIndex);
		if (colorReport === "rgb(128, 128, 128)") {
			return row;
		}
	}
}

// Check to see if 4 inputs are the same color
function colorMatchCheck(one, two, three, four) {
	return one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined;
}

// Check for Horizontal Wins
function horizontalWinCheck() {
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 4; col++) {
			if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
				console.log("horiz");
				reportWin(row, col);
				return true;
			}
		}
	}
}

// Check for Vertical Wins
function verticalWinCheck() {
	for (let col = 0; col < 7; col++) {
		for (let row = 0; row < 3; row++) {
			if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
				console.log("vertical");
				reportWin(row, col);
				return true;
			}
		}
	}
}

// Check for Diagonal Wins
function diagonalWinCheck() {
	for (let col = 0; col < 5; col++) {
		for (let row = 0; row < 7; row++) {
			if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
				console.log("diag");
				reportWin(row, col);
				return true;
			} else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
				console.log("diag");
				reportWin(row, col);
				return true;
			}
		}
	}
}

let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;

$("h3").text(player1 + " it is your turn , pick a column to drop in!");
$(".board button").on("click", function () {
	let col = $(this).closest("td").index();
	let bottomAvail = checkBottom(col);
	changeColor(bottomAvail, col, currentColor);
	if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
		$("h1").text(currentName + ", You have won!");
		$("h2").fadeOut("fast");
		$("h3").fadeOut("fast");
	}

	currentPlayer = currentPlayer * -1;
	if (currentPlayer === 1) {
		currentName = player1;
		currentColor = player1Color;
	} else {
		currentName = player2;
		currentColor = player2Color;
	}
	$("h3").text(currentName + ", it is your turn.");
});
