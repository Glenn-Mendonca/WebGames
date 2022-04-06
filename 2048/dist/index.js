class Web2048 {
    constructor() {
        this.grid = this.createInitialGrid();
        this.insertNumber();
        this.insertNumber();
    }
    //Private 2048 Modifier Methods
    createInitialGrid() {
        let grid = [];
        for (let i = 0; i < 4; i++)
            grid.push(new Array(4).fill(0));
        return grid;
    }
    insertNumber() {
        let options = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 0)
                    options.push({ x: i, y: j });
            }
        }
        if (options.length > 0) {
            let randpos = Math.floor(Math.random() * options.length);
            let rand = Math.random();
            this.grid[options[randpos].x][options[randpos].y] = rand > 0.5 ? 4 : 2;
        }
        else
            console.log("No Options");
    }
    rotateGrid() {
        for (let i = 0; i < 4; i++) {
            for (let j = i + 1; j < 4; j++)
                [this.grid[i][j], this.grid[j][i]] = [this.grid[j][i], this.grid[i][j]];
        }
    }
    slide(dir) {
        for (let i = 0; i < 4; i++) {
            let arr = this.grid[i].filter((val) => val);
            let missing = new Array(4 - arr.length).fill(0);
            if (dir)
                arr = arr.concat(missing);
            else
                arr = missing.concat(arr);
            this.grid[i] = arr;
        }
    }
    combine(dir) {
        for (let i = 0; i < 4; i++) {
            if (dir) {
                for (let j = 0; j < 3; j++) {
                    if (this.grid[i][j] == this.grid[i][j + 1]) {
                        this.grid[i][j + 1] = this.grid[i][j] + this.grid[i][j + 1];
                        this.grid[i][j] = 0;
                    }
                }
            }
            else {
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
    UP() {
        this.rotateGrid();
        this.slide(true);
        this.combine(true);
        this.slide(true);
        this.rotateGrid();
    }
    DOWN() {
        this.rotateGrid();
        this.slide(false);
        this.combine(false);
        this.slide(false);
        this.rotateGrid();
    }
    LEFT() {
        this.slide(true);
        this.combine(true);
        this.slide(true);
    }
    RIGHT() {
        this.slide(false);
        this.combine(false);
        this.slide(false);
    }
    //Public Methods
    getGrid() {
        return this.grid;
    }
    getKeyPress(key) {
        var keypress = true;
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
var grid = game.getGrid();
console.table(grid);
//# sourceMappingURL=index.js.map