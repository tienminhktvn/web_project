import { useState } from "react";
import Cell from "./Cell";

const chessBoard = [
  // Row 0: Black's Back Rank
  [
    "Black-Rook.png",
    "Black-Knight.png",
    "Black-Bishop.png",
    "Black-Queen.png",
    "Black-King.png",
    "Black-Bishop.png",
    "Black-Knight.png",
    "Black-Rook.png",
  ],
  // Row 1: Black's Pawns
  [
    "Black-Pawn.png",
    "Black-Pawn.png",
    "Black-Pawn.png",
    "Black-Pawn.png",
    "Black-Pawn.png",
    "Black-Pawn.png",
    "Black-Pawn.png",
    "Black-Pawn.png",
  ],
  // Rows 2, 3, 4, 5: Empty Cells
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  // Row 6: White's Pawns
  [
    "White-Pawn.png",
    "White-Pawn.png",
    "White-Pawn.png",
    "White-Pawn.png",
    "White-Pawn.png",
    "White-Pawn.png",
    "White-Pawn.png",
    "White-Pawn.png",
  ],
  // Row 7: White's Back Rank
  [
    "White-Rook.png",
    "White-Knight.png",
    "White-Bishop.png",
    "White-Queen.png",
    "White-King.png",
    "White-Bishop.png",
    "White-Knight.png",
    "White-Rook.png",
  ],
];

const getImagePath = (pieceFileName) => {
  if (!pieceFileName) return null;

  const color = pieceFileName.split("-")[0];
  return `/assets/${color}/${pieceFileName}`;
};

const isValidMove = (board, fromRow, fromCol, toRow, toCol, piece) => {
  if (fromRow === toRow && fromCol === toCol) return false;

  const [color, pieceType] = piece.split("-");
  const targetPiece = board[toRow][toCol];

  if (targetPiece && targetPiece.startsWith(color)) return false;

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  const absRowDiff = Math.abs(rowDiff);
  const absColDiff = Math.abs(colDiff);

  switch (pieceType.replace(".png", "")) {
    case "Pawn":
      return isValidPawnMove(
        board,
        fromRow,
        fromCol,
        toRow,
        toCol,
        color,
        rowDiff,
        colDiff,
        absRowDiff,
        absColDiff,
        targetPiece
      );

    case "Rook":
      return isValidRookMove(
        board,
        fromRow,
        fromCol,
        toRow,
        toCol,
        rowDiff,
        colDiff
      );

    case "Knight":
      return (
        (absRowDiff === 2 && absColDiff === 1) ||
        (absRowDiff === 1 && absColDiff === 2)
      );

    case "Bishop":
      return isValidBishopMove(
        board,
        fromRow,
        fromCol,
        toRow,
        toCol,
        absRowDiff,
        absColDiff
      );

    case "Queen":
      return isValidQueenMove(
        board,
        fromRow,
        fromCol,
        toRow,
        toCol,
        rowDiff,
        colDiff,
        absRowDiff,
        absColDiff
      );

    case "King":
      return absRowDiff <= 1 && absColDiff <= 1;

    default:
      return false;
  }
};

const isValidPawnMove = (
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  color,
  rowDiff,
  colDiff,
  absRowDiff,
  absColDiff,
  targetPiece
) => {
  const direction = color === "White" ? -1 : 1;
  const startRow = color === "White" ? 6 : 1;

  // Forward move
  if (colDiff === 0 && !targetPiece) {
    // One square forward
    if (rowDiff === direction) return true;
    // Two squares forward from starting position
    if (fromRow === startRow && rowDiff === 2 * direction) {
      const betweenRow = fromRow + direction;
      return !board[betweenRow][fromCol];
    }
  }

  // Diagonal capture
  if (absColDiff === 1 && rowDiff === direction && targetPiece) {
    return true;
  }

  return false;
};

