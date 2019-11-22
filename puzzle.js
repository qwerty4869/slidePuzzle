var puzzle = document.getElementById(puzzle);
var movecount = 0;
var timerState = 0;
initPuzzle(3);

puzzle.addEventListener("click", function(event) {
  if (!isSolved()) {
    // e.target == tile <div> 요소
    // if(timerState===0){
    //   timer();
    // }  타이머
    if (event.target.classList.contains("moveable")) {
      swapTile(event.target);
      movecount++;
    }
  }
});
document.getElementById(shuffle).addEventListener("click", shuffle);
// document.getElementById(save).addEventListener('click',save);

function setPuzzle(e) {
  var v = parseInt(e.value);
  initPuzzle(v);
}
function initPuzzle(puzzleSize) {
  while (puzzle.hasChildNodes()) {
    puzzle.removeChild(puzzle.firstChild);
  } //기존 퍼즐 삭제
  var n = 1;
  for (var i = 0; i < puzzleSize; i++) {
    for (var j = 0; j < puzzleSize; j++) {
      var tile = document.createElement("div"); //new tile생성
      var row = i.toString();
      var col = j.toString();
      tile.id = row + col;
      tile.style.top = i * 100 + "px";
      tile.style.left = j * 100 + "px";

      if (n < puzzleSize * puzzleSize) {
        tile.className = "tile";
        tile.innerHTML = (n++).toString();
      } else {
        tile.className = "empty";
      }
      puzzle.appendChild(tile);
    }
  }
  shuffle();
  // save();
}
function swapTile(tile) {
  // var emptyTile = getEmptyTile();
  var temp = {
    style: tile.style.cssText,
    id: tile.id
  };
  tile.sytle.cssText = emptyTile.style.cssText;
  tile.id = emptyTile.id;
  emptyTile.style.cssText = temp.style;
  emptyTile.id = tmp.id;
}
function setMoveable() {
  var tilecount = puzzle.childElementCount;
  var size = Math.sqrt(tilecount);
  var emptyTile = document.querySelector(".empty");
  var premoveables = document.querySelectorAll(".moveable");
  var row = parseInt(emptyTile.id[0]);
  var col = parseInt(emptyTile.id[1]);

  for (var i = 0; i < premoveables.length; i++) {
    premoveables[i].classList.remove("moveable");
  } //기존 moveable remove

  if (row < size - 1) {
    getTile(row + 1, col).classList.add("moveable");
  }
  if (row > 0) {
    getTile(row - 1, col).classList.add("moveable");
  }
  if (col < size - 1) {
    getTile(row, col + 1).classList.add("moveable");
  }
  if (col > 0) {
    getTile(row, col - 1).classList.add("moveable");
  }
}
function isSolved() {
  var tilecount = puzzle.childElementCount;
  var size = Math.sqrt(tilecount);
  if (getTile(size - 1, size - 1).className !== "empty") {
    return false;
  }
  var n = 1;
  for (var i = 0; i < size; i++) {
    for (var i = 0; i < size; i++) {
      if (n < tilecount && getTile(i, j).innerHTML !== n.toString()) {
        return false;
      }
      n++;
    }
  }
  return true;
}
function getTile(row, col) {
  return document.getElementById(row + col);
}
function shuffle() {}
