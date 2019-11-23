(function() {
  var puzzle = document.getElementById(puzzle);
  var emptyTile = document.querySelector(".empty");
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
        swapTile(event.target, emptyTile);
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
        }
        puzzle.appendChild(tile);
      }
    }
    shuffle();
    // save();
  }
  function swapTile(tile1, tile2) {
    var temp = {
      style: tile1.style.cssText,
      id: tile1.id
    };
    tile1.sytle.cssText = tile2.style.cssText;
    tile1.id = tile2.id;
    tile2.style.cssText = temp.style;
    tile2.id = tmp.id;
  }
  function setMoveable() {
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
  function shuffle() {
    var tilecount = puzzle.childElementCount;
    var size = Math.sqrt(tilecount);
    for (var i = size - 1; i >= 0; i--) {
      for (var j = size - 1; j >= 0; j--) {
        var random = Math.floor(Math.random() * (j * size + i));
        var randomRow = Math.floor(random / size);
        var randomCol = random % size;
        swapTile(getTile(i, j), getTile(randomRow, randomCol));
      }
    }
    if (!isSolvable()) {
      shuffle();
    }
  }

  function countInversions(row, col) {
    var tilecount = puzzle.childElementCount;
    var size = Math.sqrt(tilecount);
    var inversions = 0;
    if (getTile(row, col).className !== "empty") {
      for (var i = row; i < size; i++) {
        for (var j = col + 1; j < size; j++) {
          var tileValue = parseInt(getTile(row, col).innerHTML);
          var compareValue = parseInt(getTile(i, j).innerHTML);
          if (tileValue > compareValue) {
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
        sumInversions = suminversions + countInversions(i, j);
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
      return (sumInversions() + size - emptyRow) % 2 == 0;
    }
  }
})();
