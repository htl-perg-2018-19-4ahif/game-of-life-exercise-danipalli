window.onload = () => {
  const boardSize = 800;
  const population = 0.03;
  const pixelLength = 4;
  const gameBoard: number[][] = [];
  const size = boardSize/pixelLength;

  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx: any = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  //Empty Border
  let singleRow: number[] = [];
  for(let i = 0; i < size+2; i++){ 
    singleRow.push(0);
  }
  gameBoard.push(singleRow);

  //Real Gameboard
  for(let row = 0; row < size; row++){
    let singleRow: number[] = [];
    singleRow.push(0);  //Empty Border
    for(let column = 0; column < size; column++){
      if(Math.random() <= population){
        singleRow.push(1);
      }else{
        singleRow.push(0);
      }
    }
    singleRow.push(0);  //Empty Border
    gameBoard.push(singleRow);
  }

  //Empty Border
  singleRow = [];
  for(let i = 0; i < size+2; i++){ 
    singleRow.push(0);
  }
  gameBoard.push(singleRow);

  window.requestAnimationFrame(updateGameBoard);


  function updateGameBoard() {
    for(let row = 1; row <= size; row++){
      for(let column = 1; column <= size; column++){
        const neighbours =  gameBoard[row-1][column-1] + gameBoard[row-1][column] + gameBoard[row-1][column+1] +
                            gameBoard[row][column-1] + gameBoard[row][column+1] +
                            gameBoard[row+1][column-1] + gameBoard[row+1][column] + gameBoard[row+1][column+1];
        if(gameBoard[row][column]){
          if(neighbours < 2 || neighbours > 3){
            gameBoard[row][column] = 0;
          }
        }else{
          if(neighbours === 3){
            gameBoard[row][column] = 1;
          }
        }
      }
    }
    
    ctx.clearRect(0, 0, boardSize, boardSize);

    for(let row = 1; row <= size; row++){
      for(let column = 1; column <= size; column++){
        if(gameBoard[row][column]){
          ctx.fillRect(column*pixelLength, row*pixelLength, pixelLength, pixelLength);
        }
      }
    }

    window.requestAnimationFrame(updateGameBoard);
  }
};