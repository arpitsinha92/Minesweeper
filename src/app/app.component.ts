import { Component, ViewChild, ElementRef } from '@angular/core';
import { ICellStructure } from './interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('boardDOM') boardDOM: ElementRef;
  title = 'minesweeper';
  horizontal: number;
  vertical: number;
  boardParsed: ICellStructure[][] = [];
  minesLength: number;
  minesPositions = [];
  AROUND_CELL_OPERATORS = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  board = [];

  constructor() {
  }
  ngOnInit(): void {
    this.vertical = 9;
    this.horizontal = 9;
    this.minesLength = 10;
    this.generateNewBoard();
    this.generateMinesPositions(this.minesLength);
    this.insertAllMines();
    this.updateBoardNumbers();
    this.updateBoard(this.board);
  }
  trackByRow(index: number, element: any): number {
    return index;
  }


  onOpenCell(event) {
    const cellData = this.getCellDataByCoord(event);
    cellData.label = cellData.type.toString();
    if (cellData.label === "M") {
      this.showAllMines();
      alert("Game Over!!");
    }
  }

  showAllMines() {
    for (let y = 0; y < this.vertical; y++) {
      for (let x = 0; x < this.horizontal; x++) {
        let arr = []
        arr.push(x);
        arr.push(y);
        const cellData = this.getCellDataByCoord(arr);
        cellData.label = cellData.type.toString();

      }
    }


  }



  updateBoard(board: number[][]): void {
    this.boardParsed = [];
    for (let y = 0; y < board.length; y++) {
      const row: ICellStructure[] = [];

      for (let x = 0; x < board[y].length; x++) {
        row.push({
          type: board[y][x],
          y: y,
          x: x,
          label: ''
        });
      }
      this.boardParsed.push(row);
    }
  }

  generateNewBoard(): void {
    for (let y = 0; y < this.vertical; y++) {
      this.board.push([]);
      for (let x = 0; x < this.horizontal; x++) {
        this.board[y][x] = 0;
      }
    }
  }


  generateMinesPositions(minesLenght: number): void {
    this.minesPositions = [];
    while (this.minesPositions.length < minesLenght) {
      let y = this.getRandomInt(0, this.vertical);
      let x = this.getRandomInt(0, this.horizontal);

      if (!this.isAlreadyAMine([y, x])) {
        this.minesPositions.push([y, x]);
      }
    }
  }

  insertAllMines(): void {

    for (let i = 0; i < this.minesPositions.length; i++) {
      let y = this.minesPositions[i][0];
      let x = this.minesPositions[i][1];
      this.board[y][x] = "M";
    }
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  isAlreadyAMine(minePosition: number[]): boolean {
    return this.minesPositions.join(" ").includes(minePosition.toString());
  }

  updateBoardNumbers(): void {
    for (let i = 0; i < this.minesPositions.length; i++) {
      for (let j = 0; j < this.AROUND_CELL_OPERATORS.length; j++) {
        let minePosition = this.minesPositions[i];
        let around = this.AROUND_CELL_OPERATORS[j];
        let boardY = minePosition[0] + around[0];
        let boardX = minePosition[1] + around[1];

        if (boardY >= 0 && boardY < this.vertical &&
          boardX >= 0 && boardX < this.horizontal &&
          typeof this.board[boardY][boardX] === 'number') {
          this.board[boardY][boardX]++;
        }
      }
    }
  }

  getCellDataByCoord(cellCoord: number[]): ICellStructure {
    return this.boardParsed[cellCoord[0]][cellCoord[1]];
  }

  createNewEmptyBoard() {
    this.vertical = 9;
    this.horizontal = 9;
    this.minesLength = 10;
    this.generateNewBoard();
    this.generateMinesPositions(this.minesLength);
    this.insertAllMines();
    this.updateBoardNumbers();
    this.updateBoard(this.board);
  }

}
