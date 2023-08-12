const printBoard = (board: bigint[]) => {
  console.log(
    `\t${board[12]} ${board[11]} ${board[10]} ${board[9]} ${board[8]} ${board[7]}`
  );
  console.log(`|${board[13]}| ------------------ |${board[6]}|`);
  console.log(
    `\t${board[0]} ${board[1]} ${board[2]} ${board[3]} ${board[4]} ${board[5]} \n`
  );
};

export { printBoard };
