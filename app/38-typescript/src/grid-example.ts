import { Grid } from "./grid";
import { Point } from "./Point";

export class GridExample {

    points: Set<Point>;

    constructor(public grid: Grid) { }

    getMakeMethodNames() {
        return Object.getOwnPropertyNames(GridExample.prototype).filter(m => m.startsWith('make'));
    }

    set(str: string): void {
        console.log('str', str);
        this.grid.hardReset();
        const methodNames = this.getMakeMethodNames().filter(m => m.substr('make'.length) === str);

        if (methodNames.length === 0) {
            throw new Error('Make method not found.');
        }

        this[methodNames[0]]();
        this.grid.add(this.points);
    }

    buildSet(array: number[][]) {
        const c: Point = this.grid.getCenter();
        this.points = array.reduce((acc, p) => {
            acc.add(new Point(c.x - p[1], c.y + p[0]));
            return acc;
        }, new Set());
    }

    makeEmpty() {
        this.buildSet([]);
    }

    makePentominoR() {
        this.buildSet([[0, 0], [0, 1], [1, 0], [0, -1], [-1, -1]]);
    }

    makeGlider() {
        this.buildSet([[-1, -1], [0, -1], [1, -1], [1, 0], [0, 1]]);
    }

    makeLWSS() {
        this.buildSet([[-3, 3], [0, 3], [1, 2], [-3, 1], [1, 1], [-2, 0], [-1, 0], [0, 0], [1, 0]]);
    }

    makeF() {
        this.buildSet([[-2, 6], [-1, 6], [0, 6], [-2, 5], [-2, 4], [-1, 4], [-2, 3], [-2, 2], [-2, 1]]);
    }

    makeHWSS() {
        this.buildSet([[-5, -1], [-4, -1], [-7, -2], [-2, -2], [-1, -3], [-7, -4], [-1, -4], [-6, -5], [-5, -5], [-4, -5], [-3, -5], [-2, -5], [-1, -5]]);
    }

    makeTagalong() {
        this.buildSet([[-6, 7], [-5, 7], [-4, 7], [-3, 7], [-6, 6], [-2, 6], [8, 6], [-6, 5], [6, 5], [7, 5], [-5, 4], [-2, 4],
        [1, 4], [2, 4], [8, 4], [9, 4], [10, 4], [0, 3], [1, 3], [2, 3], [9, 3], [10, 3], [11, 3], [-5, 2], [-2, 2],
        [1, 2], [2, 2], [8, 2], [9, 2], [10, 2], [-6, 1], [6, 1], [7, 1], [-6, 0], [-2, 0], [8, 0], [-6, -1], [-5, -1], [-4, -1], [-3, -1]]);
    }

    makeM() {
        this.buildSet([[-8,3],[0,3],[-8,2],[-7,2],[-1,2],[0,2],[-8,1],[-6,1],[-2,1],[0,1],[-8,0],[-5,0],[-3,0],[0,0],[-8,-1],[-4,-1],[0,-1],[-8,-2],[0,-2],[-8,-3],[0,-3],[-8,-4],[0,-4],[-8,-5],[0,-5]]);
    }
};
