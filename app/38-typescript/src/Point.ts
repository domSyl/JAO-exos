export class Point {
    private static cache: Map<string, Point> = new Map();
    constructor(public x: number, public y: number) {
        const s = this.toString();
        if (Point.cache.has(s)) {
            return Point.cache.get(s);
        } else {
            Point.cache.set(s, this);
        }
    }

    toString() {
        return `(${this.x},${this.y})`;
    }
}
