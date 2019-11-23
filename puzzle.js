var puzzle = document.getElementById("puzzle");

function setPuzzle(e) {
  var v = parseInt(e.value);
  initPuzzle(v);
}
initPuzzle(3); //처음 퍼즐
puzzle.addEventListener("click", function(event) {
  if (!isSolved()) {
    // e.target == tile <div> 요소
    // if(timerState===0){
    //   timer();
    // }  타이머
    if (event.target.classList.contains("moveable")) {
      var emptyTile = document.querySelector(".empty");
      swapTile(event.target, emptyTile);
      setMoveable();
    }
  }
});
document.getElementById("shuffle").addEventListener("click", shuffle);
// document.getElementById("start").addEventListener("click",start);(미완)
// document.getElementById(save).addEventListener('click',save); (미완)
function initPuzzle(puzzleSize) {
  while (puzzle.firstChild) {
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
        tile.innerHTML = "";
      }
      puzzle.appendChild(tile);
    }
  }
}
function swapTile(tile1, tile2) {
  var temp = {
    style: tile1.style.cssText,
    id: tile1.id
  };
  tile1.style.cssText = tile2.style.cssText;
  tile1.id = tile2.id;
  tile2.style.cssText = temp.style;
  tile2.id = temp.id;
}
function setMoveable() {
  var emptyTile = document.querySelector(".empty");
  var tilecount = puzzle.childElementCount;
  var size = Math.sqrt(tilecount);
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
function getTile(row, col) {
  var id = row.toString() + col.toString();
  return document.getElementById(id);
}
function shuffle() {
  var tilecount = puzzle.childElementCount;
  var size = Math.sqrt(tilecount);
  for (var i = size - 1; i >= 0; i--) {
    for (var j = size - 1; j >= 0; j--) {
      var random = Math.floor(Math.random() * (i * size + j));
      var randomRow = Math.floor(random / size);
      var randomCol = random % size;
      swapTile(getTile(i, j), getTile(randomRow, randomCol));
    }
  }
  if (!isSolvable()) {
    initPuzzle(size);
    shuffle();
  }
  setMoveable();
  console.log(sumInversions());
}
function countInversions(row, col) {
  var tilecount = puzzle.childElementCount;
  var size = Math.sqrt(tilecount);
  var tileValue = parseInt(getTile(row, col).innerHTML);
  var tileIndex = row * size + col;
  var inversions = 0;
  if (tileValue) {
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        var index = i * size + j;
        var compareValue = parseInt(getTile(i, j).innerHTML);
        if (tileValue > compareValue && tileIndex < index) {
          inversions++;
        }
      }
    }
  }
  return inversions;
}
function sumInversions() {
  var tilecount = puzzle.childElementCount;
  var size = Math.sqrt(tilecount);
  var sumInversions = 0;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      sumInversions += countInversions(i, j);
    }
  }
  return sumInversions;
}
function isSolvable() {
  var tilecount = puzzle.childElementCount;
  var size = Math.sqrt(tilecount);
  var emptyRow = parseInt(document.querySelector(".empty").id[0]);
  if (size % 2) {
    //크기가 홀수면 inversion합이 짝수면 풀 수 있다.
    return sumInversions() % 2 == 0;
  } else {
    //크기가 짝수면  inversion합 + 빈칸의 높이가 짝수면 풀 수 있다.
    return (sumInversions() + emptyRow) % 2 == 1;
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
    for (var j = 0; j < size; j++) {
      if (n < tilecount && getTile(i, j).innerHTML !== n.toString()) {
        return false;
      }
      n++;
    }
  }
  return true;
}
