import { GridEditor } from "./grid-editor";
import { GridExample } from "./grid-example";
import { Point } from "./Point";
import { Ruler } from "./Ruler";

export class Grid {
    time: number = 20;
    ruler: Ruler = undefined;
    isRunning: boolean = false;
    element: HTMLElement;
    gridEditor: GridEditor = undefined;
    example: GridExample = undefined;

    cells: HTMLElement[][];

    constructor(public row: number, public col: number, public cellSize: number = 30) {
        this.gridEditor = new GridEditor(this);
        this.example = new GridExample(this);
    }

    render(element: HTMLElement) {
        console.log('render', element);

        this.element = element;

        let html = '';

        for (let i = 0; i < this.row; i++) {
            let row = '';
            for (let j = 0; j < this.col; j++) {
                row += `<div style="width: ${this.cellSize}px; height: ${this.cellSize}px;" class="cell"></div>`
            }
            html += `<div class="row">${row}</div>`;
        }

        const editor = `<div class="editor">
    <button class="pencil">Pencil</button>
    <button class="eraser">Eraser</button>
    <button class="save">Save</button>
</div>`;

        element.innerHTML = `<div class="table">${html}</div>`;

        this.initCells();
        this.gridEditor.render();
    }

    initCells() {
        this.cells = [];
        Array.from(this.element.querySelectorAll('.row')).forEach(r => {
            const row = [];
            Array.from(r.querySelectorAll('.cell')).forEach(c => {
                row.push(c);
            });
            this.cells.push(row);
        });
        this.cells.forEach(row => row.forEach(c => c.addEventListener('click', () => {
            if (c.classList.contains('active')) {
                c.classList.remove('active');
            } else {
                c.classList.add('active');
            }
        })));
    }

    getCell(x, y) {
        try {
            return this.cells[x][y];
        } catch (e) {
            return undefined;
        }
    }

    set(x, y) {
        const cell = this.getCell(x, y);
        if (cell === undefined) {
            return;
        }
        cell.classList.add('active');
    }

    unset(x, y) {
        const cell = this.getCell(x, y);
        if (cell === undefined) {
            return;
        }
        cell.classList.remove('active');
    }

    add(points: Set<Point>) {
        points.forEach(p => {
            this.set(p.x, p.y);
        });
    }

    remove(points: Set<Point>) {
        points.forEach(p => {
            this.unset(p.x, p.y);
        });
    }

    hardReset() {
        this.cells.forEach(r => r.forEach(c => c.classList.remove('active')));
    }

    start() {
        if (!this.ruler) {
            console.log('no ruler');
        }
        this.ruler.save();
        this.ruler.run();
    }

    setRuler(ruler: Ruler) {
        this.ruler = ruler;
        ruler.grid = this;
    }

    getCenter(): Point {
        return new Point(Math.floor(this.row / 2), Math.floor(this.col / 2));
    }

    log() {
        const c = this.getCenter();
        const array = [];
        this.cells.forEach((row, i) => row.forEach((cell, j) => {
            if (cell.classList.contains('active')) {
                array.push([j - c.y, c.x - i]);
            }
        }));
        const string = '[' + array.map(p => '[' + p.join(',') + ']').join(',') + ']';
        console.log('log', string);
    }
}
