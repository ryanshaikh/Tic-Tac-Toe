document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const popupReset = document.getElementById("popup-reset");
  let currentPlayer = "X";
  const cells = Array.from({ length: 9 }, (_, index) => createCell(index));

  function createCell(index) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", () => handleCellClick(index));
    board.appendChild(cell);
    return cell;
  }

  function handleCellClick(index) {
    const cell = cells[index];
    if (cell.textContent === "") {
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);
      checkWinner();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        showPopup(`Player ${currentPlayer} wins!`);
        return;
      }
    }

    if (cells.every((cell) => cell.textContent !== "")) {
      showPopup("It's a tie!");
    }
  }

  function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
  }

  function resetBoard() {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("X", "O");
    });
    currentPlayer = "X";
    popup.style.display = "none";
  }

  popupReset.addEventListener("click", resetBoard);
});