const isValidRookMove = (
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  rowDiff,
  colDiff
) => {
  // Must move in straight line
  if (rowDiff !== 0 && colDiff !== 0) return false;

  return isPathClear(board, fromRow, fromCol, toRow, toCol);
};

const isValidBishopMove = (
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  absRowDiff,
  absColDiff
) => {
  // Must move diagonally
  if (absRowDiff !== absColDiff) return false;

  return isPathClear(board, fromRow, fromCol, toRow, toCol);
};

const isValidQueenMove = (
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  rowDiff,
  colDiff,
  absRowDiff,
  absColDiff
) => {
  // Queen moves like rook or bishop
  const isStraight = rowDiff === 0 || colDiff === 0;
  const isDiagonal = absRowDiff === absColDiff;

  if (!isStraight && !isDiagonal) return false;

  return isPathClear(board, fromRow, fromCol, toRow, toCol);
};

const isPathClear = (board, fromRow, fromCol, toRow, toCol) => {
  const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
  const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
};

const ChessBoard = () => {
  const [board, setBoard] = useState(chessBoard);
  const [validMoves, setValidMoves] = useState([]);

  const lightColor = "#f0d9b5";
  const darkColor = "#b58863";

  const handleMouseDown = (e) => {
    e.preventDefault();
    const box = e.target;
    if (!box || box.tagName !== "IMG") return;

    const originalCell = box.closest(".cell");
    if (!originalCell) return;

    const startRow = Number(originalCell.dataset.row);
    const startCol = Number(originalCell.dataset.col);
    const piece = box.dataset.piece;

    if (!piece) return;

    // Calculate all valid moves for this piece
    const valid = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValidMove(board, startRow, startCol, row, col, piece)) {
          valid.push({ row, col });
        }
      }
    }
    setValidMoves(valid);

    const rect = box.getBoundingClientRect();
    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;

    box.oldZIndex = box.style.zIndex;
    box.style.zIndex = 1000;
    box.style.position = "fixed";
    box.style.width = rect.width + "px";
    box.style.height = rect.height + "px";
    box.style.pointerEvents = "none";

    const moveAt = (pageX, pageY) => {
      box.style.left = pageX - shiftX + "px";
      box.style.top = pageY - shiftY + "px";
    };

    moveAt(e.clientX, e.clientY);

    const onMouseMove = (ev) => {
      moveAt(ev.clientX, ev.clientY);
    };

    const onMouseUp = (ev) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      // Reset styles
      box.style.position = "";
      box.style.left = "";
      box.style.top = "";
      box.style.width = "";
      box.style.height = "";
      box.style.zIndex = box.oldZIndex;
      box.style.pointerEvents = "";

      const elemBelow = document.elementFromPoint(ev.clientX, ev.clientY);
      const targetCell = elemBelow ? elemBelow.closest(".cell") : null;

      if (targetCell) {
        const targetRow = Number(targetCell.dataset.row);
        const targetCol = Number(targetCell.dataset.col);

        // Check if move is valid
        if (
          isValidMove(board, startRow, startCol, targetRow, targetCol, piece)
        ) {
          // Valid move - update board state
          setBoard((prev) => {
            const copy = prev.map((r) => r.slice());
            copy[startRow][startCol] = null;
            copy[targetRow][targetCol] = piece;
            return copy;
          });
        }
      }

      // Clear valid moves highlighting and dragging state
      setValidMoves([]);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="grid grid-cols-8">
      {board.map((rowArr, rowIndex) =>
        rowArr.map((cell, colIndex) => {
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const cellColor = isLight ? lightColor : darkColor;
          const imgSrc = getImagePath(cell);
          const isValidTarget = validMoves.some(
            (move) => move.row === rowIndex && move.col === colIndex
          );

          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              color={cellColor}
              imgSrc={imgSrc}
              alt={cell}
              hover={imgSrc ? true : false}
              handleMouseDown={handleMouseDown}
              row={rowIndex}
              col={colIndex}
              isValidTarget={isValidTarget}
            />
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
