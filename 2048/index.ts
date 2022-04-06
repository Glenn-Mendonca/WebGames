class Web2048 {
  //Private Members
  private grid: number[][];

  constructor() {
    this.grid = this.createInitialGrid();
    this.insertNumber();
    this.insertNumber();
  }

  //Private 2048 Modifier Methods
  private createInitialGrid(): number[][] {
    let grid: number[][] = [];
    for (let i = 0; i < 4; i++) grid.push(new Array(4).fill(0));
    return grid;
  }

  private insertNumber(): void {
    let options: { x: number; y: number }[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.grid[i][j] === 0) options.push({ x: i, y: j });
      }
    }
    if (options.length > 0) {
      let randpos = Math.floor(Math.random() * options.length);
      let rand = Math.random();
      this.grid[options[randpos].x][options[randpos].y] = rand > 0.5 ? 4 : 2;
    } else console.log("No Options");
  }

  private rotateGrid(): void {
    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++)
        [this.grid[i][j], this.grid[j][i]] = [this.grid[j][i], this.grid[i][j]];
    }
  }

  private slide(dir: boolean): void {
    for (let i = 0; i < 4; i++) {
      let arr: number[] = this.grid[i].filter((val) => val);
      let missing: Array<number> = new Array(4 - arr.length).fill(0);
      if (dir) arr = arr.concat(missing);
      else arr = missing.concat(arr);
      this.grid[i] = arr;
    }
  }

  private combine(dir: boolean): void {
    for (let i = 0; i < 4; i++) {
      if (dir) {
        for (let j = 0; j < 3; j++) {
          if (this.grid[i][j] == this.grid[i][j + 1]) {
            this.grid[i][j + 1] = this.grid[i][j] + this.grid[i][j + 1];
            this.grid[i][j] = 0;
          }
        }
      } else {
        for (let j = 3; j >= 1; j--) {
          if (this.grid[i][j] == this.grid[i][j - 1]) {
            this.grid[i][j - 1] = this.grid[i][j] + this.grid[i][j - 1];
            this.grid[i][j] = 0;
          }
        }
      }
    }
  }

  //Private 2048 Keypress Handlers
  private UP(): void {
    this.rotateGrid();
    this.slide(true);
    this.combine(true);
    this.slide(true);
    this.rotateGrid();
  }
  private DOWN(): void {
    this.rotateGrid();
    this.slide(false);
    this.combine(false);
    this.slide(false);
    this.rotateGrid();
  }
  private LEFT(): void {
    this.slide(true);
    this.combine(true);
    this.slide(true);
  }
  private RIGHT(): void {
    this.slide(false);
    this.combine(false);
    this.slide(false);
  }

  //Public Methods
  public getGrid(): number[][] {
    return this.grid;
  }

  public getKeyPress(key: number): number[][] {
    var keypress: boolean = true;
    switch (key) {
      case 119:
        this.UP(); // W
        break;
      case 115:
        this.DOWN(); // S
        break;
      case 97:
        this.LEFT(); // A
        break;
      case 100:
        this.RIGHT(); // D
        break;
      default:
        keypress = false;
    }
    if (keypress) {
      this.insertNumber();
      this.insertNumber();
    }
    return this.getGrid();
  }
}

// Program Begins
const game = new Web2048();
var grid: number[][] = game.getGrid();
console.table(grid);
