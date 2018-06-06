import { Grid } from "./grid";

export interface Ruler {
    run: { (): void };
    grid: Grid;
    save: { (): void };
}
