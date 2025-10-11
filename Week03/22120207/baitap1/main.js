const chesses = document.querySelectorAll("img.chess");
const chessBoard = initChessBoard(chesses);

let highlightedCell = null;
let srcMove = null;
let srcCell = null;
let turn = true; // true = White's turn, false = Black's turn

const turnText = document.querySelector(".turn-announce");

main();

function main() {
  chesses.forEach((chess) => {
    chess.addEventListener("dragstart", dragStart);
    chess.addEventListener("dragend", dragEnd);
  });

  const cells = document.querySelectorAll("div.cell");
  cells.forEach((cell) => {
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("dragleave", dragLeave);
    cell.addEventListener("drop", dragDrop);
  });

  updateTurnUI();
}

// ======================= Chess Setup =======================

function initChessBoard(chesses) {
  const chessBoard = Array.from(Array(8), () => new Array(8));

  let row = 0;
  chesses.forEach((chess, index) => {
    const col = index % 8;
    if (index > 0 && col === 0) {
      if (index === 16) {
        row = 6;
      } else {
        row++;
      }
    }
    chessBoard[row][col] = chess.id;
  });

  return chessBoard;
}

// ======================= Rules =======================

function isMoveValid(pieceId, srcRow, srcCol, nextRow, nextCol) {
  if (pieceId.includes("pawn")) {
    return pawnRule(pieceId, srcRow, srcCol, nextRow, nextCol);
  } else if (pieceId.includes("rook")) {
    return rookRule(srcRow, srcCol, nextRow, nextCol);
  } else if (pieceId.includes("knight")) {
    return knightRule(srcRow, srcCol, nextRow, nextCol);
  } else if (pieceId.includes("bishop")) {
    return bishopRule(srcRow, srcCol, nextRow, nextCol);
  } else if (pieceId.includes("queen")) {
    return queenRule(srcRow, srcCol, nextRow, nextCol);
  } else if (pieceId.includes("king")) {
    return kingRule(srcRow, srcCol, nextRow, nextCol);
  }
  return false;
}

function pawnRule(pieceId, row, col, nextRow, nextCol) {
  const isWhite = pieceId.includes("white");
  const direction = isWhite ? -1 : 1;

  // Simple move forward
  if (col === nextCol && chessBoard[nextRow][nextCol] === undefined) {
    if (nextRow === row + direction) return true;

    // Two steps on first move
    const startRow = isWhite ? 6 : 1;
    if (
      row === startRow &&
      nextRow === row + 2 * direction &&
      chessBoard[row + direction][col] === undefined
    )
      return true;
  }

  // Capture diagonally
  if (
    Math.abs(col - nextCol) === 1 &&
    nextRow === row + direction &&
    chessBoard[nextRow][nextCol] !== undefined
  ) {
    return true;
  }

  return false;
}

function rookRule(row, col, nextRow, nextCol) {
  if (row !== nextRow && col !== nextCol) return false;

  const stepRow = Math.sign(nextRow - row);
  const stepCol = Math.sign(nextCol - col);

  let r = row + stepRow;
  let c = col + stepCol;

  while (r !== nextRow || c !== nextCol) {
    if (chessBoard[r][c] !== undefined) return false;
    r += stepRow;
    c += stepCol;
  }

  return true;
}

function knightRule(row, col, nextRow, nextCol) {
  const dr = Math.abs(nextRow - row);
  const dc = Math.abs(nextCol - col);
  return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
}

function bishopRule(row, col, nextRow, nextCol) {
  if (Math.abs(nextRow - row) !== Math.abs(nextCol - col)) return false;

  const stepRow = Math.sign(nextRow - row);
  const stepCol = Math.sign(nextCol - col);

  let r = row + stepRow;
  let c = col + stepCol;

  while (r !== nextRow && c !== nextCol) {
    if (chessBoard[r][c] !== undefined) return false;
    r += stepRow;
    c += stepCol;
  }

  return true;
}

function queenRule(row, col, nextRow, nextCol) {
  return (
    rookRule(row, col, nextRow, nextCol) ||
    bishopRule(row, col, nextRow, nextCol)
  );
}

function kingRule(row, col, nextRow, nextCol) {
  const dr = Math.abs(nextRow - row);
  const dc = Math.abs(nextCol - col);
  return dr <= 1 && dc <= 1;
}

function moveAt(chessId, row, col, nextRow, nextCol) {
  chessBoard[row][col] = undefined;
  chessBoard[nextRow][nextCol] = chessId;
}

// ======================= Drag Events =======================

function dragStart(event) {
  const id = event.target.id;

  // Prevent dragging wrong color
  if ((turn && !id.includes("white")) || (!turn && !id.includes("black"))) {
    event.preventDefault();
    alert("❌ Not your turn!");
    return;
  }

  event.dataTransfer.setData("text/plain", id);
  srcMove = event.target;
  srcCell = srcMove.parentElement;
  srcCell.classList.add("src-move");
}

function dragOver(event) {
  const cell = event.currentTarget;
  if (!cell.classList.contains("empty-cell")) return;

  const targetCell = event.target.classList.contains("empty-cell")
    ? event.target
    : event.target.parentElement;

  const { row: srcRow, col: srcCol } = getCellIndex(srcCell);
  const { row: nextRow, col: nextCol } = getCellIndex(targetCell);

  const valid = isMoveValid(srcMove.id, srcRow, srcCol, nextRow, nextCol);

  if (highlightedCell && highlightedCell !== cell) {
    highlightedCell.classList.remove("move-available", "move-not-available");
  }

  if (valid) {
    event.preventDefault();
    cell.classList.add("move-available");
  } else {
    cell.classList.add("move-not-available");
  }

  highlightedCell = cell;
}

function dragLeave(event) {
  const cell = event.currentTarget;
  cell.classList.remove("move-available", "move-not-available");
  if (highlightedCell === cell) highlightedCell = null;
}

function dragDrop(event) {
  event.preventDefault();

  if (highlightedCell) {
    highlightedCell.classList.remove("move-available", "move-not-available");
    highlightedCell = null;
  }

  const id = event.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(id);

  const targetCell = event.target.classList.contains("empty-cell")
    ? event.target
    : event.target.parentElement;

  const { row: srcRow, col: srcCol } = getCellIndex(srcCell);
  const { row: nextRow, col: nextCol } = getCellIndex(targetCell);

  const valid = isMoveValid(id, srcRow, srcCol, nextRow, nextCol);

  if (!valid) {
    return;
  }

  // Perform move
  targetCell.appendChild(draggedElement);
  targetCell.classList.remove("empty-cell");
  moveAt(id, srcRow, srcCol, nextRow, nextCol);

  if (srcCell) {
    srcCell.classList.remove("src-move");
    srcCell.classList.add("empty-cell");
  }

  srcCell = null;
  srcMove = null;

  turn = !turn;
  updateTurnUI();
}

function dragEnd() {
  if (srcCell) srcCell.classList.remove("src-move");
  srcCell = null;
  srcMove = null;
}

// ======================= Helpers =======================

function updateTurnUI() {
  if (turn) {
    turnText.textContent = "WHITE'S TURN";
    turnText.style.color = "white";
  } else {
    turnText.textContent = "BLACK'S TURN";
    turnText.style.color = "black";
  }
}

function getCellIndex(cell) {
  const rowElement = cell.parentElement;
  const boardElement = rowElement.parentElement;
  const row = Array.from(boardElement.children).indexOf(rowElement);
  const col = Array.from(rowElement.children).indexOf(cell);
  return { row, col };
}
